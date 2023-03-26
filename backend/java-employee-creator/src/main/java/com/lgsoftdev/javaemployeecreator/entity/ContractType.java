package com.lgsoftdev.javaemployeecreator.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employment_contract_types")
@Data
public class ContractType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "contract_type")
    private String contractType;
}
