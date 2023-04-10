package com.uniPool.userservice.controller;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public User addUser(@RequestBody User user) {
        log.info("addUser of UserController");
        return userService.addUser(user);
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.getUserByEmail(email);
    }
}
