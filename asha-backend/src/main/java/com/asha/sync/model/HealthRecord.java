package com.asha.sync.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "health_records")
public class HealthRecord {

    @Id
    @Column(nullable = false)
    @NotBlank(message = "ID must not be blank")
    private String id;

    @Min(value = 1, message = "Pregnancy month must be at least 1")
    @Max(value = 9, message = "Pregnancy month must not exceed 9")
    private int pregnancyMonth;

    @NotBlank(message = "Symptoms must not be blank")
    private String symptoms;

    @NotNull(message = "Risk level must not be null")
    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    private LocalDateTime createdAt;

    @NotNull(message = "Sync status must not be null")
    @Enumerated(EnumType.STRING)
    private SyncStatus syncStatus;

    public HealthRecord() {
    }

    // ===== Getters and Setters =====

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPregnancyMonth() {
        return pregnancyMonth;
    }

    public void setPregnancyMonth(int pregnancyMonth) {
        this.pregnancyMonth = pregnancyMonth;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public RiskLevel getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(RiskLevel riskLevel) {
        this.riskLevel = riskLevel;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public SyncStatus getSyncStatus() {
        return syncStatus;
    }

    public void setSyncStatus(SyncStatus syncStatus) {
        this.syncStatus = syncStatus;
    }
}