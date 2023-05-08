package com.uniPool.bookingservice.repository;

import com.uniPool.bookingservice.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByDestinationAndSourceAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(String destination, String source, Date end1, Date end2);
}
