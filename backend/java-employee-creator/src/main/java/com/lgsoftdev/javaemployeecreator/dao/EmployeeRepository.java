package com.lgsoftdev.javaemployeecreator.dao;

import com.lgsoftdev.javaemployeecreator.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
