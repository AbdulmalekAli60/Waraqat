package com.waraqat.Waraqat.exceptions;

import java.sql.Timestamp;

public class UsernameAlreadyexist extends RuntimeException{

//    private Timestamp time = new Timestamp(System.currentTimeMillis());


    public UsernameAlreadyexist(String message) {
        super(message);
    }

//    public Timestamp getTime() {
//        return time;
//    }
}
