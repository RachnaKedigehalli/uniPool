package com.uniPool.blacklistservice.controller;


import com.uniPool.blacklistservice.entity.BlackList;
import com.uniPool.blacklistservice.service.BlackListService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/blacklist")
public class BlackListController {
    @Autowired
    private BlackListService blackListService;

    @PostMapping("/block")
    public ResponseEntity<?> block(@Valid @RequestBody BlackList blackList) {
        try {
            return ResponseEntity.ok(blackListService.block(blackList));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
    @PostMapping("/unblock")
    public ResponseEntity<?> unblock(@Valid @RequestBody BlackList blackList) {
        try {
            return ResponseEntity.ok(blackListService.unblock(blackList));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getBlackListOfUser(@PathVariable("id") Long blockerUserId) {
        try {
            return ResponseEntity.ok(blackListService.getBlackListOfUser(blockerUserId));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
