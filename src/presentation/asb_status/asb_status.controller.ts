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
import { AsbStatusService } from "../../domain/asb_status/asb_status.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateAsbStatusDto } from "./dto/create_asb_status.dto";
import { UpdateAsbStatusDto } from "./dto/update_asb_status.dto";
import { DeleteAsbStatusDto } from "./dto/delete_asb_status.dto";
import { GetAsbStatusDto } from "./dto/get_asb_status.dto";
import { GetAsbStatusDetailDto } from "./dto/get_asb_status_detail.dto";
import { ResponseDto } from "../../common/dto/response.dto";
import { Role } from "../../domain/user/user_role.enum";

@Controller("asb-status")
@Roles(Role.SUPERADMIN)
export class AsbStatusController {
    constructor(private readonly asbStatusService: AsbStatusService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbStatusDto): Promise<ResponseDto> {
        try {
            const asbStatus = await this.asbStatusService.create(dto);

            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "AsbStatus created",
                data: asbStatus,
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
    async updateAsbStatus(@Body() dto: UpdateAsbStatusDto): Promise<ResponseDto> {
        try {
            const asbStatus = await this.asbStatusService.update(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbStatus updated",
                data: asbStatus,
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
    async deleteAsbStatus(@Body() dto: DeleteAsbStatusDto): Promise<ResponseDto> {
        try {
            const deleted = await this.asbStatusService.delete(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbStatus deleted",
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
    @Roles(Role.SUPERADMIN)
    async getAsbStatuses(@Query() dto: GetAsbStatusDto): Promise<ResponseDto> {
        try {
            const result = await this.asbStatusService.findAll(dto);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbStatuses retrieved",
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
    @Roles(Role.SUPERADMIN)
    async getAsbStatusDetail(@Query() dto: GetAsbStatusDetailDto): Promise<ResponseDto> {
        try {
            const asbStatus = await this.asbStatusService.findById(dto.id);

            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "AsbStatus detail retrieved",
                data: asbStatus,
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