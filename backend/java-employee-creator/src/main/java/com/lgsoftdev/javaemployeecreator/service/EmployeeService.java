package com.lgsoftdev.javaemployeecreator.service;

import com.lgsoftdev.javaemployeecreator.dao.EmployeeContactDetailRepository;
import com.lgsoftdev.javaemployeecreator.dao.EmployeeRepository;
import com.lgsoftdev.javaemployeecreator.dao.EmployeeStatusRepository;
import com.lgsoftdev.javaemployeecreator.dto.EmployeePersonalContactStatusDto;
import com.lgsoftdev.javaemployeecreator.entity.Employee;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeContactDetail;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeStatus;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private EmployeeContactDetailRepository employeeContactDetailRepository;

    private EmployeeStatusRepository employeeStatusRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeContactDetailRepository employeeContactDetailRepository, EmployeeStatusRepository employeeStatusRepository) {
        this.employeeRepository = employeeRepository;
        this.employeeContactDetailRepository = employeeContactDetailRepository;
        this.employeeStatusRepository = employeeStatusRepository;
    }

    @Autowired
    private ModelMapper mapper;

    public void addEmployee(EmployeePersonalContactStatusDto employeeDto){
        Employee employee = mapper.map(employeeDto.getPersonalInfoDto(), Employee.class);
        employee.setIsArchived(false);
        employeeRepository.save(employee);

        EmployeeContactDetail contactDetail =  mapper.map(employeeDto.getContactDetailsDto(), EmployeeContactDetail.class);
        contactDetail.setEmployeeId(employee.getId());
        employeeContactDetailRepository.save(contactDetail);

        EmployeeStatus employeeStatus = mapper.map(employeeDto.getEmployeeStatusDto(), EmployeeStatus.class);
        employeeStatus.setEmployeeId(employee.getId());
        employeeStatusRepository.save(employeeStatus);
    }

    public void editEmployee(EmployeePersonalContactStatusDto employeeDto) throws Exception {
        Optional<Employee> employee = employeeRepository.findById(employeeDto.getPersonalInfoDto().getId());
        if(employee.isEmpty() || employee.get().getIsArchived()) {
            throw new Exception("Employee not found");
        }
        Optional<EmployeeContactDetail> contactDetails = employeeContactDetailRepository.findById(employeeDto.getContactDetailsDto().getId());
        if(contactDetails.isEmpty()) {
            throw new Exception("Employee contact details not found");
        }
        Optional<EmployeeStatus> employeeStatus = employeeStatusRepository.findById(employeeDto.getEmployeeStatusDto().getId());
        if(employeeStatus.isEmpty()) {
            throw new Exception("Employee status not found");
        }

        mapper.map(employeeDto.getPersonalInfoDto(), employee.get());
        employeeRepository.save(employee.get());

        mapper.map(employeeDto.getContactDetailsDto(), contactDetails.get());
        employeeContactDetailRepository.save(contactDetails.get());

        mapper.map(employeeDto.getEmployeeStatusDto(), employeeStatus.get());
        employeeStatusRepository.save(employeeStatus.get());
    }

    public void removeEmployee(Integer id) throws Exception {
        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isEmpty() || employee.get().getIsArchived()) {
            throw new Exception("Employee not found");
        }
        employee.get().setIsArchived(true);
        employeeRepository.save(employee.get());
    }
}