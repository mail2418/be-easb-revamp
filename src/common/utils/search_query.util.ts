import { Brackets, SelectQueryBuilder } from 'typeorm';

export function applyIlikeSearch(
    qb: SelectQueryBuilder<any>,
    alias: string,
    columns: string[],
    search?: string,
): void {
    const term = search?.trim();
    if (!term || columns.length === 0) {
        return;
    }

    qb.andWhere(
        new Brackets((sub) => {
            columns.forEach((column, index) => {
                const param = `search_${index}`;
                const clause = `${alias}.${column} ILIKE :${param}`;
                if (index === 0) {
                    sub.where(clause, { [param]: `%${term}%` });
                } else {
                    sub.orWhere(clause, { [param]: `%${term}%` });
                }
            });
        }),
    );
}
