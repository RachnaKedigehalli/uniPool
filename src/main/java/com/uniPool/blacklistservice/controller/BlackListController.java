package com.uniPool.blacklistservice.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import com.uniPool.blacklistservice.entity.BlackList;
import com.uniPool.blacklistservice.service.BlackListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/blacklist")
public class BlackListController {
    @Autowired
    private BlackListService blackListService;
    private static final Logger logger = LogManager.getLogger(BlackListController.class);
    @PostMapping("/block")
    public ResponseEntity<?> block(@Valid @RequestBody BlackList blackList) {
        logger.info("block in BlackListController------------------");
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
