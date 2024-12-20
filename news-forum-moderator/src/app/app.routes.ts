import { ModeratorHubComponent } from './components/moderator-hub/moderator-hub.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfilePageComponent } from './components/moderator-hub/profile-page/profile-page.component';
import { ArticleContainerComponent } from './components/moderator-hub/article-container/article-container.component';
import { EditProfileComponent } from './components/moderator-hub/profile-page/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: 'sign-in', pathMatch: 'full', component: SignInComponent },
  { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
  {
    path: 'moderator-hub',
    component: ModeratorHubComponent,
    children: [
      { path: 'profile-page', component: ProfilePageComponent },
      { path: 'articles/:type', component: ArticleContainerComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/sign-in' },
];
