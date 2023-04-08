package com.lgsoftdev.javaemployeecreator.dao;

import com.lgsoftdev.javaemployeecreator.entity.EmployeeContactDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface EmployeeContactDetailRepository extends JpaRepository<EmployeeContactDetail, Integer> {
    EmployeeContactDetail findByEmployeeId(@RequestParam("employeeId") Integer employeeId);
}
