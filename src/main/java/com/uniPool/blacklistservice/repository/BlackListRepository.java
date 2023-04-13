package com.uniPool.blacklistservice.repository;

import com.uniPool.blacklistservice.entity.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface BlackListRepository extends JpaRepository<BlackList, Long> {
    boolean existsByBlockerUserId(Long blockerUserId);
    boolean existsByBlockedUserId(Long blockedUserId);
    List<BlackList> findAllByBlockerUserId(Long blockerUserId);
}
