package com.ecoharbor.ecoharborbackend.controller;

import com.ecoharbor.ecoharborbackend.model.Item;
import com.ecoharbor.ecoharborbackend.model.UpdateQtyRequest;
import com.ecoharbor.ecoharborbackend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping("/all")
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/user/{userId}")
    public List<Item> getUserItems(@PathVariable Long userId){
        System.out.println("entered get with values");
        List<Item> res = itemService.getUserItems(userId);
        if(res == null){
            return null;
        }else{
            return res;
        }
    }

    @PostMapping("/add")
    public Item addItem(@RequestBody Item item){
        System.out.println(item);
        return itemService.saveItem(item);
    }
    @DeleteMapping("/delete/{itemId}")
    public void deleteItem(@PathVariable Long itemId){
        System.out.println("Attempting delete on Item Id: "+ itemId );
        itemService.deleteItem(itemId);
    }

    @PostMapping("/update")
    public UpdateQtyRequest updateQty(@RequestBody UpdateQtyRequest req) throws Exception {
        System.out.println(req.getReqQty());
        return itemService.listRequest(req);
    }
}
