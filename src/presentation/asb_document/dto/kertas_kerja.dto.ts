import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { AsbDetailReviewWithRelationDto } from 'src/application/asb_detail_review/dto/asb_detail_review_with_relation.dto';

export class KertasKerjaDto {
    title: string;
    usernameOpd: string | undefined;
    tipe_bangunan: string | undefined;
    tanggal_cetak: string;
    dataAsb: AsbWithRelationsDto;
    dataAsbDetailReview: AsbDetailReviewWithRelationDto[];
    shst: number | null;
    dataBps: {
        komponen: string | undefined;
        asb: {
            bobot_input: number;
            jumlah_bobot: number;
            rincian_harga: number;
        };
    }[];
    dataBpns: {
        komponen: string | undefined;
        asb: {
            bobot_input: number;
            jumlah_bobot: number;
            rincian_harga: number;
        };
    }[];
}
