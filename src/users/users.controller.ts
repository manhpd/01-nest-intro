import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // catch enum type error and return a custom error message
    @Get()
    findAll(@Query('role') role?: Role): any[] {
        return this.usersService.findAll(role);

    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): any {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto ): {} {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto): {} {
        return this.usersService.update(id, updateUserDto);
    }
   
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): {} {
        return this.usersService.remove(id);
    }
}
