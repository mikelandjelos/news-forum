import { createActionGroup, props } from '@ngrx/store';
import { Moderator } from '../../models/moderator.model';

export const ModeratorActions = createActionGroup({
  source: 'Moderator',
  events: {
    Read: props<{ id: string }>(),
    ReadSuccess: props<{ moderator: Moderator }>(),
    Update: props<{
      id: string;
      updatedModerator: Partial<Omit<Moderator, 'password'>>;
    }>(),
    UpdateSuccess: props<{ updatedModerator: Moderator }>(),
  },
});
