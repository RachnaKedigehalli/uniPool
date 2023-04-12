package com.uniPool.bookingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PoolMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long poolId;
    @NotBlank(message = "Id of booking required")
    private Long bookingId;
    @NotBlank(message = "User Id required")
    private Long userId;
//    @NotBlank(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;
}

