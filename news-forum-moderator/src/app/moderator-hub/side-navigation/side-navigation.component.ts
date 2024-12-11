import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    DynamicDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
  providers: [DialogService],
})
export class SideNavigationComponent implements OnDestroy {
  @HostBinding('class.expanded') expanded: boolean = false;

  private onDestroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
      this.onDestroy$.next();
      this.onDestroy$.complete();
  }

  signOut(): void {
    this.authService.signOut().pipe(takeUntil(this.onDestroy$)).subscribe({
      next: _ => {
        this.toastrService.info('Successfully signed out!', 'Info');
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
