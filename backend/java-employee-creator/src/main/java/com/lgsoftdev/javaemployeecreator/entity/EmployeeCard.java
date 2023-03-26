package com.lgsoftdev.javaemployeecreator.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "employees")
@SecondaryTable(name = "employee_contact_details", pkJoinColumns = @PrimaryKeyJoinColumn(name= "employee_id"))
@SecondaryTable(name = "employee_status", pkJoinColumns = @PrimaryKeyJoinColumn(name= "employee_id"))
@Data
public class EmployeeCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "is_archived")
    private Boolean isArchived;

    @Column(name = "email_address", table = "employee_contact_details")
    private String emailAddress;

    @Column(name = "start_date", table = "employee_status")
    private Date startDate;

    @Column(name = "finish_date", table = "employee_status")
    private Date finishDate;

    @Column(name = "contract_type", table= "employee_status")
    private Integer contractType;
}
