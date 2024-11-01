import { Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
    private users = [
        { id: 1, username:'alice', name: 'Alice', email: 'alice@test.com' ,role: 'ADMIN', password: '123456'},
        { id: 2, username:'bob',name: 'Bob',email: 'bob@test.com' , role: 'ENGINEER', password: '123456'},
        { id: 3, username:'manhpd',name: 'Charlie',email: 'charlie@test.com' , role: 'INTERN', password:'123456' },
        { id: 4, username:'manhpd',name: 'Manh',email: 'manhpd@test.com', role: 'ADMIN', password: '123456'}
    ];

    findAll(role?: Role) {
        if (role) {
            // check if the role is valid
            if (!Object.values(Role).includes(role)) {
                throw new NotFoundException(`Role ${role} not found`);
            }
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    findOneByUserName(username: string) {
        const user = this.users.find(user => user.username === username);   
        if (!user) {
            throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    create(createUserDto: CreateUserDto ) {
        const userWithMaxId = this.users.reduce((prev, current) => (prev.id > current.id) ? prev : current) ;
        const id = userWithMaxId ? userWithMaxId.id + 1 : 1;
        this.users.push({...createUserDto,id});
        return createUserDto;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const userIndex = this.users.indexOf(user);
        this.users[userIndex] = { ...user, ...updateUserDto };
        return this.users[userIndex];
    }

    remove(id: number) {
        const user = this.findOne(id);
        if (!user) {
            return null;
        }
        this.users = this.users.filter(user => user.id !== +id);
        return user;
    }
}
