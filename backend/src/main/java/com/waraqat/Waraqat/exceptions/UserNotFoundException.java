package com.waraqat.Waraqat.exceptions;

import java.sql.Timestamp;

public class UserNotFoundException extends RuntimeException{

//    private Timestamp time = new Timestamp(System.currentTimeMillis());

    public UserNotFoundException(String message) {
        super(message);
    }

//    public Timestamp getTime() {
//        return time;
//    }
}
