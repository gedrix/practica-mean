import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
    .subscribe(
      res => {
        this.tasks = res;
      },
      err => console.log(err)
    )
  }

}
