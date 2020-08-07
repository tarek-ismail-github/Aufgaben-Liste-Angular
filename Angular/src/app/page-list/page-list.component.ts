import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';

import { ToDo } from '../_interface/todo';
import { DragulaService } from 'ng2-dragula';
import { EventPing } from '../_interface/eventping';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit , OnDestroy{

  public toDoDoneShow: boolean;
  public toDoShow: boolean;
  public subs = new Subscription();
  public $todos : ToDo[];
  public $todosdone :ToDo[];

  constructor(
      public _dataService: DataService,
      public _dragulaService :DragulaService,
  ) {
      this.toDoDoneShow = false;
      this.toDoShow = true;
      this.$todos = [];
      this.$todosdone = [];
      this.loadData();

      this._dragulaService.createGroup('todos',{
        removeOnSpill:false
      });
      this.subs.add(_dragulaService.drop('todos')
      .subscribe(({el})=>{
        this.position();// Aufrufen ,wenn ein Element bewegt wurde,
      }))
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }
  //diese Funktion bedient um eine Position starten
  public position(): void {
    let position = 0;
      this.$todos.forEach((todo: ToDo) => {
        position += 1;
        todo.position = position;
        this._dataService.putToDo(todo).subscribe((data: ToDo) => {
          console.log('%cSUC: ${data.label} wurde neu positioniert','color:green ;font-size:12px');

        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    });

}


  public loadData():void {
    this.$todos = [];
    this.$todosdone = [];
    this._dataService.getToDo().subscribe((data : ToDo[])=>{
      data.forEach((toDo:ToDo)=>{
      if (toDo.status === true)
      {
        this.$todosdone.push(toDo)

      }else{
        this.$todos.push(toDo);
      }
    });
    this.$todos.sort((obj1,obj2)=>{
      return obj1.position -obj2.position;
    })
    },error =>{
      console.log('%cERROR: ${error.message}','color :red; font-size : 12px;');

    }
    )

  }

  public update(event : EventPing):void{
    if ('check' === event.label) {
      console.log('%c"${event.label}-Event" wurde getriggert.','color:green;');
      if (!event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object),1);
        this.$todos.push(event.object);

      }else{
        this.$todos.splice(this.$todos.indexOf(event.object),1);
        this.$todosdone.push(event.object);
      }
    }
    if ('delete' ===event.label) {
      console.log('%c " ${event.label} -Event" wurde getriggert.','color:green;');
      if (event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object),1);

      }else{
        this.$todos.splice(this.$todos.indexOf(event.object),1);
      }
    }
    if ('label' ===event.label) {
      console.log('%c  ${event.label} -Event wurde getriggert.','color:green;');
      if (event.object.status) {
        this.$todosdone.forEach((toDo :ToDo)=>{
          if (toDo.id === event.object.id) {
            toDo.label =event.object.label;

          }
        });

      }else{
        this.$todos.forEach((toDo :ToDo)=>{
          if (toDo.id === event.object.id) {
            toDo.label =event.object.label;
          }
        });
      }
    }

      console.log(this.$todos);


  }

  public create(event : ToDo):void{
    event.position = this.$todos.length +1 ;
    // this.$todos.push(event)
    this._dataService.postToDo(event).subscribe((data:ToDo)=>{
      console.log('%cSUC:"${data.label}"wurde erfolgreich erstellt.', 'color:green; font-size :12px');
      this.$todos.push(data);
      this.position();
    },error=>{
      console.log('%cERROR: ${error}','color:red;font-size:12px;');

    })

  }



}
