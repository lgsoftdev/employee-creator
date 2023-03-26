package com.lgsoftdev.javaemployeecreator.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "employee_status")
@Data
public class EmployeeStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "contract_type")
    private Integer contractType;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "finish_date")
    private Date finishDate;

    @Column(name = "work_type")
    private Integer workType;

    @Column(name = "hours_per_week")
    private Short hoursPerWeek;
}
