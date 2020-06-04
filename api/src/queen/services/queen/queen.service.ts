import { Injectable } from '@nestjs/common';
import { arrayFrom } from '@elgervb/mock-data';
import { Queen } from 'src/interfaces/queen';

@Injectable()
export class QueenService {

  private data = [...arrayFrom<Queen>('beez.queen', 2)];

  create(queen: Queen): Queen {
    this.data = [...this.data, queen];

    return queen;
  }

  delete(queenName: string): void {
    this.data = this.data.filter(queen => queen.name !== queenName);
  }

  findAll(): Queen[] {
    return [...this.data];
  }

  findOne(name: string) {
    return this.data.find(queen => queen.name === name);
  }
}
