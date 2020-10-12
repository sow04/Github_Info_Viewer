import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTablesModule } from 'angular-datatables';

import { GithubAppComponent } from './components/github-app/github-app.component';
import { GithubProfileComponent } from './components/github-profile/github-profile.component';
import { GithubProfileDataComponent } from './components/github-profile-data/github-profile-data.component';
import { GithubReposComponent } from './components/github-repos/github-repos.component';
import { FilterPipe } from './filter-pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    GithubAppComponent,
    GithubProfileComponent,
    GithubProfileDataComponent,
    GithubReposComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
