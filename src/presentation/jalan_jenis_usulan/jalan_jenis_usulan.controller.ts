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
import { JalanJenisUsulanService } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateJalanJenisUsulanDto } from "./dto/create_jalan_jenis_usulan.dto";
import { UpdateJalanJenisUsulanDto } from "./dto/update_jalan_jenis_usulan.dto";
import { DeleteJalanJenisUsulanDto } from "./dto/delete_jalan_jenis_usulan.dto";
import { GetJalanJenisUsulanDto } from "./dto/get_jalan_jenis_usulan.dto";
import { GetJalanJenisUsulanDetailDto } from "./dto/get_jalan_jenis_usulan_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("jalan-jenis-usulan")
@Roles(Role.SUPERADMIN)
export class JalanJenisUsulanController {
    constructor(private readonly jalanJenisUsulanService: JalanJenisUsulanService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanJenisUsulanDto): Promise<ResponseDto> {
        try {
            const jalanJenisUsulan = await this.jalanJenisUsulanService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "Jalan Jenis Usulan created",
                data: jalanJenisUsulan,
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
    async update(@Body() dto: UpdateJalanJenisUsulanDto): Promise<ResponseDto> {
        try {
            const jalanJenisUsulan = await this.jalanJenisUsulanService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Jenis Usulan updated",
                data: jalanJenisUsulan,
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
    async delete(@Body() dto: DeleteJalanJenisUsulanDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanJenisUsulanService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Jenis Usulan deleted",
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
    async findAll(@Query() dto: GetJalanJenisUsulanDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanJenisUsulanService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Jenis Usulan list retrieved",
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
    async findById(@Query() dto: GetJalanJenisUsulanDetailDto): Promise<ResponseDto> {
        try {
            const jalanJenisUsulan = await this.jalanJenisUsulanService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "Jalan Jenis Usulan detail retrieved",
                data: jalanJenisUsulan,
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
