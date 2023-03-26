class EmployeeStatusDto {
  id?: number;
  employeeId?: number;
  contractType?: number;
  startDate: Date;
  finishDate?: Date;
  workType?: number;
  hoursPerWeek?: number;

  constructor(
    id: number | undefined,
    contractType: number | undefined,
    startDate: Date,
    workType?: number | undefined,
    employeeId?: number | undefined,
    finishDate?: Date | undefined,
    hoursPerWeek?: number | undefined
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.contractType = contractType;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.workType = workType;
    this.hoursPerWeek = hoursPerWeek;
  }
}

export default EmployeeStatusDto;
