import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: "1",
        username: 'elgervb',
        password: 'secret',
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
