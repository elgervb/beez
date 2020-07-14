import { Injectable } from '@nestjs/common';
import { Queen } from 'src/interfaces/queen';
import { InjectRepository } from '@nestjs/typeorm';
import { QueenDto } from 'src/queen/dtos/queen';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class QueenService {

  constructor(@InjectRepository(QueenDto) private queenRepository: Repository<QueenDto>) { }

  async save(queen: Queen): Promise<Queen> {
    if (queen.id) {
      const existing = await this.queenRepository.findOne(queen.id);
      return await this.queenRepository.save({ ...queen, id: existing.id });
    }
    return this.queenRepository.save(queen);
  }

  delete(queenName: string): Promise<DeleteResult> {
    return this.queenRepository.delete({ name: queenName });
  }

  findAll(): Promise<Queen[]> {
    return this.queenRepository.find();
  }

  findOne(name: string): Promise<Queen> {
    return this.queenRepository.findOne({ name });
  }
}
