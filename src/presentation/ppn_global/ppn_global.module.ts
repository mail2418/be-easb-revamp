import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PpnGlobalOrmEntity } from "../../infrastructure/ppn_global/orm/ppn_global.orm_entity";
import { PpnGlobalRepository } from "../../domain/ppn_global/ppn_global.repository";
import { PpnGlobalRepositoryImpl } from "../../infrastructure/ppn_global/repositories/ppn_global.repository.impl";
import { PpnGlobalService } from "../../domain/ppn_global/ppn_global.service";
import { PpnGlobalServiceImpl } from "../../application/ppn_global/ppn_global.service.impl";
import { PpnGlobalController } from "./ppn_global.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([PpnGlobalOrmEntity])
    ],
    controllers: [PpnGlobalController],
    providers: [
        {
            provide: PpnGlobalRepository,
            useClass: PpnGlobalRepositoryImpl
        },
        {
            provide: PpnGlobalService,
            useClass: PpnGlobalServiceImpl
        }
    ],
    exports: [PpnGlobalService, PpnGlobalRepository]
})
export class PpnGlobalModule { }
