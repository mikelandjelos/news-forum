import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import {
  Component,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule, SidebarModule, ButtonModule, AvatarModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
  providers: [DialogService],
})
export class SideNavigationComponent {
  visible: boolean = false;

  constructor() {}

  toggle() {
    this.visible = !this.visible;
  }
}
