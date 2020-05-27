import { CreateLocationDto } from './location-dto';
export declare class LocationController {
    findAll(): string;
    create(dto: CreateLocationDto): Promise<string>;
    findOne(id: string): string;
}
