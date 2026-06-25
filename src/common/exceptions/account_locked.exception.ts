import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountLockedException extends HttpException {
    constructor(lockedUntil: Date) {
        super(
            {
                message: 'Account locked',
                lockType: 'account_locked',
                lockedUntil: lockedUntil.toISOString(),
            },
            HttpStatus.LOCKED,
        );
    }
}
