package com.waraqat.Waraqat.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleArgumentValidationException(MethodArgumentNotValidException ex){
        Map<String,String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(),error.getDefaultMessage());
        });

        return new ResponseEntity<>(errorMap,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> userNotFound(UserNotFoundException ex){
        ErrorResponse error = new ErrorResponse(
                ex.getMessage()
//                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameAlreadyexist.class)
    public ResponseEntity<ErrorResponse> userNotFound(UsernameAlreadyexist ex){
        ErrorResponse error = new ErrorResponse(
                ex.getMessage()
//                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EmailAlreadyUsed.class)
    public ResponseEntity<ErrorResponse> userNotFound(EmailAlreadyUsed ex){
        ErrorResponse error = new ErrorResponse(
                ex.getMessage()
//                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Unauthorized.class)
    public ResponseEntity<ErrorResponse> unauthorizedToMakeChange(Unauthorized ex){
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage()
        );
        return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
    }
}
