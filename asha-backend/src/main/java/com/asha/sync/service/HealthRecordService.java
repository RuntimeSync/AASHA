package com.asha.sync.service;

import com.asha.sync.model.HealthRecord;
import com.asha.sync.repository.HealthRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class HealthRecordService {
    private final HealthRecordRepository healthRecordRepository;

    public HealthRecordService(HealthRecordRepository healthRecordRepository) {
        this.healthRecordRepository = healthRecordRepository;
    }
    public void save(HealthRecord record) {

        if (healthRecordRepository.existsById(record.getId())) {
            throw new IllegalArgumentException("Record with this ID already exists");
        }

        if (record.getCreatedAt() == null) {
            record.setCreatedAt(LocalDateTime.now());
        }

        healthRecordRepository.save(record);
    }

    public List<HealthRecord> getAll() {
        return healthRecordRepository.findAll();
    }
}
