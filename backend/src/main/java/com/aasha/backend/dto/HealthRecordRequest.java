package com.aasha.backend.dto;

import com.aasha.backend.entity.ProgramType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HealthRecordRequest {

    @NotNull
    private Long ashaId;

    @NotBlank
    private String patientName;

    @NotNull
    private Integer patientAge;

    @NotNull
    private ProgramType programType;

    private String rawInput;
}
