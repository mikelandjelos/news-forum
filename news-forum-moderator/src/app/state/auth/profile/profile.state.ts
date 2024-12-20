import { Status } from "../../app.types";

export interface ProfileState {
  id: string | null;
  username: string | null;
  status: Status | null;
}
