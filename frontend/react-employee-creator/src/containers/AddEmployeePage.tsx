import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import ContactDetailsDto from '../dtos/ContactDetailsDto';
import EmployeeForm from '../components/EmployeeForm';
import { updateEmployee } from '../service/DataService';
import EmployeeStatusDto from '../dtos/EmployeeStatusDto';

const AddEmployeePage = () => {
  const employee = new PersonalInfoDto(undefined, '', '', '', false);
  const contactDetails = new ContactDetailsDto(
    undefined,
    undefined,
    '',
    '',
    ''
  );
  const employeeStatus = new EmployeeStatusDto(
    undefined,
    undefined,
    new Date(),
    undefined,
    undefined,
    undefined,
    undefined
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

    const url = 'http://localhost:8080/api/admin/employee/add';
    await updateEmployee(url, 'POST', employee, contactDetails, employeeStatus)
      .then((response) => {
        if (response.ok) {
          setWarningMessage('');
          setDisplaySuccess(true);
        } else {
          setDisplaySuccess(false);
          setWarningMessage('Something went wrong!');
        }
      })
      .catch();
    e.target.reset();
  };

  return (
    <>
      <div className="text-end">
        <NavLink to="/">Back to list</NavLink>
      </div>

      <div className="container mt-3 mb-3">
        {displaySuccess && (
          <div className="alert alert-success">Employee added successfully</div>
        )}
        {warningMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            {warningMessage}
          </div>
        )}
      </div>
      <EmployeeForm
        formTitle="Add New Employee"
        personalInfo={employee}
        contactDetails={contactDetails}
        employeeStatus={employeeStatus}
        onFormSubmit={processFormData}
      />
    </>
  );
};

export default AddEmployeePage;
