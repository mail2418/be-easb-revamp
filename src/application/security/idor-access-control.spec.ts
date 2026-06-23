import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { AsbServiceImpl } from '../asb/asb.service.impl';
import { UsulanJalanServiceImpl } from '../usulan_jalan/usulan_jalan.service.impl';
import { UsulanSaluranServiceImpl } from '../usulan_saluran/usulan_saluran.service.impl';
import { Role } from '../../domain/user/user_role.enum';

describe('IDOR access control (service layer)', () => {
    describe('AsbServiceImpl.findById', () => {
        const repository = { findById: jest.fn() };
        const service = new AsbServiceImpl(
            repository as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
        );

        beforeEach(() => jest.clearAllMocks());

        it('returns NotFound when OPD user requests ASB outside their idOpd', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(service.findById(42, 7, [Role.OPD])).rejects.toThrow(NotFoundException);
            expect(repository.findById).toHaveBeenCalledWith(42, 7);
        });

        it('forbids users without OPD/admin/verifikator roles', async () => {
            await expect(service.findById(1, null, [Role.GUEST])).rejects.toThrow(
                ForbiddenException,
            );
        });
    });

    describe('UsulanJalanServiceImpl.findById', () => {
        const repository = { findById: jest.fn() };
        const service = new UsulanJalanServiceImpl(
            repository as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
        );

        beforeEach(() => jest.clearAllMocks());

        it('scopes OPD findById to user idOpd', async () => {
            repository.findById.mockResolvedValue(null);
            await service.findById(10, 3, [Role.OPD]);
            expect(repository.findById).toHaveBeenCalledWith(10, 3);
        });

        it('does not scope admin findById by idOpd', async () => {
            repository.findById.mockResolvedValue({ id: 10 });
            await service.findById(10, 3, [Role.ADMIN]);
            expect(repository.findById).toHaveBeenCalledWith(10, undefined);
        });
    });

    describe('UsulanSaluranServiceImpl.updateIndex', () => {
        const repository = { findById: jest.fn(), update: jest.fn() };
        const service = new UsulanSaluranServiceImpl(
            repository as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
            {} as any,
        );

        beforeEach(() => jest.clearAllMocks());

        it('denies OPD update when record belongs to another OPD', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(service.updateIndex({ id: 5 } as any, 99, [Role.OPD])).rejects.toThrow(
                NotFoundException,
            );
            expect(repository.findById).toHaveBeenCalledWith(5, 99);
        });
    });
});
