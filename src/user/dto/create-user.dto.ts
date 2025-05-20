import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "./unique-email.validator";
import { UniqueUsername } from "./unique-username.validator";


export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @UniqueUsername()   
    readonly username: string;

    @IsEmail()
    @MinLength(3)
    @IsNotEmpty()
    @UniqueEmail()
    readonly email: string;

    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;  

    
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    readonly tel: string;
}
