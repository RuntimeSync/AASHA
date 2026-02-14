package com.aasha.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "health_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ASHA who created record
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asha_id", nullable = false)
    private User asha;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false)
    private Integer patientAge;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProgramType programType;

    // Raw voice/text input
    @Column(columnDefinition = "TEXT")
    private String rawInput;

    // AI structured output (JSON as string for now)
    @Column(columnDefinition = "TEXT")
    private String structuredData;

    @Enumerated(EnumType.STRING)
    private RiskLevel riskLevel;

    @Enumerated(EnumType.STRING)
    private SyncStatus syncStatus;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.syncStatus = SyncStatus.PENDING;
        this.riskLevel = RiskLevel.LOW;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
