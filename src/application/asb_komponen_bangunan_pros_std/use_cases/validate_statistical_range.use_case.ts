import { BadRequestException } from '@nestjs/common';

export class ValidateStatisticalRangeUseCase {
    execute(min: number, avgMin: number | undefined, avg: number, avgMax: number | undefined, max: number): void {
        if (avgMin !== undefined && min > avgMin) throw new BadRequestException(`min (${min}) cannot be greater than avgMin (${avgMin})`);
        if (avgMin !== undefined && avgMin > avg) throw new BadRequestException(`avgMin (${avgMin}) cannot be greater than avg (${avg})`);

        // If avgMin is missing, check min <= avg
        if (avgMin === undefined && min > avg) throw new BadRequestException(`min (${min}) cannot be greater than avg (${avg})`);

        if (avgMax !== undefined && avg > avgMax) throw new BadRequestException(`avg (${avg}) cannot be greater than avgMax (${avgMax})`);
        if (avgMax !== undefined && avgMax > max) throw new BadRequestException(`avgMax (${avgMax}) cannot be greater than max (${max})`);

        // If avgMax is missing, check avg <= max
        if (avgMax === undefined && avg > max) throw new BadRequestException(`avg (${avg}) cannot be greater than max (${max})`);
    }
}
