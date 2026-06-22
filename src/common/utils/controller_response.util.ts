import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

export function toResponseDto<T>(
    data: T,
    message: string,
    responseCode = HttpStatus.OK,
): ResponseDto {
    return {
        status: 'success',
        responseCode,
        message,
        data,
    };
}

export function toErrorResponseDto(error: unknown): ResponseDto {
    if (error instanceof HttpException) {
        const status = error.getStatus();
        const response = error.getResponse();

        let message: string;
        if (typeof response === 'string') {
            message = response;
        } else {
            const resObj = response as { message?: string | string[] };
            if (Array.isArray(resObj.message)) {
                message = resObj.message.join(', ');
            } else {
                message = resObj.message ?? 'Error';
            }
        }

        return {
            status: 'error',
            responseCode: status,
            message,
            data: null,
        };
    }

    return {
        status: 'error',
        responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
    };
}
