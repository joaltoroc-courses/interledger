import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import type { WalletAddress } from '@interledger/open-payments';

import { PaymentsService } from '@/payments/payments.service';
import { ConfirmPaymentDTO, PaymentDTO } from '@/payments/dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getInfoAddress(@Query('wallet') wallet: string): Promise<WalletAddress> {
    return this.paymentsService.getInfoAddress(wallet);
  }

  @Post('create')
  createPayment(@Body() paymentDTO: PaymentDTO) {
    return this.paymentsService.createPayment(paymentDTO);
  }

  @Post('confirm')
  confirm(@Body() confirmPayment: ConfirmPaymentDTO) {
    return this.paymentsService.confirm(confirmPayment);
  }
}
