import { CreateLocationDto } from '../dto/location';
export declare class LocationController {
    private readonly logger;
    findAll(): string;
    create(dto: CreateLocationDto): Promise<string>;
    findOne(id: string): string;
}
