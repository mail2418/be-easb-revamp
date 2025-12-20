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
import { JalanTipePerkerasanKakuService } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanTipePerkerasanKakuDto } from "./dto/create_jalan_tipe_perkerasan_kaku.dto";
import { UpdateJalanTipePerkerasanKakuDto } from "./dto/update_jalan_tipe_perkerasan_kaku.dto";
import { DeleteJalanTipePerkerasanKakuDto } from "./dto/delete_jalan_tipe_perkerasan_kaku.dto";
import { GetJalanTipePerkerasanKakuDto } from "./dto/get_jalan_tipe_perkerasan_kaku.dto";
import { GetJalanTipePerkerasanKakuDetailDto } from "./dto/get_jalan_tipe_perkerasan_kaku_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-tipe-perkerasan-kaku")
@Roles(Role.SUPERADMIN)
export class JalanTipePerkerasanKakuController {
    constructor(private readonly jalanTipePerkerasanKakuService: JalanTipePerkerasanKakuService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanTipePerkerasanKakuDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanKaku = await this.jalanTipePerkerasanKakuService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Tipe Perkerasan Kaku created",
                data: jalanTipePerkerasanKaku,
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
    async update(@Body() dto: UpdateJalanTipePerkerasanKakuDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanKaku = await this.jalanTipePerkerasanKakuService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Kaku updated",
                data: jalanTipePerkerasanKaku,
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
    async delete(@Body() dto: DeleteJalanTipePerkerasanKakuDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanTipePerkerasanKakuService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Kaku deleted",
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
    async findAll(@Query() dto: GetJalanTipePerkerasanKakuDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanTipePerkerasanKakuService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Kaku list retrieved",
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
    async findById(@Query() dto: GetJalanTipePerkerasanKakuDetailDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanKaku = await this.jalanTipePerkerasanKakuService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Kaku detail retrieved",
                data: jalanTipePerkerasanKaku,
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
