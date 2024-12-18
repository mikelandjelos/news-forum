import { CardModule } from 'primeng/card';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Moderator } from '../../models/moderator.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { selectAuthProfileModerator } from '../../state/auth/profile/profile.selectors';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { SignOutActions } from '../../state/auth/sign-out/sign-out.actions';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    ImageModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  constructor(
    private readonly toastrService: ToastrService,
    private readonly store: Store<AppState>
  ) {}

  public moderator$: Observable<Moderator | null> = this.store.select(
    selectAuthProfileModerator
  );

  signOut(): void {
    this.store.dispatch(SignOutActions.signOut());
  }

  editInfo() {
    this.toastrService.info('TODO: Edit info!');
  }
}
