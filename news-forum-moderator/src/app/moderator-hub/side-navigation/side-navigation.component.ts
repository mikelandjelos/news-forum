import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    RouterLink,
    RouterLinkActive,
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
export class SideNavigationComponent {
  @HostBinding('class.expanded') expanded: boolean = false;
}
