/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { useState as useStateMock } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditEmployeePage from '../src/containers/EditEmployeePage';
import * as dataService from '../src/service/DataService';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Edit Employee Page test suite', () => {
  let container: HTMLElement;

  const axiosPersonalInfo = {
    data: {
      id: 1,
      firstName: 'Tina',
      middleName: undefined,
      lastName: 'Fey',
      isArchived: false,
    },
  } as AxiosResponse;
  const axiosContactDetails = {
    data: {
      id: 1,
      employeeId: 1,
      emailAddress: 'tfey@gmail.com',
      mobileNumber: '0412654789',
      residentialAddress: '123 Sesame Street, Happy, WA',
    },
  } as AxiosResponse;
  const axiosEmployeeStatus = {
    data: {
      id: 1,
      employeeId: 1,
      contractType: 2,
      startDate: new Date('2023-03-01'),
      finishDate: undefined,
      workType: 1,
      hoursPerWeek: undefined,
    },
  } as AxiosResponse;
  const axiosContractTypes = {
    data: [
      { id: 1, contractType: 'Permanent' },
      { id: 2, contractType: 'Contract' },
    ],
  } as AxiosResponse;
  const axiosWorkTypes = {
    data: [
      { id: 1, workType: 'Full-time' },
      { id: 2, workType: 'Part-time' },
    ],
  } as AxiosResponse;

  const setState = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(dataService, 'getPersonalInfo')
      .mockResolvedValue(axiosPersonalInfo);
    jest
      .spyOn(dataService, 'getContactDetails')
      .mockResolvedValue(axiosContactDetails);
    jest
      .spyOn(dataService, 'getEmployeeStatus')
      .mockResolvedValue(axiosEmployeeStatus);
    jest
      .spyOn(dataService, 'getContractTypes')
      .mockResolvedValue(axiosContractTypes);
    jest.spyOn(dataService, 'getWorkTypes').mockResolvedValue(axiosWorkTypes);

    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);

    container = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditEmployeePage />} />
        </Routes>
      </BrowserRouter>
    ).container;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
    jest.resetAllMocks();
  });

  it('should get an element with display text "Employee Details"', async () => {
    const header = async () => {
      try {
        return await waitFor(
          () => screen.getByText('Employee Details').textContent
        );
      } catch (error) {
        return '';
      }
    };

    const headerText = await header();
    expect(headerText).toEqual('Employee Details');
  });

  it('should get a button with text "Save"', async () => {
    const saveButton = async () => {
      try {
        return await waitFor(() => screen.getByText('Save').textContent);
      } catch (error) {
        return '';
      }
    };
    const buttonText = await saveButton();
    expect(buttonText).toEqual('Save');
  });
});
