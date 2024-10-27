import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    // catch error if role is not valid
    if (!['ADMIN', 'ENGINEER', 'INTERN'].includes(createEmployeeDto.role)) {
      throw new HttpException(`Role ${createEmployeeDto.role} not found`, 404);
    }
    // catch error if email is not unique
    const email = createEmployeeDto.email;
    const employee = this.databaseService.employee.findFirst({ where: { email } });
    if (employee) {
      throw new HttpException(`Employee with email ${email} already exists`, 409);
    }

    return this.databaseService.employee.create({ data: createEmployeeDto });
  }

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    // check role is not valid
    if (role && !['ADMIN', 'ENGINEER', 'INTERN'].includes(role)) {
      throw new HttpException(`Role ${role} not found`, 404);
    }
    return this.databaseService.employee.findMany({ where: { role } });
  }

  findOne(id: number) {
    const employee = this.databaseService.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new HttpException(`Employee with id ${id} not found`, 404);
    }
    return employee;
  }

  update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const employee = this.databaseService.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new HttpException(`Employee with id ${id} not found`, 404);
    }
    return this.databaseService.employee.update({ where: { id }, data: updateEmployeeDto });
  }

  remove(id: number) {
    const employee = this.databaseService.employee.findUnique({ where: { id } });
    if (!employee) {
      return new HttpException(`Employee with id ${id} not found`, 404);
    }
    return this.databaseService.employee.delete({ where: { id } });
  }
}
