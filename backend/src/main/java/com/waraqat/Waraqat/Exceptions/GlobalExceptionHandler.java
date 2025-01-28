package com.waraqat.Waraqat.Exceptions;

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
    public ResponseEntity<ErrorDTO> userNotFound(UserNotFoundException ex){
        ErrorDTO error = new ErrorDTO(
                ex.getMessage(),
                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameAlreadyexist.class)
    public ResponseEntity<ErrorDTO> userNotFound(UsernameAlreadyexist ex){
        ErrorDTO error = new ErrorDTO(
                ex.getMessage(),
                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EmailAlreadyUsed.class)
    public ResponseEntity<ErrorDTO> userNotFound(EmailAlreadyUsed ex){
        ErrorDTO error = new ErrorDTO(
                ex.getMessage(),
                ex.getTime()
        );
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
}
