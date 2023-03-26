import { createContext, useContext } from 'react';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';

export type EmployeesContent = {
  employees: EmployeeDetailsDto[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeDetailsDto[]>>;
};

export const EmployeesContext = createContext<EmployeesContent>({
  employees: [],
  setEmployees: () => [],
});

export const useEmployeesContext = () => useContext(EmployeesContext);
