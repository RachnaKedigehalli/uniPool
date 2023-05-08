package com.uniPool.bookingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PoolMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long poolId;
    @NotNull(message = "Id of booking required")
    private Long bookingId;
    @NotNull(message = "User Id required")
    private Long userId;
//    @NotBlank(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private Status status;
}

