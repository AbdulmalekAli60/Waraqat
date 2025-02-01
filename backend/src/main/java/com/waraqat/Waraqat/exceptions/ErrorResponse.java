package com.waraqat.Waraqat.exceptions;

import java.sql.Timestamp;

public class ErrorResponse {
    private String message;
    private Timestamp time = new Timestamp(System.currentTimeMillis());

    public ErrorResponse(String message) {
        this.message = message;
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
