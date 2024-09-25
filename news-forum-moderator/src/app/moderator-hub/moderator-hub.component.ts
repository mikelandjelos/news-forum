import { ToastNoAnimation, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Moderator } from '../models/moderator.model';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-moderator-hub',
  standalone: true,
  imports: [CommonModule, SideNavigationComponent, RouterOutlet],
  templateUrl: './moderator-hub.component.html',
  styleUrl: './moderator-hub.component.scss',
  providers: [AuthService, ToastrService, Router],
})
export class ModeratorHubComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {}

  public moderator$: Observable<Moderator | null> = of(null);

  ngOnInit(): void {
    this.testAuth();
    if (!this.authService.isSignedIn()) {
      this.toastrService.warning('Please sign in!', 'Warning');
      this.router.navigate(['/sign-in']);
    }
  }

  testAuth() {
    this.moderator$ = this.authService
      .getProfile()
      .pipe(map(({ iat, exp, ...moderator }) => moderator));
  }
}
