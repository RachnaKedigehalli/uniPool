package com.uniPool.blacklistservice.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String profilePic;
    private String password;
}
