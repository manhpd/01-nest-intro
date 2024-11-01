import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
    controllers: [UsersController],
    providers: [UsersService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ],
    exports: [UsersService]
})
export class UsersModule {

}
