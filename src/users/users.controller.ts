import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): any[] {
        return this.usersService.findAll(role);
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user: {id: string, name: string, role: 'INTERN'| 'ENGINEER' | 'ADMIN' } ): {} {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {name: string, role: 'INTERN'| 'ENGINEER' | 'ADMIN'}): {} {
        return this.usersService.update(id, userUpdate);
    }
   
    @Delete(':id')
    remove(@Param('id') id: string): {} {
        return this.usersService.remove(id);
    }
}
