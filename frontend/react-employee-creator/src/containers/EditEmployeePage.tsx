import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import ContactDetailsDto from '../dtos/ContactDetailsDto';
import EmployeeForm from '../components/EmployeeForm';
import {
  getContactDetails,
  getEmployeeStatus,
  getPersonalInfo,
  updateEmployee,
} from '../service/DataService';
import EmployeeStatusDto from '../dtos/EmployeeStatusDto';

const EditEmployeePage = () => {
  const params = useParams();
  const [employee, setEmployee] = useState(
    new PersonalInfoDto(undefined, '', '', '', false)
  );
  const [contactDetails, setContactDetails] = useState(
    new ContactDetailsDto(undefined, undefined, '', '', '')
  );
  const [employeeStatus, setEmployeeStatus] = useState(
    new EmployeeStatusDto(
      undefined,
      undefined,
      new Date(),
      undefined,
      undefined,
      undefined,
      undefined
    )
  );
  const [warningMessage, setWarningMessage] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const processFormData = async (data: any, e: any) => {
    employee.firstName = data.firstName;
    employee.middleName = data.middleName;
    employee.lastName = data.lastName;
    contactDetails.emailAddress = data.emailAddress;
    contactDetails.mobileNumber = data.mobileNumber;
    contactDetails.residentialAddress = data.residentialAddress;
    employeeStatus.contractType = data.contractType;
    employeeStatus.startDate = data.startDate;
    employeeStatus.finishDate = data.finishDate;
    employeeStatus.workType = data.workType;
    employeeStatus.hoursPerWeek = data.hoursPerWeek;

    const url = 'http://localhost:8080/api/admin/employee/edit';
    try {
      await updateEmployee(
        url,
        'PUT',
        employee,
        contactDetails,
        employeeStatus
      );
      setWarningMessage('');
      setDisplaySuccess(true);
    } catch (error) {
      setDisplaySuccess(false);
      setWarningMessage('Something went wrong!');
    }

    e.target.reset();
  };

  useEffect(() => {
    const getEmployeeDetails = async () => {
      const personalInfoJson = await getPersonalInfo(Number(params.id));
      setEmployee(personalInfoJson);
      const contactDetailsJson = await getContactDetails(Number(params.id));
      setContactDetails(contactDetailsJson);
      const employeeStatusJson = await getEmployeeStatus(Number(params.id));
      setEmployeeStatus(employeeStatusJson);

      setWarningMessage('');
      setDisplaySuccess(false);
    };

    getEmployeeDetails();
  }, []);

  return (
    <>
      <div className="text-end">
        <NavLink to="/">Back to list</NavLink>
      </div>

      <div className="container mt-3 mb-3">
        {displaySuccess && (
          <div className="alert alert-success">
            Employee updated successfully
          </div>
        )}
        {warningMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            {warningMessage}
          </div>
        )}
      </div>
      <EmployeeForm
        formTitle="Employee Details"
        personalInfo={employee}
        contactDetails={contactDetails}
        employeeStatus={employeeStatus}
        onFormSubmit={processFormData}
      />
    </>
  );
};

export default EditEmployeePage;
