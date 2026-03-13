import { AsbKomponenBangunanNonStdFiles } from "./asb_komponen_bangunan_nonstd_files.enum";

export class AsbKomponenBangunanNonstd {
    id!: number;
    komponen!: string;
    files!: AsbKomponenBangunanNonStdFiles;
    idAsbJenis!: number;
    idAsbTipeBangunan!: number;
}
