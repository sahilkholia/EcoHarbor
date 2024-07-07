import { Component, Inject, model, signal } from '@angular/core';
import { ListingComponent } from '../listing.component';
import { Item } from '../../model/Item';
import { UpdateQtyRequest } from '../../model/UpdateQtyRequest';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormsModule, NgForm, Validators, ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    ListingComponent,
    MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  itemData: Item;
  username: string = "user";
  errorMessage = signal('');
  updateReq: UpdateQtyRequest = {"itemId":0,"reqQty":0, "phNo":""};


  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item },
    private itemService: ItemService
  ) { 
    console.log(data.item);
    this.itemData = data.item;
    var uname = localStorage.getItem("username");
    if(uname!=null){
      this.username = uname;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  book(form: NgForm): void{
    const formData = form.form.value;
    console.log(formData);
    if(this.validateReqQty(formData.ReqQty) && this.validatePhNo(formData.ph)){
      console.log("qty validation passed");
      this.updateReq = {"itemId": this.itemData.id, "reqQty": formData.ReqQty, "phNo": formData.ph};
      this.itemService.requestItem(this.updateReq).subscribe(()=>{
        console.log("Updated!!");
        this.dialogRef.close();
      });
    }else{
      console.log("qty validation failed");
    }
  }

  validateReqQty(ReqQty: number):boolean{
    if(ReqQty>0 && ReqQty<=this.data.item.qty){
      return true;
    }
    this.openDialog("Requested Quantity can not be greater than available quantity or 0");
    return false;
  }

  validatePhNo(phNo: string):boolean{
    if(phNo.length==10){
      return true;
    }
    this.openDialog("Ph.No. should be a 10 digit number");
    return false;
  }


  openDialog(str: string){
    alert(str);
  }

}
