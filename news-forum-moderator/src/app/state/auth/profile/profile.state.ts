import { Moderator } from "../../../models/moderator.model";
import { Status } from "../../app.types";

export interface ProfileState {
  moderator: Moderator | null;
  status: Status | null;
}
