import { render } from '@testing-library/react';
import {
  getContactDetails,
  getContractTypes,
  getEmployees,
  getEmployeeStatus,
  getPersonalInfo,
  getWorkTypes,
  removeEmployee,
} from '../src/service/DataService';

describe('Data Service test suite', () => {
  it('should return active employee records', async () => {
    const actual = await getEmployees();
    expect(actual).toBeDefined();
    if (actual.length > 0) {
      expect(actual[0].personalInfoDto.isArchived).toBeFalsy();
    }
  });

  it('should return contract type records', async () => {
    const actual = await getContractTypes();
    expect(actual.length).toBe(2);
  });

  it('should return work type records', async () => {
    const actual = await getWorkTypes();
    expect(actual.length).toBe(2);
  });

  it('should throw error for employee that does not exist', async () => {
    await expect(getPersonalInfo(9999)).rejects.toThrow(Error);
  });

  it('should return personal info, contact details and status for the specified employee id', async () => {
    const employees = await getEmployees();
    if (employees.length > 0) {
      const id = employees[0].personalInfoDto.id;
      const personalInfo = await getPersonalInfo(id!);
      expect(personalInfo).toBeDefined();

      const contactDetails = await getContactDetails(id!);
      expect(contactDetails).toBeDefined();

      const employeeStatus = await getEmployeeStatus(id!);
      expect(employeeStatus).toBeDefined();
    }
  });

  it('should throw error when trying to remove an employee that does not exist', async () => {
    await expect(removeEmployee(9999)).rejects.toThrow(Error);
  });
});
