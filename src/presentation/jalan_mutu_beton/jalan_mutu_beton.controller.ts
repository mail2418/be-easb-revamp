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
import { JalanMutuBetonService } from "../../domain/jalan_mutu_beton/jalan_mutu_beton.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanMutuBetonDto } from "./dto/create_jalan_mutu_beton.dto";
import { UpdateJalanMutuBetonDto } from "./dto/update_jalan_mutu_beton.dto";
import { DeleteJalanMutuBetonDto } from "./dto/delete_jalan_mutu_beton.dto";
import { GetJalanMutuBetonDto } from "./dto/get_jalan_mutu_beton.dto";
import { GetJalanMutuBetonDetailDto } from "./dto/get_jalan_mutu_beton_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-mutu-beton")
@Roles(Role.SUPERADMIN)
export class JalanMutuBetonController {
    constructor(private readonly jalanMutuBetonService: JalanMutuBetonService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanMutuBetonDto): Promise<ResponseDto> {
        try {
            const jalanMutuBeton = await this.jalanMutuBetonService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Mutu Beton created",
                data: jalanMutuBeton,
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
    async updateJalanMutuBeton(@Body() dto: UpdateJalanMutuBetonDto): Promise<ResponseDto> {
        try {
            const jalanMutuBeton = await this.jalanMutuBetonService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Mutu Beton updated",
                data: jalanMutuBeton,
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
    async deleteJalanMutuBeton(@Body() dto: DeleteJalanMutuBetonDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanMutuBetonService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Mutu Beton deleted",
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
    async getJalanMutuBetons(@Query() dto: GetJalanMutuBetonDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanMutuBetonService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Mutu Beton list retrieved",
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
    async getJalanMutuBetonDetail(@Query() dto: GetJalanMutuBetonDetailDto): Promise<ResponseDto> {
        try {
            const jalanMutuBeton = await this.jalanMutuBetonService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Mutu Beton detail retrieved",
                data: jalanMutuBeton,
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

