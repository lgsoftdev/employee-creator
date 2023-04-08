package com.lgsoftdev.javaemployeecreator.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EmployeeContactDetailsDto {
    private Integer id;

    private Integer employeeId;

    @NotEmpty
    @Size(min = 3, max = 255, message = "Email Address is up to 255 characters long")
    @Email
    private String emailAddress;

    @NotEmpty(message = "Mobile Number must be an Australian number with 10 digits.")
    @Pattern(regexp="\\d{9,10}")
    private String mobileNumber;

    @NotEmpty(message = "Residential Address may not be empty")
    @Size(min = 1, max = 255, message = "Residential Address is up to 255 characters long.")
    private String residentialAddress;
}
