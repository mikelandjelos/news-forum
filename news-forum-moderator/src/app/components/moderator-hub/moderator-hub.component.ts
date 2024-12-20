import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { ProfileActions } from '../../state/auth/profile/profile.actions';

@Component({
  selector: 'app-moderator-hub',
  standalone: true,
  imports: [
    CommonModule,
    SideNavigationComponent,
    RouterOutlet,
    TopMenuComponent,
  ],
  templateUrl: './moderator-hub.component.html',
  styleUrl: './moderator-hub.component.scss',
  providers: [AuthService, ToastrService],
})
export class ModeratorHubComponent {
  constructor(private readonly store: Store<AppState>) {
    store.dispatch(ProfileActions.checkIfAuthenticated());
  }
}
