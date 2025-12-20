import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanTipePerkerasanLenturDto {
    @IsNotEmpty()
    @IsString()
    tipe!: string;
}
