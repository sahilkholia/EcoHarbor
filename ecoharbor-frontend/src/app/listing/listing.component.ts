import { Component, inject } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../model/Item';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    PopupComponent
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {
  
  constructor(private itemService: ItemService) {}
  item: Item[] = [];
  displayedColumns: string[] = ['Item', 'Quantity', 'Scale','Action'];
  readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.refresh();
  }
  get getItems() {  
    return this.item;
  }

  refresh() {
    this.itemService.getAllItems().subscribe(data => {
      this.item = data;
    });
  }

  expandItem(item: Item): void{
    console.log("expand clicked");
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {item: item},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }
}
