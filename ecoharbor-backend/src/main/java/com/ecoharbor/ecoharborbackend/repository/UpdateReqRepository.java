package com.ecoharbor.ecoharborbackend.repository;

import com.ecoharbor.ecoharborbackend.model.UpdateQtyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateReqRepository extends JpaRepository<UpdateQtyRequest,Long> {
}
