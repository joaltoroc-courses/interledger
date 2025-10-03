import type { Grant, Quote, WalletAddress } from '@interledger/open-payments';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class PaymentDTO {
  @ApiProperty()
  @MinLength(4)
  sender: string;

  @ApiProperty()
  @MinLength(4)
  received: string;

  @ApiProperty()
  amount: number;
}

export class ConfirmPaymentDTO {
  @ApiProperty()
  paymentGrant: Grant;

  @ApiProperty()
  sender: WalletAddress;

  @ApiProperty()
  quote: Quote;
}
