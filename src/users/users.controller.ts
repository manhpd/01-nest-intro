import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    /* 
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): any[] {
        return [];
    }

    // 
    @Get(':id')
    findOne(@Param('id') id: string): any {
        return `This action returns a #${id} user`;
    }
    // 

    @Post()
    create(@Body() user: {}): {} {
        return user;
    }

    // 
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {}): {} {
        return {id, ...userUpdate};
    }
    // 
    // @Delete(':id')
    // remove(@Param('id') id: string): string {
    //     return `This action removes a #${id} user`;
    // }
}
