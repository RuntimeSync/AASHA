package com.aasha.backend.dto;

import com.aasha.backend.entity.ProgramType;
import com.aasha.backend.entity.RiskLevel;
import com.aasha.backend.entity.SyncStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HealthRecordResponse {

    private Long id;
    private Long ashaId;
    private String patientName;
    private Integer patientAge;
    private ProgramType programType;
    private RiskLevel riskLevel;
    private SyncStatus syncStatus;
    private LocalDateTime createdAt;
}
