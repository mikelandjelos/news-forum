import { ModeratorHubComponent } from './moderator-hub/moderator-hub.component';
import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditDraftComponent } from './moderator-hub/edit-draft/edit-draft.component';
import { ArticlesContainerComponent } from './moderator-hub/articles-container/articles-container.component';
import { ProfilePageComponent } from './moderator-hub/profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'sign-in', pathMatch: 'full', component: SignInComponent },
  { path: 'sign-up', pathMatch: 'full', component: SignUpComponent },
  {
    path: 'moderator-hub',
    component: ModeratorHubComponent,
    children: [
      { path: 'edit-draft/:id', component: EditDraftComponent },
      {
        path: 'articles-container/:type',
        component: ArticlesContainerComponent,
      },
      { path: 'profile-page', component: ProfilePageComponent },
      { path: '', redirectTo: 'profile-page', pathMatch: 'full' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
];
