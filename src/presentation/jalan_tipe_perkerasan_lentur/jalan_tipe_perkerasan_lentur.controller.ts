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
import { JalanTipePerkerasanLenturService } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanTipePerkerasanLenturDto } from "./dto/create_jalan_tipe_perkerasan_lentur.dto";
import { UpdateJalanTipePerkerasanLenturDto } from "./dto/update_jalan_tipe_perkerasan_lentur.dto";
import { DeleteJalanTipePerkerasanLenturDto } from "./dto/delete_jalan_tipe_perkerasan_lentur.dto";
import { GetJalanTipePerkerasanLenturDto } from "./dto/get_jalan_tipe_perkerasan_lentur.dto";
import { GetJalanTipePerkerasanLenturDetailDto } from "./dto/get_jalan_tipe_perkerasan_lentur_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-tipe-perkerasan-lentur")
@Roles(Role.SUPERADMIN)
export class JalanTipePerkerasanLenturController {
    constructor(private readonly jalanTipePerkerasanLenturService: JalanTipePerkerasanLenturService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanTipePerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanLentur = await this.jalanTipePerkerasanLenturService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Tipe Perkerasan Lentur created",
                data: jalanTipePerkerasanLentur,
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
    async update(@Body() dto: UpdateJalanTipePerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanLentur = await this.jalanTipePerkerasanLenturService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Lentur updated",
                data: jalanTipePerkerasanLentur,
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
    async delete(@Body() dto: DeleteJalanTipePerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanTipePerkerasanLenturService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Lentur deleted",
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
    async findAll(@Query() dto: GetJalanTipePerkerasanLenturDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanTipePerkerasanLenturService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Lentur list retrieved",
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
    async findById(@Query() dto: GetJalanTipePerkerasanLenturDetailDto): Promise<ResponseDto> {
        try {
            const jalanTipePerkerasanLentur = await this.jalanTipePerkerasanLenturService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Tipe Perkerasan Lentur detail retrieved",
                data: jalanTipePerkerasanLentur,
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
