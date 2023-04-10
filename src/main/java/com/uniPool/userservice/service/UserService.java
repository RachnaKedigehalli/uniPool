package com.uniPool.userservice.service;

import com.uniPool.userservice.entity.User;
import com.uniPool.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user) {
        log.info("addUser of UserService");
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findDistinctByEmail(email);
    }
}
