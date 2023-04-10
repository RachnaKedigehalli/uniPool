package com.uniPool.userservice.controller;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok(registeredUser);
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user);
    }

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
//        log.info("addUser of UserController");
//        return userService.addUser(user);
//    }
//
//    @GetMapping("/email/{email}")
//    public User getUserByEmail(@PathVariable("email") String email) {
//        return userService.getUserByEmail(email);
//    }
}
