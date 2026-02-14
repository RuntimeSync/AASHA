package com.aasha.backend.controller;

import com.aasha.backend.dto.HealthRecordRequest;
import com.aasha.backend.dto.HealthRecordResponse;
import com.aasha.backend.service.HealthRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-records")
@RequiredArgsConstructor
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    @PostMapping
    public HealthRecordResponse createRecord(
            @Valid @RequestBody HealthRecordRequest request
    ) {
        return healthRecordService.createHealthRecord(
                request.getAshaId(),
                request.getPatientName(),
                request.getPatientAge(),
                request.getProgramType(),
                request.getRawInput()
        );
    }
}
