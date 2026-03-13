import { CreateShstDto } from "../../../presentation/shst/dto/create_shst.dto";
import { BadRequestException } from "@nestjs/common";

export class ValidateShstForeignKeysUseCase {
  async execute(dto: CreateShstDto): Promise<void> {
    // TODO: Implement actual validation by calling other services
    // For now, we'll just check if the IDs are positive numbers
    if (dto.id_asb_tipe_bangunan <= 0) {
      throw new BadRequestException('Invalid id_asb_tipe_bangunan');
    }
    if (dto.id_asb_klasifikasi <= 0) {
      throw new BadRequestException('Invalid id_asb_klasifikasi');
    }
    if (dto.id_kabkota <= 0) {
      throw new BadRequestException('Invalid id_kabkota');
    }
  }
}
