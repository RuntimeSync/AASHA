package com.aasha.backend.service;

import com.aasha.backend.dto.HealthRecordResponse;
import com.aasha.backend.entity.*;
import com.aasha.backend.repository.HealthRecordRepository;
import com.aasha.backend.repository.UserRepository;
import com.aasha.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;
    private final UserRepository userRepository;

    public HealthRecordResponse createHealthRecord(
            Long ashaId,
            String patientName,
            Integer patientAge,
            ProgramType programType,
            String rawInput
    ) {

        User asha = userRepository.findById(ashaId)
                .orElseThrow(() -> new ResourceNotFoundException("ASHA not found"));

        if (asha.getRole() != Role.ASHA) {
            throw new IllegalStateException("Only ASHA can create health records");
        }

        HealthRecord record = HealthRecord.builder()
                .asha(asha)
                .patientName(patientName)
                .patientAge(patientAge)
                .programType(programType)
                .rawInput(rawInput)
                .build();

        HealthRecord saved = healthRecordRepository.save(record);

        return HealthRecordResponse.builder()
                .id(saved.getId())
                .ashaId(saved.getAsha().getId())
                .patientName(saved.getPatientName())
                .patientAge(saved.getPatientAge())
                .programType(saved.getProgramType())
                .riskLevel(saved.getRiskLevel())
                .syncStatus(saved.getSyncStatus())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
