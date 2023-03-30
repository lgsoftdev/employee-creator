/**
 * @jest-environment jsdom
 */
import PersonalInfoDto from '../src/dtos/PersonalInfoDto';
import ContactDetailsDto from '../src/dtos/ContactDetailsDto';
import EmployeeStatusDto from '../src/dtos/EmployeeStatusDto';
import EmployeeDetailsDto from '../src/dtos/EmployeeDetailsDto';
import EmployeeTable from '../src/components/EmployeeTable';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const employees: EmployeeDetailsDto[] = [
  {
    personalInfoDto: new PersonalInfoDto(
      1,
      'Dennis',
      undefined,
      'Brenner',
      false
    ),
    contactDetailsDto: new ContactDetailsDto(
      1,
      1,
      'dbrenner@gmail.com',
      '0412756984',
      '12 Magpie Avenue, Sydney NSW 2000'
    ),
    employeeStatusDto: new EmployeeStatusDto(
      1,
      1,
      new Date('2023-03-01'),
      1,
      1,
      undefined,
      undefined
    ),
  },
  {
    personalInfoDto: new PersonalInfoDto(2, 'Amelia', 'D', 'Song', false),
    contactDetailsDto: new ContactDetailsDto(
      1,
      2,
      'amelia@yahoo.com.au',
      '0412784123',
      '12 Merry Avenue, Sydney NSW 2000'
    ),
    employeeStatusDto: new EmployeeStatusDto(
      1,
      2,
      new Date('2021-03-01'),
      2,
      2,
      new Date('2023-03-29'),
      21
    ),
  },
];

describe('Employee List test suite', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable employees={employees} />} />
        </Routes>
      </BrowserRouter>
    ).container;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('should render all employees', () => {
    const cards = container.getElementsByClassName('card-title');
    expect(cards.length).toBe(2);
    if (cards.length == 2) {
      expect(cards[0].textContent).toEqual('Dennis Brenner');
      expect(cards[1].textContent).toEqual('Amelia Song');
    }
  });

  it('should render links labelled "Remove"', async () => {
    const removeLinks = container.getElementsByClassName('remove-link');
    expect(removeLinks.length).toBeGreaterThan(0);
  });
});
