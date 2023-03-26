package com.lgsoftdev.javaemployeecreator.dto;

import lombok.Data;

@Data
public class EmployeePersonalContactStatusDto {
    private EmployeePersonalInfoDto personalInfoDto;

    private EmployeeContactDetailsDto contactDetailsDto;

    private EmployeeStatusDto employeeStatusDto;
}
