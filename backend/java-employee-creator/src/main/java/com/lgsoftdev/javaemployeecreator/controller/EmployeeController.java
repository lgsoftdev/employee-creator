package com.lgsoftdev.javaemployeecreator.controller;

import com.lgsoftdev.javaemployeecreator.dto.EmployeeContactDetailsDto;
import com.lgsoftdev.javaemployeecreator.dto.EmployeePersonalInfoDto;
import com.lgsoftdev.javaemployeecreator.dto.EmployeePersonalContactStatusDto;
import com.lgsoftdev.javaemployeecreator.utils.Helper;
import com.lgsoftdev.javaemployeecreator.service.EmployeeService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RepositoryRestResource
@CrossOrigin(origins = Helper.corsAllowedOrigins)
@RestController
@RequestMapping("/api/admin/employee")
public class EmployeeController {
    private EmployeeService employeeService;

    @Autowired
    private Validator validator;

    @Autowired
    public EmployeeController(EmployeeService adminService) {
        this.employeeService = adminService;
    }

    @PostMapping("/add")
    public void addEmployee(@Valid @RequestBody @NotNull EmployeePersonalContactStatusDto employeeDto) {
        Set<ConstraintViolation<EmployeePersonalInfoDto>> personalInfoViolations = validator.validate(employeeDto.getPersonalInfoDto());
        if (!personalInfoViolations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>(personalInfoViolations));
        }
        Set<ConstraintViolation<EmployeeContactDetailsDto>> contactDetailsViolations = validator.validate(employeeDto.getContactDetailsDto());
        if (!contactDetailsViolations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>(contactDetailsViolations));
        }
        employeeService.addEmployee(employeeDto);
    }

    @PutMapping("/edit")
    public void editEmployee(@Valid @RequestBody @NotNull EmployeePersonalContactStatusDto employeeDto) throws Exception {
        Set<ConstraintViolation<EmployeePersonalInfoDto>> personalInfoViolations = validator.validate(employeeDto.getPersonalInfoDto());
        if (!personalInfoViolations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>(personalInfoViolations));
        }
        Set<ConstraintViolation<EmployeeContactDetailsDto>> contactDetailsViolations = validator.validate(employeeDto.getContactDetailsDto());
        if (!contactDetailsViolations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>(contactDetailsViolations));
        }
        employeeService.editEmployee(employeeDto);
    }

    @PutMapping("/remove")
    public void removeEmployee(@RequestParam Integer id) throws Exception {
        employeeService.removeEmployee(id);
    }
}
