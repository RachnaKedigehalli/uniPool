package com.uniPool.blacklistservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlackList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long blackListId;
    @NotNull(message = "Blocker user Id is required")
    private Long blockerUserId;
    @NotNull(message = "Blocked user Id is required")
    private Long blockedUserId;
}
