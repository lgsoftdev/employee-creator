import { EmployeesContext } from './EmployeesContext';
import { useState } from 'react';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';

interface props {
  children: JSX.Element | JSX.Element[];
}

const EmployeesProvider = ({ children }: props) => {
  const [employees, setEmployees] = useState<EmployeeDetailsDto[]>([]);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;
