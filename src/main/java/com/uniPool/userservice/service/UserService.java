package com.uniPool.userservice.service;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        log.info("addUser of UserService");
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findDistinctByEmail(email);
    }

    public User register(User user) {
        log.info("register of UserService");
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(userRepository.existsByEmail(user.getEmail()))
            throw new RuntimeException("Email exists");
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        log.info("getUserById of UserService");
        return userRepository.findById(id).get();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User login(User user) {
        user.setEmail(user.getEmail().toLowerCase());
//        if (Objects.nonNull(user.getEmail() && !"".equalsIgnoreCase(user.getEmail())) {
//            User dbUser = userRepository.findDistinctByEmail(user.getEmail());
////            if (user.getPassword().equals())
//        }
        return user;
    }
}
