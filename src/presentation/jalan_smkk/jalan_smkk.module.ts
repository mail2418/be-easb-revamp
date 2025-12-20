import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSmkkOrmEntity } from "../../infrastructure/jalan_smkk/orm/jalan_smkk.orm_entity";
import { JalanSmkkRepository } from "../../domain/jalan_smkk/jalan_smkk.repository";
import { JalanSmkkRepositoryImpl } from "../../infrastructure/jalan_smkk/repositories/jalan_smkk.repository.impl";
import { JalanSmkkService } from "../../domain/jalan_smkk/jalan_smkk.service";
import { JalanSmkkServiceImpl } from "../../application/jalan_smkk/jalan_smkk.service.impl";
import { JalanSmkkController } from "./jalan_smkk.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([JalanSmkkOrmEntity])
    ],
    controllers: [JalanSmkkController],
    providers: [
        {
            provide: JalanSmkkRepository,
            useClass: JalanSmkkRepositoryImpl
        },
        {
            provide: JalanSmkkService,
            useClass: JalanSmkkServiceImpl
        }
    ],
    exports: [JalanSmkkService, JalanSmkkRepository]
})
export class JalanSmkkModule { }
