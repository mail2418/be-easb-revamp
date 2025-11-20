import { User } from "src/domain/user/user.entity";

export interface UsersPaginationResult {
  users: User[];
  total: number;
  page: number;
  amount: number;
  totalPages: number;
}
