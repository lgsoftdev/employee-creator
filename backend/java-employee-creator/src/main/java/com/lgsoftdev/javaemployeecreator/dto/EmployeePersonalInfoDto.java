package com.lgsoftdev.javaemployeecreator.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EmployeePersonalInfoDto {
    private Integer id;

    @NotEmpty(message = "First Name may not be empty")
    @Size(min = 1, max = 255, message = "First Name is up to 255 characters long")
    private String firstName;

    @Size(max = 255, message = "Middle Name is up to 255 characters long")
    private String middleName;

    @NotEmpty(message = "Last Name may not be empty")
    @Size(min = 1, max = 255, message = "Last Name is up to 255 characters long")
    private String lastName;
}
