import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '',component: DashboardComponent},  
  { path: 'upload', component: UploadComponent }
];
