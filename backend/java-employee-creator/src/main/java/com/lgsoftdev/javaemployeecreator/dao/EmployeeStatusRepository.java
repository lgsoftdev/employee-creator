package com.lgsoftdev.javaemployeecreator.dao;

import com.lgsoftdev.javaemployeecreator.entity.EmployeeContactDetail;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface EmployeeStatusRepository extends JpaRepository<EmployeeStatus, Integer> {
    EmployeeStatus findByEmployeeId(@RequestParam("employeeId") Integer employeeId);
}
