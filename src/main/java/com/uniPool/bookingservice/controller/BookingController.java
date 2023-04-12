package com.uniPool.bookingservice.controller;


import com.uniPool.bookingservice.entity.Booking;
import com.uniPool.bookingservice.entity.PoolMember;
import com.uniPool.bookingservice.service.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/")
    public ResponseEntity<?> addBooking(@Valid @RequestBody Booking booking) {
        try {
            return ResponseEntity.ok(bookingService.addBooking(booking));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<?> editBooking(@RequestBody Booking booking) {
        try {
            return ResponseEntity.ok(bookingService.editBooking(booking));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/pool/add")
    public ResponseEntity<?> addPoolMember(@Valid @RequestBody PoolMember poolMember) {
//        booking creator to add users to pool, only creator can add
//        status ADDED is set
        try {
            return ResponseEntity.ok(bookingService.addPoolMember(poolMember));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/pool/sendRequest")
    public ResponseEntity<?> sendPoolRequest(@Valid @RequestBody PoolMember poolMember) {
        // users to send requests to join pool
        //        status PENDING is set
        try {
            return ResponseEntity.ok(bookingService.sendPoolRequest(poolMember));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/pool/acceptRequest/{poolId}")
    public ResponseEntity<?> acceptPoolRequest(@PathVariable("poolId") Long poolId) {
        try {
            return ResponseEntity.ok(bookingService.acceptPoolRequest(poolId));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping("/pool/rejectRequest/{poolId}")
    public ResponseEntity<?> rejectPoolRequest(@PathVariable("poolId") Long poolId) {
        try {
            return ResponseEntity.ok(bookingService.rejectPoolRequest(poolId));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @DeleteMapping("/pool/{poolId}")
    public ResponseEntity<?> removePoolMember(@PathVariable("poolId") Long poolId) {
        try {
            return ResponseEntity.ok(bookingService.removePoolMember(poolId));
        }
        catch (RuntimeException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }
}
