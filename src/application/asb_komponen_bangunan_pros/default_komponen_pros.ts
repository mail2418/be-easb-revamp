/** Fallback bobot acuan when superadmin has not configured pros yet. */
export const DEFAULT_KOMPONEN_PROS = {
    min: 0.05,
    avgMin: 0.08,
    avg: 0.1,
    avgMax: 0.12,
    max: 0.15,
} as const;

export type KomponenProsWeights = {
    min?: number | null;
    avgMin?: number | null;
    avg?: number | null;
    avgMax?: number | null;
    max?: number | null;
};

export function resolveKomponenPros<T extends KomponenProsWeights>(
    pros: T | null | undefined,
): T | typeof DEFAULT_KOMPONEN_PROS {
    return pros ?? DEFAULT_KOMPONEN_PROS;
}

export function defaultProsCreateDto(idAsbKomponenBangunanNonstd: number) {
    return {
        idAsbKomponenBangunanNonstd,
        ...DEFAULT_KOMPONEN_PROS,
    };
}

export function defaultProsStdCreateDto(idAsbKomponenBangunanStd: number) {
    return {
        idAsbKomponenBangunanStd,
        ...DEFAULT_KOMPONEN_PROS,
    };
}
