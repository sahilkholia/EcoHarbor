// person.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './model/Item';
import { UpdateQtyRequest } from './model/UpdateQtyRequest';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

    private getAllItemApiUrl = 'http://localhost:8080/api/item/all';
    private getUserItemApiUrl = 'http://localhost:8080/api/item/user';
    private saveItemApiUrl = 'http://localhost:8080/api/item/add';
    private deleteItemApiUrl = 'http://localhost:8080/api/item/delete';
    private updateItemApiUrl = 'http://localhost:8080/api/item/update';

    constructor(private http: HttpClient) { }
    getAllItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.getAllItemApiUrl);
    }
    getUserItems():Observable<Item[]>{

        // const user = localStorage.getItem('id');
        // if (!user) {
        //     throw new Error('User is not available');
        //   }
        // let httpParams = new HttpParams().set('userId', user);

        const url = `${this.getUserItemApiUrl}/${localStorage.getItem('id')}`;
        return this.http.get<Item[]>(url);
    }
    saveItem(item: Item){
        return this.http.post<Item>(this.saveItemApiUrl, item);
    }
    deleteItem(id: number){
        console.log("delete item called in item service for ID: "+id );
        const url = `${this.deleteItemApiUrl}/${id}`;
        return this.http.delete<number>(url);
    }
    requestItem(updateQtyReq: UpdateQtyRequest){
        return this.http.post<UpdateQtyRequest>(this.updateItemApiUrl, updateQtyReq);
    }
}