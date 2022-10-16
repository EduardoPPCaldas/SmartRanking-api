import { IsEmail, IsNotEmpty } from "class-validator"

export class CreatePlayerDto {
    
    @IsNotEmpty()
    readonly phoneNumber: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    name: string;
}