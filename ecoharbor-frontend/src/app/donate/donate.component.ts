import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule,FormsModule, NgForm} from "@angular/forms";
import {MatTableModule} from '@angular/material/table';
import { ItemService } from '../item.service';
import { Item } from '../model/Item';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HeaderComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {


  constructor(private itemService: ItemService, private changeDetectorRefs: ChangeDetectorRef) {}

  item: Item[] = [];
  newItem: Item = {id:0, name:"",qty:0,scale:""};
  displayedColumns: string[] = ['Item', 'Quantity', 'Scale','Action'];

  ngOnInit(): void {
    this.refresh();
    
  }
  refresh() {
    this.itemService.getUserItems().subscribe(data => {
      this.item = data;
      console.log(this.item);
      this.changeDetectorRefs.detectChanges();
    });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(()=>{
      console.log("deleted!!");
      this.refresh();
    });
  }

  get getItems() {  
    return this.item;
  }

  onSubmit(form: NgForm) {
    console.log("submit clicked!!!");
    const formData = form.form.value;
    console.log(localStorage.getItem("id"));
    formData.user = localStorage.getItem("id");
    this.itemService.saveItem(formData).subscribe(item =>{
      console.log("heres the added item: "+item.name);
      this.item.push(item);
      form.resetForm(this.newItem);
      this.refresh();
  });
  }
  
}

