import ContactDetailsDto from '../dtos/ContactDetailsDto';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import EmployeeStatusDto from '../dtos/EmployeeStatusDto';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';
import axios from 'axios';

export const getEmployees = async () => {
  const url: string =
    'http://localhost:8080/api/employeeCards/search/findByIsArchived?isArchived=false&sort=firstName,ASC';

  let responseData;

  try {
    const response = await axios.get(url);
    responseData = await response.data._embedded.employeeCards;
  } catch (error) {
    throw new Error('Something went wrong');
  }

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
  try {
    const url = `http://localhost:8080/api/employees/${id}`;
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const getContactDetails = async (id: number) => {
  try {
    const url = `http://localhost:8080/api/employeeContactDetails/search/findByEmployeeId?employeeId=${id}`;
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const getEmployeeStatus = async (id: number) => {
  try {
    const url = `http://localhost:8080/api/employeeStatuses/search/findByEmployeeId?employeeId=${id}`;
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
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
  try {
    const header = { headers: { 'Content-Type': 'application/json' } };
    const res =
      method.toLowerCase() == 'put'
        ? await axios.put(url, updateDto, header)
        : await axios.post(url, updateDto, header);
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const removeEmployee = async (id: number) => {
  try {
    const url = `http://localhost:8080/api/admin/employee/remove?id=${id}`;
    const res = await axios.put(
      url,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const getContractTypes = async () => {
  try {
    const url = 'http://localhost:8080/api/contractTypes';
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    const contractTypes = await response.data._embedded.contractTypes;
    return contractTypes;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const getWorkTypes = async () => {
  try {
    const url = 'http://localhost:8080/api/workTypes';
    const response = await axios.get(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    const workTypes = await response.data._embedded.workTypes;
    return workTypes;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};
