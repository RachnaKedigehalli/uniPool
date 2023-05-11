package com.uniPool.bookingservice.controller;


import com.uniPool.bookingservice.entity.Booking;
import com.uniPool.bookingservice.entity.PoolMember;
import com.uniPool.bookingservice.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import javax.validation.Valid;

@RestController

@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    private static final Logger logger = LogManager.getLogger(BookingController.class);
    @PostMapping("/")
    public ResponseEntity<?> addBooking(@Valid @RequestBody Booking booking) {
        try {
            logger.info("Booking added");
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

    @PostMapping("/search")
    public ResponseEntity<?> searchBooking(@RequestBody Booking booking) {
        try {
            logger.info("Searched for a booking");
            return ResponseEntity.ok(bookingService.searchBooking(booking));
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
            logger.info("Request sent for pooling");
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

    @GetMapping("/pool/getPoolMembers/{bookingId}")
    public ResponseEntity<?> getPoolMembers(@PathVariable("bookingId") Long bookingId) {
        try {
            return ResponseEntity.ok(bookingService.getAllPoolMembers(bookingId));
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
