import { Status } from "../../app.types";

export interface SignInState {
  error: string | null;
  status: Status | null;
}
