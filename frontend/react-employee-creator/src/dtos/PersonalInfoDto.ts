class PersonalInfoDto {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  isArchived?: boolean;

  constructor(
    id: number | undefined,
    firstName: string,
    middleName: string | undefined,
    lastName: string,
    isArchived: boolean | undefined
  ) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.isArchived = isArchived;
  }
}

export default PersonalInfoDto;
