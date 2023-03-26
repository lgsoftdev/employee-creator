import EmployeeTableRow from './EmployeeTableRow';
import { NavLink } from 'react-router-dom';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';

const EmployeeTable: React.FC<{ employees: EmployeeDetailsDto[] }> = (
  props
) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <td>Please click 'Edit' to find more details of each employee.</td>
          <th>
            <NavLink to="/employee/add">
              <button className="btn btn-primary" type="button">
                Add employee
              </button>
            </NavLink>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((item) => (
          <EmployeeTableRow key={item.personalInfoDto.id} employee={item} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
