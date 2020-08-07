import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/_interface/todo';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {


   public toDo$: ToDo;
   @Output() ping : EventEmitter <any> =new EventEmitter<any>();




  constructor(
    // public _dataService: DataService

  ) {
    this.toDo$ = {
      id :undefined,
      label: undefined,
      status: false,
      position :undefined}
   }

  ngOnInit(): void {
  }
  public createToDo(event?: any): void{
    this.ping.emit(this.toDo$)
    this.toDo$ = {
      id :undefined,
      label: undefined,
      status: false,
      position :undefined
  };
  console.log(this.toDo$);

  //   this._dataService.postToDo(this.toDo$).subscribe((data: ToDo) => {
  //     this._dataService.getGlobalData();
  //     this.toDo$ = {
  //         label: undefined,
  //         status: false
  //     };
  // }, error => {
  //     console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
  // });
  }

}
