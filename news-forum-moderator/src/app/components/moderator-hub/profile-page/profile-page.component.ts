import { CardModule } from 'primeng/card';
import { Component, OnDestroy } from '@angular/core';
import { Moderator } from '../../../models/moderator.model';
import {
  combineLatest,
  merge,
  mergeMap,
  Observable,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { SignOutActions } from '../../../state/auth/sign-out/sign-out.actions';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ModeratorActions } from '../../../state/moderator/moderator.actions';
import { ToastrService } from 'ngx-toastr';
import {
  selectModeratorId,
  selectModeratorModerator,
} from '../../../state/moderator/moderator.selectors';
import { omit } from '@ngrx/store/src/utils';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    ImageModule,
    DynamicDialogModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  providers: [DialogService],
})
export class ProfilePageComponent implements OnDestroy {
  constructor(
    private readonly store: Store<AppState>,
    private readonly dialogService: DialogService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.garbageCollector.next();
    this.garbageCollector.complete();
  }

  public moderator$: Observable<Moderator | null> = this.store.select(
    selectModeratorModerator
  );

  private editProfileDialogRef!: DynamicDialogRef;
  private readonly garbageCollector = new Subject<void>();

  signOut(): void {
    this.store.dispatch(SignOutActions.signOut());
  }

  editProfile(moderator: Moderator): void {
    this.editProfileDialogRef = this.dialogService.open(EditProfileComponent, {
      header: 'Edit profile',
      closable: true,
      width: '50%',
      data: moderator,
    });

    const updatedModeratorFields$: Observable<Partial<
      Omit<Moderator, 'password'>
    > | null> = this.editProfileDialogRef.onClose;
    const id$: Observable<string | null> = this.store.select(selectModeratorId);

    combineLatest([updatedModeratorFields$, id$])
      .pipe(takeUntil(this.garbageCollector))
      .subscribe(([updatedModerator, id]) => {
        if (updatedModerator !== null && id !== null)
          this.store.dispatch(
            ModeratorActions.update({ id, updatedModerator })
          );
        else this.toastrService.warning('Nothing was updated!', 'Warning');
      });
  }
}
