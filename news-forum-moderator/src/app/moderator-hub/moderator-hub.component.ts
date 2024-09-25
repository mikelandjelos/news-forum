import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Moderator } from '../models/moderator.model';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-moderator-hub',
  standalone: true,
  imports: [CommonModule, SideNavigationComponent, RouterOutlet],
  templateUrl: './moderator-hub.component.html',
  styleUrl: './moderator-hub.component.scss',
  providers: [AuthService],
})
export class ModeratorHubComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  public moderator$: Observable<Moderator | null> = of(null);

  ngOnInit(): void {
    this.testAuth();
  }

  testAuth() {
    this.moderator$ = this.authService
      .getProfile()
      .pipe(map(({ iat, exp, ...moderator }) => moderator));
  }
}
