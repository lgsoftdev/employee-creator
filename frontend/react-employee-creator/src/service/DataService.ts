import ContactDetailsDto from '../dtos/ContactDetailsDto';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import EmployeeStatusDto from '../dtos/EmployeeStatusDto';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';

export const getEmployees = async () => {
  const url: string =
    'http://localhost:8080/api/employeeCards/search/findByIsArchived?isArchived=false&sort=firstName,ASC';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const responseJson = await response.json();
  const responseData = responseJson._embedded.employeeCards;
  const employeesDetails: EmployeeDetailsDto[] = [];
  for (const index in responseData) {
    const personalInfo = new PersonalInfoDto(
      responseData[index].id,
      responseData[index].firstName,
      undefined,
      responseData[index].lastName,
      responseData[index].isArchived
    );
    const contactDetails = new ContactDetailsDto(
      undefined,
      undefined,
      responseData[index].emailAddress,
      '',
      ''
    );
    const employeeStatus = new EmployeeStatusDto(
      undefined,
      responseData[index].contractType,
      responseData[index].startDate,
      undefined,
      undefined,
      responseData[index].finishDate,
      undefined
    );
    employeesDetails.push(
      new EmployeeDetailsDto(personalInfo, contactDetails, employeeStatus)
    );
  }
  return employeesDetails;
};

export const getPersonalInfo = async (id: number) => {
  const url = `http://localhost:8080/api/employees/${id}`;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const personalInfo = await fetch(url, requestOptions);
  if (!personalInfo.ok) throw new Error('Something went wrong');
  const personalInfoJson = await personalInfo.json();
  return personalInfoJson;
};

export const getContactDetails = async (id: number) => {
  const url = `http://localhost:8080/api/employeeContactDetails/search/findByEmployeeId?employeeId=${id}`;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const contactDetails = await fetch(url, requestOptions);
  if (!contactDetails.ok) throw new Error('Something went wrong');
  const contactDetailsJson = await contactDetails.json();
  return contactDetailsJson;
};

export const getEmployeeStatus = async (id: number) => {
  const url = `http://localhost:8080/api/employeeStatuses/search/findByEmployeeId?employeeId=${id}`;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const employeeStatus = await fetch(url, requestOptions);
  if (!employeeStatus.ok) throw new Error('Something went wrong');
  const employeeStatusJson = await employeeStatus.json();
  return employeeStatusJson;
};

export const updateEmployee = async (
  url: string,
  method: string,
  employee: PersonalInfoDto,
  contactDetails: ContactDetailsDto,
  employeeStatus: EmployeeStatusDto
) => {
  const updateDto: EmployeeDetailsDto = new EmployeeDetailsDto(
    employee,
    contactDetails,
    employeeStatus
  );

  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateDto),
  };

  return await fetch(url, requestOptions);
};

export const removeEmployee = async (id: number) => {
  const url = `http://localhost:8080/api/admin/employee/remove?id=${id}`;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };

  const employee = await fetch(url, requestOptions);
  if (!employee.ok) throw new Error('Something went wrong');
};

export const getContractTypes = async () => {
  const url = 'http://localhost:8080/api/contractTypes';
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const contractTypes = await fetch(url, requestOptions);
  if (!contractTypes.ok) throw new Error('Something went wrong');
  const responseJson = await contractTypes.json();
  const contractTypesJson = responseJson._embedded.contractTypes;
  return contractTypesJson;
};

export const getWorkTypes = async () => {
  const url = 'http://localhost:8080/api/workTypes';
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const workTypes = await fetch(url, requestOptions);
  if (!workTypes.ok) throw new Error('Something went wrong');
  const responseJson = await workTypes.json();
  const workTypesJson = responseJson._embedded.workTypes;
  return workTypesJson;
};
