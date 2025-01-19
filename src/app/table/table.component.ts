import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { Data } from '../data.model';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  data: Data[] = [];
  reactiveForm: FormGroup; // for validation on input data
  newData: Data = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(private dataService: DataService) {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.newData.name, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.newData.email, [Validators.required, Validators.email])
    });
  }
  Read():void
  {
    this.data = this.dataService.getData();
  }

  onSubmit(): void {
    if (this.reactiveForm.valid) {
      // Generate a new ID for new data
      this.newData.id = this.data.length + 1;

      // Add new data to the list
      this.dataService.addData(this.newData);
      this.data = this.dataService.getData();

      this.newData = {
        id: 0,
        name: '',
        email: ''
      };
    } else {
      console.error('Form is invalid');
    }
  }

  emitData(item: Data): void {
    // Updating the name with new name 'Raj' 
    // Whenever we click on update button by default value get updated by Raj
    const updatedData: Data = { ...item, name: 'Raj' };
    this.dataService.updateData(updatedData);
    this.data = this.dataService.getData();
  }

  deleteData(id: number): void {
    this.dataService.deleteData(id);
    this.data = this.dataService.getData();
  }
}
