import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsbLantaiController } from "./asb_lantai.controller";
import { AsbLantaiServiceImpl } from "../../application/asb_lantai/asb_lantai.service.impl";
import { AsbLantaiRepositoryImpl } from "../../infrastructure/asb_lantai/repositories/asb_lantai.repository.impl";
import { AsbLantaiOrmEntity } from "../../infrastructure/asb_lantai/orm/asb_lantai.orm_entity";
import { AsbLantaiService } from "../../domain/asb_lantai/asb_lantai.service";
import { AsbLantaiRepository } from "../../domain/asb_lantai/asb_lantai.repository";
import { SatuanModule } from "../satuan/satuan.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbLantaiOrmEntity]),
        SatuanModule
    ],
    controllers: [AsbLantaiController],
    providers: [
        {
            provide: AsbLantaiService,
            useClass: AsbLantaiServiceImpl,
        },
        {
            provide: AsbLantaiRepository,
            useClass: AsbLantaiRepositoryImpl,
        },
    ],
    exports: [
        AsbLantaiService,
        AsbLantaiRepository,
    ],
})
export class AsbLantaiModule { }
