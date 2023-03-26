class ContactDetailsDto {
  id?: number;
  employeeId?: number;
  emailAddress: string;
  mobileNumber: string;
  residentialAddress: string;

  constructor(
    id: number | undefined,
    employeeId: number | undefined,
    emailAddress: string,
    mobileNumber: string,
    residentialAddress: string
  ) {
    this.id = id;
    this.employeeId = employeeId;
    this.emailAddress = emailAddress;
    this.mobileNumber = mobileNumber;
    this.residentialAddress = residentialAddress;
  }
}

export default ContactDetailsDto;
