package com.waraqat.Waraqat.exceptions;

import java.sql.Timestamp;

public class EmailAlreadyUsed extends RuntimeException{
//    private Timestamp time = new Timestamp(System.currentTimeMillis());

    public EmailAlreadyUsed(String message) {
        super(message);
    }

//    public Timestamp getTime() {
//        return time;
//    }
}
