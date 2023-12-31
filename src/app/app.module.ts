import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { SearchPanelComponent } from './layout/content-layout/components/search-panel/search-panel.component';
import { HeaderComponent } from './layout/content-layout/components/header/header.component';
import { FooterComponent } from './layout/content-layout/components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginModalComponent } from './modules/auth/login-modal/login-modal.component';
import { ResetPasswordModalComponent } from './modules/auth/reset-password-modal/reset-password-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    SearchPanelComponent,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    ResetPasswordModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
