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
import { AsbTipeBangunanService } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateAsbTipeBangunanDto } from "./dto/create_asb_tipe_bangunan.dto";
import { UpdateAsbTipeBangunanDto } from "./dto/update_asb_tipe_bangunan.dto";
import { DeleteAsbTipeBangunanDto } from "./dto/delete_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDto } from "./dto/get_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDetailDto } from "./dto/get_asb_tipe_bangunan_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("asb-tipe-bangunan")
@Roles(Role.SUPERADMIN)
export class AsbTipeBangunanController {
    constructor(private readonly asbTipeBangunanService: AsbTipeBangunanService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbTipeBangunanDto): Promise<ResponseDto> {
        try {
            const asbTipeBangunan = await this.asbTipeBangunanService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "AsbTipeBangunan created",
                data: asbTipeBangunan,
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
    async updateAsbTipeBangunan(@Body() dto: UpdateAsbTipeBangunanDto): Promise<ResponseDto> {
        try {
            const asbTipeBangunan = await this.asbTipeBangunanService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbTipeBangunan updated",
                data: asbTipeBangunan,
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
    async deleteAsbTipeBangunan(@Body() dto: DeleteAsbTipeBangunanDto): Promise<ResponseDto> {
        try {
            const deleted = await this.asbTipeBangunanService.delete(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbTipeBangunan deleted",
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
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAsbTipeBangunan(@Query() dto: GetAsbTipeBangunanDto): Promise<ResponseDto> {
        try {
            const result = await this.asbTipeBangunanService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbTipeBangunan retrieved",
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
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAsbTipeBangunanDetail(@Query() dto: GetAsbTipeBangunanDetailDto): Promise<ResponseDto> {
        try {
            const asbTipeBangunan = await this.asbTipeBangunanService.findById(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbTipeBangunan detail retrieved",
                data: asbTipeBangunan,
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
