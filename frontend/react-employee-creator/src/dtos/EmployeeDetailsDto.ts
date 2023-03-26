import PersonalInfoDto from './PersonalInfoDto';
import ContactDetailsDto from './ContactDetailsDto';
import EmployeeStatusDto from './EmployeeStatusDto';

class EmployeeDetailsDto {
  personalInfoDto: PersonalInfoDto;
  contactDetailsDto: ContactDetailsDto;
  employeeStatusDto: EmployeeStatusDto;

  constructor(
    employee: PersonalInfoDto,
    contactDetails: ContactDetailsDto,
    employeeStatus: EmployeeStatusDto
  ) {
    this.personalInfoDto = new PersonalInfoDto(
      employee.id,
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.isArchived
    );
    this.contactDetailsDto = new ContactDetailsDto(
      contactDetails.id,
      contactDetails.employeeId,
      contactDetails.emailAddress,
      contactDetails.mobileNumber,
      contactDetails.residentialAddress
    );
    this.employeeStatusDto = new EmployeeStatusDto(
      employeeStatus.id,
      employeeStatus.contractType,
      employeeStatus.startDate,
      employeeStatus.workType,
      employeeStatus.employeeId,
      employeeStatus.finishDate,
      employeeStatus.hoursPerWeek
    );
  }
}

export default EmployeeDetailsDto;
