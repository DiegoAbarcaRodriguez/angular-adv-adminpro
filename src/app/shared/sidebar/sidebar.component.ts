import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
  ]
})
export class SidebarComponent {

  menuItems: any[] = [];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }
}
