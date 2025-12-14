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
import { UsulanJalanStatusService } from "../../domain/usulan_jalan_status/usulan_jalan_status.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateUsulanJalanStatusDto } from "./dto/create_usulan_jalan_status.dto";
import { UpdateUsulanJalanStatusDto } from "./dto/update_usulan_jalan_status.dto";
import { DeleteUsulanJalanStatusDto } from "./dto/delete_usulan_jalan_status.dto";
import { GetUsulanJalanStatusDto } from "./dto/get_usulan_jalan_status.dto";
import { GetUsulanJalanStatusDetailDto } from "./dto/get_usulan_jalan_status_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("usulan-jalan-status")
@Roles(Role.SUPERADMIN)
export class UsulanJalanStatusController {
    constructor(private readonly usulanJalanStatusService: UsulanJalanStatusService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateUsulanJalanStatusDto): Promise<ResponseDto> {
        try {
            const usulanJalanStatus = await this.usulanJalanStatusService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Usulan Jalan Status created",
                data: usulanJalanStatus,
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
    async updateUsulanJalanStatus(@Body() dto: UpdateUsulanJalanStatusDto): Promise<ResponseDto> {
        try {
            const usulanJalanStatus = await this.usulanJalanStatusService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Usulan Jalan Status updated",
                data: usulanJalanStatus,
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
    async deleteUsulanJalanStatus(@Body() dto: DeleteUsulanJalanStatusDto): Promise<ResponseDto> {
        try {
            const deleted = await this.usulanJalanStatusService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Usulan Jalan Status deleted",
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
    async getUsulanJalanStatuses(@Query() dto: GetUsulanJalanStatusDto): Promise<ResponseDto> {
        try {
            const result = await this.usulanJalanStatusService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Usulan Jalan Status list retrieved",
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
    async getUsulanJalanStatusDetail(@Query() dto: GetUsulanJalanStatusDetailDto): Promise<ResponseDto> {
        try {
            const usulanJalanStatus = await this.usulanJalanStatusService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Usulan Jalan Status detail retrieved",
                data: usulanJalanStatus,
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

