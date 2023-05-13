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

    public User register(User user) {
        log.info("register of UserService");
        if(user.getEmail().equals("") || user.getPassword().equals(""))
            throw new RuntimeException("Invalid fields");
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()).toString());
        if(userRepository.existsByEmail(user.getEmail()))
            throw new RuntimeException("Email exists");
        user = userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    public User login(User user) {
        log.info("login of UserService");
        user.setEmail(user.getEmail().toLowerCase());
        if (Objects.nonNull(user.getEmail()) && !"".equalsIgnoreCase(user.getEmail()) && userRepository.existsByEmail(user.getEmail())) {
            User dbUser = userRepository.findDistinctByEmail(user.getEmail());
            System.out.println("Password encrypted entered " + user.getPassword());
            if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                return dbUser;
            }
            else {
                throw new RuntimeException("Incorrect password");
            }
        }
        else {
            throw new RuntimeException("Invalid email");
        }
    }

    public User getUserById(Long id) {
        log.info("getUserById of UserService");
        return userRepository.findById(id).get();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public List<User> getUsersById(List<Long> userIds) {
        return userRepository.findAllByUserIdIn(userIds);
    }

    public boolean existsById(Long userId) {
        return userRepository.existsById(userId);
    }

    public void deleteAll() {
        userRepository.deleteAll();
    }
}
