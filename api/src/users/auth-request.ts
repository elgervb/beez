import { User } from 'src/interfaces/user';

export type AuthRequest = Request & { user: User };