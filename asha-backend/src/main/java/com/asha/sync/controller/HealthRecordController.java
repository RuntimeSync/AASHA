package com.asha.sync.controller;

import com.asha.sync.dto.HealthRecordResponse;
import com.asha.sync.model.HealthRecord;
import com.asha.sync.service.HealthRecordService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class HealthRecordController {
    private final HealthRecordService healthRecordService;

    public HealthRecordController(HealthRecordService healthRecordService) {
        this.healthRecordService = healthRecordService;
    }

    @PostMapping("/sync-record")
    public HealthRecordResponse syncRecord(@Valid @RequestBody HealthRecord record) {
        healthRecordService.save(record);

        return new HealthRecordResponse(
                record.getId(),
                "Record saved successfully",
                record.getSyncStatus().name(),
                LocalDateTime.now()
        );
    }

    @GetMapping("/records")
    public List<HealthRecord> getRecords() {

        return healthRecordService.getAll();
    }
}
