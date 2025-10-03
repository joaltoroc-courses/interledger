import {
  type WalletAddress,
  type AuthenticatedClient,
  isFinalizedGrant,
  type PendingGrant,
  type Grant,
  type IncomingPaymentWithPaymentMethods,
  Quote,
} from '@interledger/open-payments';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfirmPaymentDTO, PaymentDTO } from '@/payments/dto/payment.dto.js';
import { join } from '@/utils';

@Injectable()
export class PaymentsService {
  private readonly ILBase: string;

  constructor(
    @Inject('IL_OPEN_CLIENT')
    private readonly authenticatedClient: AuthenticatedClient,
    private readonly configService: ConfigService,
  ) {
    this.ILBase = this.configService.get<string>('IL_BASE', '');
  }

  async getInfoAddress(wallet: string): Promise<WalletAddress> {
    return await this.authenticatedClient.walletAddress.get({
      url: join('https', this.ILBase, wallet),
    });
  }

  async createPayment(paymentDTO: PaymentDTO): Promise<{
    sender: WalletAddress;
    received: WalletAddress;
    incomingPaymentGrant: PendingGrant | Grant;
    incomingPayment: IncomingPaymentWithPaymentMethods;
    quoteGrant: PendingGrant | Grant;
    quote: Quote;
    outgoingPaymentGrant: PendingGrant | Grant;
  }> {
    try {
      const sender = await this.getInfoAddress(paymentDTO.sender);
      const received = await this.getInfoAddress(paymentDTO.received);
      const amount =
        paymentDTO.amount.toString() + '0'.padEnd(sender.assetScale, '0');

      console.table({
        sender,
        received,
        amount,
      });

      // concesión para pago entrante
      const incomingPaymentGrant = await this.authenticatedClient.grant.request(
        {
          url: sender.authServer,
        },
        {
          access_token: {
            access: [{ type: 'incoming-payment', actions: ['create'] }],
          },
        },
      );

      if (!isFinalizedGrant(incomingPaymentGrant)) {
        throw new UnauthorizedException('Invalid grant sender');
      }

      // crear un pago entrante
      const incomingPayment =
        await this.authenticatedClient.incomingPayment.create(
          {
            url: received.authServer,
            accessToken: incomingPaymentGrant.access_token.value,
          },
          {
            walletAddress: sender.id,
            incomingAmount: {
              assetCode: sender.assetCode,
              assetScale: sender.assetScale,
              value: amount,
            },
          },
        );

      const quoteGrant = await this.authenticatedClient.grant.request(
        {
          url: sender.authServer,
        },
        {
          access_token: {
            access: [{ type: 'quote', actions: ['create'] }],
          },
        },
      );

      if (!isFinalizedGrant(quoteGrant)) {
        throw new UnauthorizedException('Invalid quote grant sender');
      }

      const quote = await this.authenticatedClient.quote.create(
        {
          url: received.authServer,
          accessToken: quoteGrant.access_token.value,
        },
        {
          walletAddress: sender.id,
          receiver: received.id,
          method: 'ilp',
        },
      );

      const outgoingPaymentGrant = await this.authenticatedClient.grant.request(
        {
          url: sender.authServer,
        },
        {
          access_token: {
            access: [
              {
                type: 'outgoing-payment',
                actions: ['create'],
                limits: {
                  debitAmount: quote.debitAmount,
                },
                identifier: sender.id,
              },
            ],
          },
          interact: {
            start: ['redirect'],
          },
        },
      );

      return {
        sender,
        received,
        incomingPaymentGrant,
        incomingPayment,
        quoteGrant,
        quote,
        outgoingPaymentGrant,
      };
    } catch (error) {
      console.error(error);
      const { description, status } = error as {
        description: string;
        status: number;
      };

      if (status === 404) {
        throw new NotFoundException(description);
      }
      throw new BadRequestException(description);
    }
  }

  async confirm(confirmPayment: ConfirmPaymentDTO) {
    const finalize = await this.authenticatedClient.grant.continue({
      url: confirmPayment.paymentGrant.continue.uri,
      accessToken: confirmPayment.paymentGrant.access_token.value,
    });

    if (!isFinalizedGrant(finalize)) {
      throw new UnauthorizedException('Invalid confirm payment grant sender');
    }

    const outgoingPayment = this.authenticatedClient.outgoingPayment.create(
      {
        url: confirmPayment.sender.resourceServer,
        accessToken: finalize.access_token.value,
      },
      {
        walletAddress: confirmPayment.sender.id,
        quoteId: confirmPayment.quote.id,
      },
    );

    return {
      finalize,
      outgoingPayment,
    };
  }
}
