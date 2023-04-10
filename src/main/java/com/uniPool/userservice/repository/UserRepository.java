package com.uniPool.userservice.repository;

import com.uniPool.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findDistinctByEmail(String email);
    Boolean existsByEmail(String email);
}
