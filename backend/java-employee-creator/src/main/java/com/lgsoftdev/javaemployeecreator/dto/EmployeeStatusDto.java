package com.lgsoftdev.javaemployeecreator.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class EmployeeStatusDto {
    private Integer id;

    private Integer employeeId;

    @NotNull
    private Integer contractType;

    @NotNull
    private Date startDate;

    private Date finishDate;

    @NotNull
    private Integer workType;

    private Short hoursPerWeek;
}
