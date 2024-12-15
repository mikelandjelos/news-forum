import { ModeratorHubComponent } from './moderator-hub/moderator-hub.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfilePageComponent } from './moderator-hub/profile-page/profile-page.component';
import { ArticleContainerComponent } from './moderator-hub/article-container/article-container.component';

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
