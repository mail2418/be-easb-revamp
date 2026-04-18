import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './common/dto/response.dto';

@Controller()
export class AppController {
    @Get()
    root(): ResponseDto<null> {
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Connection OK',
            data: null,
        };
    }
}
