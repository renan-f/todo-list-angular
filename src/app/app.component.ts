import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { faCoffee, faTimes, faPlusCircle, faSave, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faCoffee;
  faTimes = faTimes;
  faPlusCircle = faPlusCircle;
  faSave = faSave;
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;

  public mode: string = 'list';
  // public todos: any[]; undefined
  public todos: Todo[] = []; // array vazio
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    //this.form.value retorno=> {title:'Titulo'}
    const title = this.form.controls['title'].value;
    if (this.todos.length > 0) {
      const newId = Number(this.todos[this.todos.length - 1].id) + 1;
      this.todos.push(new Todo(newId, title, false));
    } else {
      this.todos.push(new Todo(1, title, false));
    }
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  /*
  markAsDoneOrUndone(todo: Todo) {
    todo.done = !todo.done;
  }
  */

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    data ? this.todos = JSON.parse(data) : this.todos = [];
  }

  changeMode(mode: string) {
    this.clear();
    this.mode = mode;
  }
}