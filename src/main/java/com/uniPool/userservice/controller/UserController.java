package com.uniPool.userservice.controller;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.register(user));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
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
        System.out.println("existsById in UserController");
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
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }



//    @PostMapping("/")
//    public User addUser(@RequestBody User user) {
//        logger.info("addUser of UserController");
//        return userService.addUser(user);
//    }
//
//    @GetMapping("/email/{email}")
//    public User getUserByEmail(@PathVariable("email") String email) {
//        return userService.getUserByEmail(email);
//    }
}
