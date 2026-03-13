import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePriceRangeUseCase {
    execute(priceFrom: number, priceTo: number): void {
        if (priceTo < priceFrom) {
            throw new BadRequestException('price_to must be greater than or equal to price_from');
        }
    }
}
