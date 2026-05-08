import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UploadBoxComponent } from "./shared/upload-box/upload-box.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    UploadBoxComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
