import { NavLink } from 'react-router-dom';
import { useEmployeesContext } from '../context/EmployeesContext';
import EmployeeDetailsDto from '../dtos/EmployeeDetailsDto';
import { getEmployees, removeEmployee } from '../service/DataService';
import { CONTRACT_TYPE_CONTRACT, getYearsDiff } from '../utils/utils';

const EmployeeTableRow: React.FC<{ employee: EmployeeDetailsDto }> = (
  props
) => {
  const { setEmployees } = useEmployeesContext();

  const getContractInfo = () => {
    let contractType = 'Permanent';
    if (
      props.employee.employeeStatusDto.contractType == CONTRACT_TYPE_CONTRACT
    ) {
      contractType = 'Contract';
      if (!props.employee.employeeStatusDto.finishDate)
        return contractType + ' - On Going';
    } else {
      if (!props.employee.employeeStatusDto.finishDate) return contractType;
    }
    const years = getYearsDiff(
      props.employee.employeeStatusDto.startDate,
      props.employee.employeeStatusDto.finishDate
    );
    return years > 0
      ? contractType + ' - ' + years + ' yr(s)'
      : contractType + ' - < 1 yr';
  };

  const handleRemoveEmployee = async () => {
    await removeEmployee(props.employee.personalInfoDto.id!);

    const employeesList = await getEmployees();
    setEmployees(employeesList);
  };

  return (
    <tr>
      <td>
        <div className="card border-0">
          <div className="card-body">
            <h5 className="card-title">
              {props.employee.personalInfoDto.firstName}{' '}
              {props.employee.personalInfoDto.lastName}
            </h5>
            <div>{getContractInfo()}</div>
            <div>{props.employee.contactDetailsDto.emailAddress}</div>
          </div>
        </div>
      </td>
      <td>
        <NavLink to={`/employee/${props.employee.personalInfoDto.id}`}>
          <button type="button" className="btn btn-link">
            Edit
          </button>
        </NavLink>{' '}
        |{' '}
        <button
          type="button"
          className="btn btn-link"
          onClick={handleRemoveEmployee}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default EmployeeTableRow;
