import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './common/dto/response.dto';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
    @Public()
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
