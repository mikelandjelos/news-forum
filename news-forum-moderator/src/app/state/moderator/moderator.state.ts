import { Moderator } from '../../models/moderator.model';

export interface ModeratorState {
  id: string | null;
  moderator: Moderator | null;
  updatedModerator: Partial<Omit<Moderator, 'password'>> | null;
}
