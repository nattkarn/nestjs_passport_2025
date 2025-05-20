import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginAuthDto {


    @IsEmail()
    @MinLength(3)
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    readonly password: string;
}
