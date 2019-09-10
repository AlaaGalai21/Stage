import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';



import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { from } from 'rxjs/observable/from';


const routes: Routes = [
  {path :'contactmanager' , loadChildren :'./contactmanager/contactmanager.module#ContactmanagerModule'},
  {path :'demo' , loadChildren :'./demo/demo.module#DemoModule'},
  {path :'**', redirectTo :'contactmanager' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    BrowserModule,
    BrowserAnimationsModule,
    
    RouterModule.forRoot(routes)
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
