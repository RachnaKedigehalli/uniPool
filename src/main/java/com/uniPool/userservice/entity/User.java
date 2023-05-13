package com.uniPool.userservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
//    @NotBlank(message = "First name is required")
    private String firstName;
    private String lastName;
    @Email
    @Column(unique = true)
//    @NotBlank(message = "Email is required")
    private String email;
//    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    private String profilePic;
//    @NotBlank(message = "Password is required")
    private String password;
}
