package com.uniPool.userservice.controller;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.service.UserService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LogManager.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        logger.info("register in UserController");
        try {
            return ResponseEntity.ok(userService.register(user));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        logger.info("login in UserController");
        try {
            return ResponseEntity.ok(userService.login(user));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    // for blacklist --------------------
    @PostMapping("/multiple")
    public ResponseEntity<?> getUsersById(@RequestBody List<Long> userIds) {
        logger.info("getUsersById in UserController");
        try {
            return ResponseEntity.ok(userService.getUsersById(userIds));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/exists/id/{id}")
    public ResponseEntity<?> existsById(@PathVariable("id") Long userId) {
        logger.info("existsById in UserController");
        try {
            return ResponseEntity.ok(userService.existsById(userId));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    // ------------------------------------
//    @PostMapping("/edit")
//    public User edit(@RequestBody User user) {
//
//    }

    @GetMapping("/id/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        logger.info("getUserById in UserController");
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        logger.info("getAllUsers in UserController");
        return userService.getAllUsers();
    }

}
