import { IsEnum } from 'class-validator';
import { Files } from '../../../domain/asb_detail/files.enum';

export class GetAsbDetailByFileTypeDto {
    @IsEnum(Files)
    files: Files;
}
