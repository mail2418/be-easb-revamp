import { AsbKomponenBangunanStdFiles } from './asb_komponen_bangunan_std_files.enum';

export class AsbKomponenBangunanStd {
    id!: number;
    komponen!: string;
    files!: AsbKomponenBangunanStdFiles;
    idAsbJenis!: number;
    idAsbTipeBangunan!: number;
}
