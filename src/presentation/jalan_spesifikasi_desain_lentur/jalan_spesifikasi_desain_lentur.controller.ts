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
import { JalanSpesifikasiDesainLenturService } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanSpesifikasiDesainLenturDto } from "./dto/create_jalan_spesifikasi_desain_lentur.dto";
import { UpdateJalanSpesifikasiDesainLenturDto } from "./dto/update_jalan_spesifikasi_desain_lentur.dto";
import { DeleteJalanSpesifikasiDesainLenturDto } from "./dto/delete_jalan_spesifikasi_desain_lentur.dto";
import { GetJalanSpesifikasiDesainLenturDto } from "./dto/get_jalan_spesifikasi_desain_lentur.dto";
import { GetJalanSpesifikasiDesainLenturDetailDto } from "./dto/get_jalan_spesifikasi_desain_lentur_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-spesifikasi-desain-lentur")
@Roles(Role.SUPERADMIN)
export class JalanSpesifikasiDesainLenturController {
    constructor(private readonly jalanSpesifikasiDesainLenturService: JalanSpesifikasiDesainLenturService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSpesifikasiDesainLenturDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainLentur = await this.jalanSpesifikasiDesainLenturService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Spesifikasi Desain Lentur created",
                data: jalanSpesifikasiDesainLentur,
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
    async updateJalanSpesifikasiDesainLentur(@Body() dto: UpdateJalanSpesifikasiDesainLenturDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainLentur = await this.jalanSpesifikasiDesainLenturService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Lentur updated",
                data: jalanSpesifikasiDesainLentur,
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
    async deleteJalanSpesifikasiDesainLentur(@Body() dto: DeleteJalanSpesifikasiDesainLenturDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanSpesifikasiDesainLenturService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Lentur deleted",
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
    async getJalanSpesifikasiDesainLenturs(@Query() dto: GetJalanSpesifikasiDesainLenturDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanSpesifikasiDesainLenturService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Lentur list retrieved",
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
    async getJalanSpesifikasiDesainLenturDetail(@Query() dto: GetJalanSpesifikasiDesainLenturDetailDto): Promise<ResponseDto> {
        try {
            const jalanSpesifikasiDesainLentur = await this.jalanSpesifikasiDesainLenturService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Spesifikasi Desain Lentur detail retrieved",
                data: jalanSpesifikasiDesainLentur,
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

