import { EmployeesContext } from './EmployeesContext';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import { useState } from 'react';

interface props {
  children: JSX.Element | JSX.Element[];
}

const EmployeesProvider = ({ children }: props) => {
  const [employees, setEmployees] = useState<PersonalInfoDto[]>([]);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;
