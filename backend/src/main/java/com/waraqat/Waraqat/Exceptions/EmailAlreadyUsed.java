package com.waraqat.Waraqat.Exceptions;

import java.sql.Timestamp;

public class EmailAlreadyUsed extends RuntimeException{
    private Timestamp time = new Timestamp(System.currentTimeMillis());

    public EmailAlreadyUsed(String message) {
        super(message);
    }

    public Timestamp getTime() {
        return time;
    }
}
