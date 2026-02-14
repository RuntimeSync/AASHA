package com.aasha.backend.repository;

import com.aasha.backend.entity.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {

    List<HealthRecord> findByAshaId(Long ashaId);

}
