import { useState, useEffect } from 'react';
import { useEmployeesContext } from '../context/EmployeesContext';
import EmployeeTable from '../components/EmployeeTable';
import { getEmployees } from '../service/DataService';

const HomePage = () => {
  const { employees, setEmployees } = useEmployeesContext();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesList = await getEmployees();
      setEmployees(employeesList);
      setIsLoading(false);
    };

    fetchEmployees().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error);
    });
  }, []);

  return (
    <>
      {httpError && <p className="text-danger">{httpError}</p>}
      {isLoading && !httpError && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-warning"></div>
        </div>
      )}
      {!isLoading && !httpError && (
        <div className="card mt-5">
          <h5 className="card-header">List of Employees</h5>
          <div className="card-body">
            <EmployeeTable employees={employees} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
