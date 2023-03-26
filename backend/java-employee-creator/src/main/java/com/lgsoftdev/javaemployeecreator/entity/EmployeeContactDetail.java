package com.lgsoftdev.javaemployeecreator.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employee_contact_details")
@Data
public class EmployeeContactDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "residential_address")
    private String residentialAddress;
}
