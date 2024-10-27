import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'Alice', role: 'ADMIN' },
        { id: 2, name: 'Bob', role: 'ENGINEER' },
        { id: 3, name: 'Charlie', role: 'INTERN' },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    findOne(id: string) {
        return this.users.find(user => user.id === +id);
    }

    create(user: {} ) {
        const userWithMaxId = this.users.reduce((prev, current) => (prev.id > current.id) ? prev : current) ;
        const id = userWithMaxId ? userWithMaxId.id + 1 : 1;
        this.users.push({...user,id} as { id: number, name: string , role: string });
        return user;
    }

    update(id: string, userUpdate: {}) {
        const user = this.findOne(id);
        if (!user) {
            return null;
        }
        const userIndex = this.users.indexOf(user);
        this.users[userIndex] = { ...user, ...userUpdate };
        return this.users[userIndex];
    }

    remove(id: string) {
        const user = this.findOne(id);
        if (!user) {
            return null;
        }
        this.users = this.users.filter(user => user.id !== +id);
        return user;
    }
}
