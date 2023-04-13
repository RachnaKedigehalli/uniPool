package com.uniPool.userservice.repository;

import com.uniPool.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findDistinctByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findAll(List<Long> userIds);

}
