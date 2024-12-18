import { Status } from '../../app.types';

export interface SignOutState {
  error: string | null;
  status: Status | null;
}
