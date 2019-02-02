package com.freiberg.authserver.controller;

import com.freiberg.authserver.service.UserService;
import com.freiberg.authserver.exceptions.UserAlreadyExistsException;
import lombok.AllArgsConstructor;
import model.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class RegistrationController {

    private UserService userService;

    private static final String USER_EXISTS_MESSAGE = "User with such username already exists!";

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto registerUser(@Valid @RequestBody UserDto userDto) throws UserAlreadyExistsException {
        return userService.handleRegistrationRequest(userDto);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserExistsException() {
        return new ResponseEntity<>(USER_EXISTS_MESSAGE, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<Map> handleBindException(BindException ex) {
        return new ResponseEntity<>(errorsToMap(ex.getAllErrors()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return new ResponseEntity<>(errorsToMap(ex.getBindingResult().getAllErrors()), HttpStatus.BAD_REQUEST);
    }

    /**
     * Converts list of {@link ObjectError} to
     * map like "rejected field" => "error message"
     *
     * @param errors list of errors
     * @return map "rejected field" => "error message"
     */
    private Map<String, String> errorsToMap(List<ObjectError> errors) {
        Map<String, String> map = new HashMap<>();
        errors.forEach(error -> map.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return map;
    }

}
