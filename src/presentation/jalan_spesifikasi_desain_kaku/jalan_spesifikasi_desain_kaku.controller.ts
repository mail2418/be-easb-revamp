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
import { JalanSpesifikasiDesainKakuService } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanSpesifikasiDesainKakuDto } from "./dto/create_jalan_spesifikasi_desain_kaku.dto";
import { UpdateJalanSpesifikasiDesainKakuDto } from "./dto/update_jalan_spesifikasi_desain_kaku.dto";
import { DeleteJalanSpesifikasiDesainKakuDto } from "./dto/delete_jalan_spesifikasi_desain_kaku.dto";
import { GetJalanSpesifikasiDesainKakuDto } from "./dto/get_jalan_spesifikasi_desain_kaku.dto";
import { GetJalanSpesifikasiDesainKakuDetailDto } from "./dto/get_jalan_spesifikasi_desain_kaku_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-spesifikasi-desain-kaku")
@Roles(Role.SUPERADMIN)
export class JalanSpesifikasiDesainKakuController {
    constructor(private readonly jalanSpesifikasiDesainKakuService: JalanSpesifikasiDesainKakuService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSpesifikasiDesainKakuDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainKaku = await this.jalanSpesifikasiDesainKakuService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Spesifikasi Desain Kaku created",
                data: jalanSpesifikasiDesainKaku,
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
    async updateJalanSpesifikasiDesainKaku(@Body() dto: UpdateJalanSpesifikasiDesainKakuDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainKaku = await this.jalanSpesifikasiDesainKakuService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Kaku updated",
                data: jalanSpesifikasiDesainKaku,
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
    async deleteJalanSpesifikasiDesainKaku(@Body() dto: DeleteJalanSpesifikasiDesainKakuDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanSpesifikasiDesainKakuService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Kaku deleted",
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
    async getJalanSpesifikasiDesainKakus(@Query() dto: GetJalanSpesifikasiDesainKakuDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanSpesifikasiDesainKakuService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Kaku list retrieved",
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
    async getJalanSpesifikasiDesainKakuDetail(@Query() dto: GetJalanSpesifikasiDesainKakuDetailDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainKaku = await this.jalanSpesifikasiDesainKakuService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Kaku detail retrieved",
                data: jalanSpesifikasiDesainKaku,
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

