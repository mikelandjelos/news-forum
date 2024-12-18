import { Moderator } from "../../models/moderator.model";
import { Status } from "../app.types";

export interface SignUpState {
  createdModerator: Moderator | null;
  error: string | null;
  status: Status | null;
}
