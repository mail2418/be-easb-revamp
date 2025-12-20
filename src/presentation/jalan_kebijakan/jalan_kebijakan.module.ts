import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanKebijakanOrmEntity } from "../../infrastructure/jalan_kebijakan/orm/jalan_kebijakan.orm_entity";
import { JalanKebijakanRepository } from "../../domain/jalan_kebijakan/jalan_kebijakan.repository";
import { JalanKebijakanRepositoryImpl } from "../../infrastructure/jalan_kebijakan/repositories/jalan_kebijakan.repository.impl";
import { JalanKebijakanService } from "../../domain/jalan_kebijakan/jalan_kebijakan.service";
import { JalanKebijakanServiceImpl } from "../../application/jalan_kebijakan/jalan_kebijakan.service.impl";
import { JalanKebijakanController } from "./jalan_kebijakan.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([JalanKebijakanOrmEntity])
    ],
    controllers: [JalanKebijakanController],
    providers: [
        {
            provide: JalanKebijakanRepository,
            useClass: JalanKebijakanRepositoryImpl
        },
        {
            provide: JalanKebijakanService,
            useClass: JalanKebijakanServiceImpl
        }
    ],
    exports: [JalanKebijakanService, JalanKebijakanRepository]
})
export class JalanKebijakanModule { }
