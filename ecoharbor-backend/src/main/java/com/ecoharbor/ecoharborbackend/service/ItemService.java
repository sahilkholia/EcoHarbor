package com.ecoharbor.ecoharborbackend.service;

import com.ecoharbor.ecoharborbackend.model.Item;
import com.ecoharbor.ecoharborbackend.model.UpdateQtyRequest;
import com.ecoharbor.ecoharborbackend.repository.ItemRepository;
import com.ecoharbor.ecoharborbackend.repository.UpdateReqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Autowired
    UpdateReqRepository updateReqRepository;

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }
    public Item saveItem(Item item){
        return itemRepository.save(item);
    }
    public List<Item> getUserItems(Long userId) {
        return itemRepository.findByUserId(userId);
    }
    public void deleteItem(Long itemId){
        Item item = itemRepository.getById(itemId);
        itemRepository.delete(item);
        System.out.println("Item deleted");
    }

    public Item updateQty(Long itemId, int qty) throws Exception {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new Exception("Item not found"));
        item.setQty(qty);
        return itemRepository.save(item);
    }

    public UpdateQtyRequest listRequest(UpdateQtyRequest req){
        if(itemRepository.findById(req.getItemId())!=null){
            return updateReqRepository.save(req);
        }else{
            return null;
        }
    }
}
