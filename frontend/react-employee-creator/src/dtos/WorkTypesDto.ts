class WorkTypesDto {
  id: number;
  workType: string;

  constructor(id: number, workType: string) {
    this.id = id;
    this.workType = workType;
  }
}

export default WorkTypesDto;
