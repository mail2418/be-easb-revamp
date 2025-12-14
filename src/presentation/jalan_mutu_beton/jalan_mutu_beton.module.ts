import { Module } from "@nestjs/common";
import { JalanMutuBetonController } from "./jalan_mutu_beton.controller";
import { JalanMutuBetonService } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.service";
import { JalanMutuBetonRepository } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.repository";
import { JalanMutuBetonRepositoryImpl } from "../../infrastructure/jalan_mutu_beton/repositories/jalan_mutu_beton.repository.impl";
import { JalanMutuBetonServiceImpl } from "../../application/jalan_mutu_beton/jalan_mutu_beton.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanMutuBetonOrmEntity } from "../../infrastructure/jalan_mutu_beton/orm/jalan_mutu_beton.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanMutuBetonOrmEntity])],
    controllers: [JalanMutuBetonController],
    providers: [
        {
            provide: JalanMutuBetonService,
            useClass: JalanMutuBetonServiceImpl,
        },
        {
            provide: JalanMutuBetonRepository,
            useClass: JalanMutuBetonRepositoryImpl,
        },
    ],
    exports: [JalanMutuBetonService],
})
export class JalanMutuBetonModule {}

