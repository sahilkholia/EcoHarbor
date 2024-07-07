package com.ecoharbor.ecoharborbackend.repository;

import com.ecoharbor.ecoharborbackend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i FROM Item i where i.user = :userId")
    List<Item> findByUserId(Long userId);

}
