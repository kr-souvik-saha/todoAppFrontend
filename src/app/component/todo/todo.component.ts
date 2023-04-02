import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  formValue!: FormGroup;
  todoObj: Todo = new Todo();
  todoList: Todo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getAllTodo();

    this.formValue = this.formBuilder.group({
      subject: [''],
      description: [''],
      status: [''],
      _id: [''],
    });
  }

  addTodo() {
    this.todoObj.subject = this.formValue.value.subject;
    this.todoObj.description = this.formValue.value.description;
    this.todoObj.status = this.formValue.value.status;

    this.todoService.addTodo(this.todoObj).subscribe(
      (res) => {
        this.getAllTodo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllTodo() {
    this.todoService.getAllTodo().subscribe(
      (res) => {
        this.todoList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editTodo(todo: Todo) {
    this.formValue.controls['_id'].setValue(todo._id);
    this.formValue.controls['subject'].setValue(todo.subject);
    this.formValue.controls['description'].setValue(todo.description);
    this.formValue.controls['status'].setValue(todo.status);
  }

  updateTodo() {
    this.todoObj._id = this.formValue.value._id;
    this.todoObj.subject = this.formValue.value.subject;
    this.todoObj.description = this.formValue.value.description;
    this.todoObj.status = this.formValue.value.status;

    this.todoService.updateTodo(this.todoObj).subscribe(
      (res) => {
        this.getAllTodo();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
