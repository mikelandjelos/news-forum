import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Moderator } from '../models/moderator.model';
import { map, Observable, of } from 'rxjs';
import { authInterceptor } from '../interceptors/auth.interceptor';

@Component({
  selector: 'app-moderator-hub',
  standalone: true,
  imports: [CommonModule, SideNavigationComponent, RouterOutlet],
  templateUrl: './moderator-hub.component.html',
  styleUrl: './moderator-hub.component.scss',
  providers: [AuthService, ToastrService],
})
export class ModeratorHubComponent {}
