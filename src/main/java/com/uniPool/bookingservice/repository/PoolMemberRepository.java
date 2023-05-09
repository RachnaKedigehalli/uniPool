package com.uniPool.bookingservice.repository;

import com.uniPool.bookingservice.entity.PoolMember;
import com.uniPool.bookingservice.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoolMemberRepository extends JpaRepository<PoolMember, Long> {
    Integer deleteByPoolId(Long poolId);
    List<PoolMember> findPoolMembersByBookingId(Long bookingId);
}
