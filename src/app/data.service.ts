import { Injectable } from '@angular/core';
import { Data } from './data.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Data[] =[
     {id:1 ,name:'Savan Babasaheb Sumbe',email:'savansumeb@gmail.com'},
     {id:2,name:'DigitalEdu It Solution' , email : 'DigitalEdu@gmail.com'} 
  ];
  getData():Data[]{
    return this.data;
  }
  addData(newData:Data)
  {
    this.data.push(newData);
  }
  updateData(updatedData:Data)
  {
    const index = this.data.findIndex(d => d.id === updatedData.id);
    if( index !== -1)
    {
      this.data[index] = updatedData;
    }
  }
  deleteData(id: number)
   { 
    this.data = this.data.filter(d => d.id !== id);

    }
}
