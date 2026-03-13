import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    UseGuards,
    HttpStatus,
    HttpException,
    Query,
} from "@nestjs/common";
import { JenisStandarService } from "../../domain/jenis_standar/jenis_standar.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJenisStandarDto } from "./dto/create_jenis_standar.dto";
import { UpdateJenisStandarDto } from "./dto/update_jenis_standar.dto";
import { DeleteJenisStandarDto } from "./dto/delete_jenis_standar.dto";
import { GetJenisStandarDto } from "./dto/get_jenis_standar.dto";
import { GetJenisStandarDetailDto } from "./dto/get_jenis_standar_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jenis-standar")
@Roles(Role.SUPERADMIN)
export class JenisStandarController {
    constructor(private readonly jenisStandarService: JenisStandarService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJenisStandarDto): Promise<ResponseDto> {
        try {
            const jenisStandar = await this.jenisStandarService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "JenisStandar created",
                data: jenisStandar,
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
    async updateJenisStandar(@Body() dto: UpdateJenisStandarDto): Promise<ResponseDto> {
        try {
            const jenisStandar = await this.jenisStandarService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisStandar updated",
                data: jenisStandar,
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
    async deleteJenisStandar(@Body() dto: DeleteJenisStandarDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jenisStandarService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisStandar deleted",
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
    async getJenisStandars(@Query() dto: GetJenisStandarDto): Promise<ResponseDto> {
        try {
            const result = await this.jenisStandarService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisStandars retrieved",
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
    async getJenisStandarDetail(@Query() dto: GetJenisStandarDetailDto): Promise<ResponseDto> {
        try {
            const jenisStandar = await this.jenisStandarService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisStandar detail retrieved",
                data: jenisStandar,
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