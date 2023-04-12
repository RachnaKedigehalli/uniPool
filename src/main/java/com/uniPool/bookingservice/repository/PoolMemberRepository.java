package com.uniPool.bookingservice.repository;

import com.uniPool.bookingservice.entity.PoolMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoolMemberRepository extends JpaRepository<PoolMember, Long> {
    PoolMember deleteByPoolId(Long poolId);
}
