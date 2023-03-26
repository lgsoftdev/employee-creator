package com.lgsoftdev.javaemployeecreator.dao;


import com.lgsoftdev.javaemployeecreator.entity.Employee;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeCard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface EmployeeCardRepository extends JpaRepository<EmployeeCard, Integer> {
    Page<EmployeeCard> findByIsArchived(@RequestParam("archived") boolean isArchived, Pageable Page);
}
