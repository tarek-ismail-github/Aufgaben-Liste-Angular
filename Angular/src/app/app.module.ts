import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { TemplateTodoComponent } from './_template/template-todo/template-todo.component';
import { TemplateTodoFormComponent } from './_template/template-todo-form/template-todo-form.component';
import { TemplateHeaderComponent } from './_template/template-header/template-header.component';
import { HttpClientModule ,HttpClient } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';
import { TemplateFooterComponent } from './_template/template-footer/template-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    TemplateTodoComponent,
    TemplateTodoFormComponent,
    TemplateHeaderComponent,
    TemplateFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
