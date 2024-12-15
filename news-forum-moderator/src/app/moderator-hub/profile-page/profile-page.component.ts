import { CardModule } from 'primeng/card';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Moderator } from '../../models/moderator.model';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';

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
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  public moderator$: Observable<Moderator | null> = of(null);
  private onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.moderator$ = this.authService.getProfile().pipe(
      map(({ iat, exp, ...moderator }) => {
        if (!this.authService.getAuthToken() || !moderator) {
          this.toastrService.warning('Please sign in!', 'Warning');
          this.router.navigate(['/sign-in']);
        }
        return moderator;
      })
    );
  }

  signOut(): void {
    this.authService
      .signOut()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (_) => {
          this.toastrService.info('Successfully signed out!', 'Info');
          this.router.navigate(['/sign-in']);
        },
      });
  }

  editInfo() {
    this.toastrService.info("TODO: Edit info!")
  }
}
