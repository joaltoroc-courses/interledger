import { Module } from '@nestjs/common';
import { createAuthenticatedClient } from '@interledger/open-payments';
import { ConfigService } from '@nestjs/config';

import { PaymentsController } from '@/payments/payments.controller';
import { PaymentsService } from '@/payments/payments.service';
import { decode, join } from '@/utils';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: 'IL_OPEN_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const ilBase = configService.get<string>('IL_BASE', '');
        const ilWallet = configService.get<string>('IL_WALLET', '');

        const walletAddressUrl: string = join('https', ilBase, ilWallet);

        return await createAuthenticatedClient({
          walletAddressUrl,
          keyId: configService.get<string>('IL_KEY_ID', ''),
          privateKey: decode(configService.get<string>('IL_PRIVATE_KEY')),
          logLevel: 'debug',
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentsModule {}
