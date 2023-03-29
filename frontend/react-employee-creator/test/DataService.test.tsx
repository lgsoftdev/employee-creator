import { render } from '@testing-library/react';
import {
  getContractTypes,
  getEmployees,
  getWorkTypes,
} from '../src/service/DataService';

describe('Data Service test suite', () => {
  it('should return active employee records', async () => {
    const actual = await getEmployees();
    expect(actual).toBeDefined();
    if (actual.length > 0) {
      expect(actual[0].personalInfoDto.isArchived).toBeFalsy();
    }
  });

  it('should return contract type records', async () => {
    const actual = await getContractTypes();
    expect(actual.length).toBe(2);
  });

  it('should return work type records', async () => {
    const actual = await getWorkTypes();
    expect(actual.length).toBe(2);
  });
});
