import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';


export enum Role {
    INTERN = 'INTERN',
    ENGINEER = 'ENGINEER',
    ADMIN = 'ADMIN'
}

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsEnum(Role, { message: 'role must be a valid enum value' })
    role: Role;
}

