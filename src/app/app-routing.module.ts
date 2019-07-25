import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { EditorComponent } from './pages/editor/editor.component';
import { AppsComponent } from './pages/apps/apps.component';
import { SelectDeviceComponent } from './pages/select-device/select-device.component';
import { SelectLayoutComponent } from './pages/select-layout/select-layout.component';
import { UploadScreenshotComponent } from './pages/upload-screenshot/upload-screenshot.component';
import { SelectPlatformComponent } from './pages/select-platform/select-platform.component';
import { NewAppSetupComponent } from './pages/new-app-setup/new-app-setup.component';

const routes: Routes = [
  { path: '', component: EditorComponent },
  { path: 'apps', component: AppsComponent },
  { path: 'select-platform', component: SelectPlatformComponent },
  { path: 'select-device', component: SelectDeviceComponent },
  { path: 'select-layout', component: SelectLayoutComponent },
  { path: 'upload-screenshot', component: UploadScreenshotComponent },
  { path: 'app-setup', component: NewAppSetupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
