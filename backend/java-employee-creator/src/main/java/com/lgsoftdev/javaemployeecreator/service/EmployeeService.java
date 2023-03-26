package com.lgsoftdev.javaemployeecreator.service;

import com.lgsoftdev.javaemployeecreator.dao.EmployeeContactDetailRepository;
import com.lgsoftdev.javaemployeecreator.dao.EmployeeRepository;
import com.lgsoftdev.javaemployeecreator.dao.EmployeeStatusRepository;
import com.lgsoftdev.javaemployeecreator.dto.EmployeePersonalContactStatusDto;
import com.lgsoftdev.javaemployeecreator.dto.EmployeePersonalInfoDto;
import com.lgsoftdev.javaemployeecreator.entity.Employee;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeContactDetail;
import com.lgsoftdev.javaemployeecreator.entity.EmployeeStatus;
import com.lgsoftdev.javaemployeecreator.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;

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

    public void addEmployee(EmployeePersonalContactStatusDto employeeDto){
        Employee employee = new Employee();
        employee.setFirstName(employeeDto.getPersonalInfoDto().getFirstName().trim());
        employee.setMiddleName(Helper.getNullIfEmptyString(employeeDto.getPersonalInfoDto().getMiddleName()));
        employee.setLastName(employeeDto.getPersonalInfoDto().getLastName().trim());
        employee.setIsArchived(false);
        employeeRepository.save(employee);

        EmployeeContactDetail contactDetail = new EmployeeContactDetail();
        contactDetail.setEmployeeId(employee.getId());
        contactDetail.setEmailAddress(employeeDto.getContactDetailsDto().getEmailAddress().trim());
        contactDetail.setMobileNumber(employeeDto.getContactDetailsDto().getMobileNumber());
        contactDetail.setResidentialAddress(employeeDto.getContactDetailsDto().getResidentialAddress().trim());
        employeeContactDetailRepository.save(contactDetail);

        EmployeeStatus employeeStatus = new EmployeeStatus();
        employeeStatus.setEmployeeId(employee.getId());
        employeeStatus.setContractType(employeeDto.getEmployeeStatusDto().getContractType());
        employeeStatus.setStartDate(employeeDto.getEmployeeStatusDto().getStartDate());
        employeeStatus.setFinishDate(employeeDto.getEmployeeStatusDto().getFinishDate());
        employeeStatus.setWorkType(employeeDto.getEmployeeStatusDto().getWorkType());
        employeeStatus.setHoursPerWeek(employeeDto.getEmployeeStatusDto().getHoursPerWeek());
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
        employee.get().setFirstName(employeeDto.getPersonalInfoDto().getFirstName().trim());
        employee.get().setMiddleName(Helper.getNullIfEmptyString(employeeDto.getPersonalInfoDto().getMiddleName()));
        employee.get().setLastName(employeeDto.getPersonalInfoDto().getLastName().trim());
        employeeRepository.save(employee.get());

        contactDetails.get().setEmailAddress(employeeDto.getContactDetailsDto().getEmailAddress().trim());
        contactDetails.get().setMobileNumber(employeeDto.getContactDetailsDto().getMobileNumber());
        contactDetails.get().setResidentialAddress(employeeDto.getContactDetailsDto().getResidentialAddress().trim());
        employeeContactDetailRepository.save(contactDetails.get());

        employeeStatus.get().setContractType(employeeDto.getEmployeeStatusDto().getContractType());
        employeeStatus.get().setStartDate(employeeDto.getEmployeeStatusDto().getStartDate());
        employeeStatus.get().setFinishDate(employeeDto.getEmployeeStatusDto().getFinishDate());
        employeeStatus.get().setWorkType(employeeDto.getEmployeeStatusDto().getWorkType());
        employeeStatus.get().setHoursPerWeek(employeeDto.getEmployeeStatusDto().getHoursPerWeek());
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