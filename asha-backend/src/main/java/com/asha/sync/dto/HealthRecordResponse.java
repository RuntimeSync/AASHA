package com.asha.sync.dto;

import java.time.LocalDateTime;

public class HealthRecordResponse {

    private final String id;
    private final String message;
    private final String syncStatus;
    private final LocalDateTime timestamp;

    public HealthRecordResponse(String id, String message, String syncStatus, LocalDateTime timestamp) {
        this.id = id;
        this.message = message;
        this.syncStatus = syncStatus;
        this.timestamp = timestamp;
    }

    public String getId() {

        return id;
    }

    public String getMessage() {

        return message;
    }

    public String getSyncStatus() {
        
        return syncStatus;
    }

    public LocalDateTime getTimestamp() {
        
        return timestamp;
    }
}
