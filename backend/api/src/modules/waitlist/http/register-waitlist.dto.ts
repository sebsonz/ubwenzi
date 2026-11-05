import { IsBoolean, IsEmail, IsString, Length, MaxLength } from "class-validator";

export class RegisterWaitlistDto {
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsString()
  @Length(2, 2)
  marketCode!: string;

  @IsBoolean()
  isAdultConfirmed!: boolean;

  @IsBoolean()
  consentToWaitlistUpdates!: boolean;
}
