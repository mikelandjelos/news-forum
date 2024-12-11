import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Moderator } from '../../models/moderator.model';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
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
}
