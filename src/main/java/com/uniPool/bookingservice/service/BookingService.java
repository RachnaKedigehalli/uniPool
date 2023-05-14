package com.uniPool.bookingservice.service;

import com.uniPool.bookingservice.entity.Booking;
import com.uniPool.bookingservice.entity.PoolMember;
import com.uniPool.bookingservice.entity.Status;
import com.uniPool.bookingservice.repository.BookingRepository;
import com.uniPool.bookingservice.repository.PoolMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private PoolMemberRepository poolMemberRepository;

    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> searchBooking(Booking booking) {
        return bookingRepository
                .findAllByDestinationAndSourceAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                        booking.getDestination(), booking.getSource(), booking.getEndTime(), booking.getEndTime()
                );
    }

    public List<Booking> getBookingsOfUser(Long userId) {
        List<Booking> bookings = bookingRepository.findAllByCreatorUserId(userId);
        List<PoolMember> pools = poolMemberRepository.findAllByUserId(userId);
        for(PoolMember pool: pools) {
            bookings.add(bookingRepository.findById(pool.getBookingId()).get());
        }
        return bookings;
    }

    public PoolMember addPoolMember(PoolMember poolMember) {
        poolMember.setStatus(Status.ADDED);
        return poolMemberRepository.save(poolMember);
    }

    public PoolMember sendPoolRequest(PoolMember poolMember) {
        poolMember.setStatus(Status.PENDING);
        return poolMemberRepository.save(poolMember);
    }

    public PoolMember acceptPoolRequest(Long poolId) {
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        PoolMember poolMember = poolMemberRepository.findById(poolId).get();
        poolMember.setStatus(Status.ACCEPTED);
        poolMemberRepository.save(poolMember);
        return poolMember;
    }

    public PoolMember rejectPoolRequest(Long poolId) {
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        PoolMember poolMember = poolMemberRepository.findById(poolId).get();
        poolMember.setStatus(Status.REJECTED);
        poolMemberRepository.save(poolMember);
        return poolMember;
    }


    @Transactional
    public Integer removePoolMember(Long poolId) {
        if (!poolMemberRepository.existsById(poolId)) {
            throw new RuntimeException("Invalid Id");
        }
        return poolMemberRepository.deleteByPoolId(poolId);
    }

    public List<PoolMember> getAllPoolMembers(Long bookingId) {
        return poolMemberRepository.findPoolMembersByBookingId(bookingId);
    }

    public void deleteAll() {
        bookingRepository.deleteAll();
        poolMemberRepository.deleteAll();
    }
}
