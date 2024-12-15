import { SplitButtonModule } from 'primeng/splitbutton';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    CommonModule,
    DockModule,
    CommonModule,
    ButtonModule,
    TooltipModule,
    SpeedDialModule,
    SplitButtonModule,
    ToastrModule,
    SideNavigationComponent,
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {
  @ViewChild('sideNavigation') sideNavigation!: SideNavigationComponent;

  items: MenuItem[] = [
    {
      tooltip: 'Articles',
      state: {
        showIcon: 'pi pi-bars',
        hideIcon: 'pi pi-times',
        items: [
          {
            icon: 'pi pi-file-edit',
            tooltip: 'Drafts',
            command: () => {
              this.router.navigate(['/moderator-hub', 'articles', 'drafts']);
            },
          },
          {
            icon: 'pi pi-file-check',
            tooltip: 'Posts',
            command: () => {
              this.router.navigate(['/moderator-hub', 'articles', 'posts']);
            },
          },
          {
            icon: 'pi pi-file-excel',
            tooltip: 'Archives',
            command: () => {
              this.router.navigate(['/moderator-hub', 'articles', 'archives']);
            },
          },
        ],
      },
    },
    {
      icon: 'pi-user',
      tooltip: 'User Profile',
      routerLink: ['/moderator-hub', 'profile-page'],
    },
    {
      icon: 'pi-plus',
      tooltip: 'Create New Draft',
      command: () => {
        this.toastr.success('TODO: Create New Draft');
      },
    },
    {
      icon: 'pi-chevron-left',
      command: (e: MenuItemCommandEvent) => this.sideNavigation.toggle(),
      tooltip: 'Toggle Side Navigation',
    },
  ];

  private onDestroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
