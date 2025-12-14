import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    HttpStatus,
    HttpException,
    Query,
} from "@nestjs/common";
import { JalanRuangLingkupPerkerasanLenturService } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanRuangLingkupPerkerasanLenturDto } from "./dto/create_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { UpdateJalanRuangLingkupPerkerasanLenturDto } from "./dto/update_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { DeleteJalanRuangLingkupPerkerasanLenturDto } from "./dto/delete_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { GetJalanRuangLingkupPerkerasanLenturDto } from "./dto/get_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { GetJalanRuangLingkupPerkerasanLenturDetailDto } from "./dto/get_jalan_ruang_lingkup_perkerasan_lentur_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-ruang-lingkup-perkerasan-lentur")
@Roles(Role.SUPERADMIN)
export class JalanRuangLingkupPerkerasanLenturController {
    constructor(private readonly jalanRuangLingkupPerkerasanLenturService: JalanRuangLingkupPerkerasanLenturService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanRuangLingkupPerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const jalanRuangLingkupPerkerasanLentur = await this.jalanRuangLingkupPerkerasanLenturService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Ruang Lingkup Perkerasan Lentur created",
                data: jalanRuangLingkupPerkerasanLentur,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === "string") {
                    message = response;
                } else {
                    const resObj = response as any;
                    if (Array.isArray(resObj.message)) {
                        message = resObj.message.join(", ");
                    } else {
                        message = resObj.message ?? "Error";
                    }
                }

                return {
                    status: "error",
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: "error",
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: null,
            };
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN)
    async updateJalanRuangLingkupPerkerasanLentur(@Body() dto: UpdateJalanRuangLingkupPerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const jalanRuangLingkupPerkerasanLentur = await this.jalanRuangLingkupPerkerasanLenturService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Ruang Lingkup Perkerasan Lentur updated",
                data: jalanRuangLingkupPerkerasanLentur,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === "string") {
                    message = response;
                } else {
                    const resObj = response as any;
                    if (Array.isArray(resObj.message)) {
                        message = resObj.message.join(", ");
                    } else {
                        message = resObj.message ?? "Error";
                    }
                }

                return {
                    status: "error",
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: "error",
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: null,
            };
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    async deleteJalanRuangLingkupPerkerasanLentur(@Body() dto: DeleteJalanRuangLingkupPerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanRuangLingkupPerkerasanLenturService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Ruang Lingkup Perkerasan Lentur deleted",
                data: deleted,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === "string") {
                    message = response;
                } else {
                    const resObj = response as any;
                    if (Array.isArray(resObj.message)) {
                        message = resObj.message.join(", ");
                    } else {
                        message = resObj.message ?? "Error";
                    }
                }

                return {
                    status: "error",
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: "error",
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: null,
            };
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getJalanRuangLingkupPerkerasanLenturs(@Query() dto: GetJalanRuangLingkupPerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanRuangLingkupPerkerasanLenturService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Ruang Lingkup Perkerasan Lentur list retrieved",
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === "string") {
                    message = response;
                } else {
                    const resObj = response as any;
                    if (Array.isArray(resObj.message)) {
                        message = resObj.message.join(", ");
                    } else {
                        message = resObj.message ?? "Error";
                    }
                }

                return {
                    status: "error",
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: "error",
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: null,
            };
        }
    }

    @Get("detail")
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getJalanRuangLingkupPerkerasanLenturDetail(@Query() dto: GetJalanRuangLingkupPerkerasanLenturDetailDto): Promise<ResponseDto> {
        try {
            const jalanRuangLingkupPerkerasanLentur = await this.jalanRuangLingkupPerkerasanLenturService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Ruang Lingkup Perkerasan Lentur detail retrieved",
                data: jalanRuangLingkupPerkerasanLentur,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === "string") {
                    message = response;
                } else {
                    const resObj = response as any;
                    if (Array.isArray(resObj.message)) {
                        message = resObj.message.join(", ");
                    } else {
                        message = resObj.message ?? "Error";
                    }
                }

                return {
                    status: "error",
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: "error",
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal server error",
                data: null,
            };
        }
    }
}

