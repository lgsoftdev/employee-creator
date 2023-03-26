class ContractTypesDto {
  id: number;
  contractType: string;

  constructor(id: number, contractType: string) {
    this.id = id;
    this.contractType = contractType;
  }
}

export default ContractTypesDto;
