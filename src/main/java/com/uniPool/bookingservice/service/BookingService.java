package com.uniPool.bookingservice.service;

import com.uniPool.bookingservice.entity.Booking;
import com.uniPool.bookingservice.entity.PoolMember;
import com.uniPool.bookingservice.entity.Status;
import com.uniPool.bookingservice.repository.BookingRepository;
import com.uniPool.bookingservice.repository.PoolMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private PoolMemberRepository poolMemberRepository;

    public Booking addBooking(Booking booking) {
        log.info("addBooking of BookingService");
        return bookingRepository.save(booking);
    }

    public List<Booking> searchBooking(Booking booking) {
        log.info("searchBooking of BookingService");
        return bookingRepository.findAllByDestinationAndSourceAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(booking.getDestination(), booking.getSource(), booking.getEndTime(), booking.getEndTime());
    }

    public PoolMember addPoolMember(PoolMember poolMember) {
        log.info("addPoolMember of BookingService");
        poolMember.setStatus(Status.ADDED);
        return poolMemberRepository.save(poolMember);
    }

    public PoolMember sendPoolRequest(PoolMember poolMember) {
        log.info("sendPoolRequest of BookingService");
        poolMember.setStatus(Status.PENDING);
        return poolMemberRepository.save(poolMember);
    }

    public PoolMember acceptPoolRequest(Long poolId) {
        log.info("acceptPoolRequest of BookingService");
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        PoolMember poolMember = poolMemberRepository.findById(poolId).get();
        poolMember.setStatus(Status.ACCEPTED);
        poolMemberRepository.save(poolMember);
        return poolMember;
    }

    public PoolMember rejectPoolRequest(Long poolId) {
        log.info("rejectPoolRequest of BookingService");
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        PoolMember poolMember = poolMemberRepository.findById(poolId).get();
        poolMember.setStatus(Status.REJECTED);
        poolMemberRepository.save(poolMember);
        return poolMember;
    }

    public Booking editBooking(Booking booking) {
        // changeeee
        return booking;
    }

    @Transactional
    public PoolMember removePoolMember(Long poolId) {
        log.info("removePoolMember of BookingService");
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        return poolMemberRepository.deleteByPoolId(poolId);
    }

    public List<PoolMember> getAllPoolMembers(Long bookingId) {
        return poolMemberRepository.findPoolMembersByBookingId(bookingId);
    }
}
