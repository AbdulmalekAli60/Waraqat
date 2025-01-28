package com.waraqat.Waraqat.Exceptions;

import java.sql.Timestamp;

public class UsernameAlreadyexist extends RuntimeException{

    private Timestamp time = new Timestamp(System.currentTimeMillis());


    public UsernameAlreadyexist(String message) {
        super(message);
    }

    public Timestamp getTime() {
        return time;
    }
}
