package com.waraqat.Waraqat.Exceptions;

import java.sql.Timestamp;

public class ErrorDTO {
    private String message;
    private Timestamp time;

    public ErrorDTO(String message, Timestamp time) {
        this.message = message;
        this.time = time;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }
}
