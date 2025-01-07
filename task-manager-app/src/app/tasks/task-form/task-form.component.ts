import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
//Implement on changes to track changes in form, get data from parent and emit data for cancel and save
export class TaskFormComponent implements OnChanges {
  @Input() task: any | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  //Define form group and validators for every input
  taskForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  //On changed data (using hook) update only that changed value, else clear the form
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue(this.task);
    } else {
      this.taskForm.reset();
    }
  }

//Validate inputs and emit data to parent
  onSave(): void {
    if (this.taskForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }
    const taskData = this.taskForm.value;
    this.save.emit(taskData);
    this.onCancel();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
