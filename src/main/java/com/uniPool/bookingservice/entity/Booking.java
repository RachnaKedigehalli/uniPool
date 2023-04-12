package com.uniPool.bookingservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookingId;
    @NotBlank(message = "Creator User ID is required")
    private Long creatorUserId;
    @NotBlank(message = "Source is required")
    private String source;
    @NotBlank(message = "Destination is required")
    private String destination;
    @NotBlank(message = "Time is required")
    @Temporal(TemporalType.TIMESTAMP)
    private Date setTime;
    @NotBlank(message = "Time window is required")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startTime;
    @NotBlank(message = "Time window is required")
    @Temporal(TemporalType.TIMESTAMP)
    private Date endTime;
}
