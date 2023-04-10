package com.uniPool.bookingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pool {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long poolId;
    private Long bookingId;
    private Long userId;
    @Enumerated(EnumType.STRING)
    private Status status;
}

