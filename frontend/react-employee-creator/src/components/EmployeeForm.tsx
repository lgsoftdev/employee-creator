import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ContactDetailsDto from '../dtos/ContactDetailsDto';
import PersonalInfoDto from '../dtos/PersonalInfoDto';
import { useEffect, useState } from 'react';
import { getContractTypes, getWorkTypes } from '../service/DataService';
import ContractTypesDto from '../dtos/ContractTypesDto';
import WorkTypesDto from '../dtos/WorkTypesDto';
import EmployeeStatusDto from '../dtos/EmployeeStatusDto';
import {
  getFormattedDateForDBUpdate,
  CONTRACT_TYPE_CONTRACT,
  WORK_TYPE_PART_TIME,
} from '../utils/utils';

interface componentProps {
  formTitle: string;
  personalInfo: PersonalInfoDto;
  contactDetails: ContactDetailsDto;
  employeeStatus: EmployeeStatusDto;
  onFormSubmit: any;
}

const EmployeeForm = ({
  formTitle,
  personalInfo,
  contactDetails,
  employeeStatus,
  onFormSubmit,
}: componentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [contractTypes, setContractTypes] = useState<ContractTypesDto[]>([]);
  const [workTypes, setWorkTypes] = useState<WorkTypesDto[]>([]);

  const handleFinishDateChange = (event: any) => {
    setValue('finishDate', event);
    resetField('onGoing');
  };

  const handleOnGoingClick = (event: any) => {
    if (event.target.checked) {
      employeeStatus.finishDate = undefined;
      resetField('finishDate');
    }
  };

  const onSubmit = (data: any, e: any) => {
    data.startDate = getFormattedDateForDBUpdate(data.startDate);
    data.finishDate = data.finishDate
      ? getFormattedDateForDBUpdate(data.finishDate)
      : data.finishDate;
    onFormSubmit(data, e);
  };

  useEffect(() => {
    const getData = async () => {
      const contractTypes = await getContractTypes();
      const workTypes = await getWorkTypes();

      setContractTypes(contractTypes);
      setWorkTypes(workTypes);
    };

    getData();
  }, []);

  useEffect(() => {
    employeeStatus.startDate = new Date(employeeStatus.startDate);
    employeeStatus.finishDate = employeeStatus.finishDate
      ? new Date(employeeStatus.finishDate)
      : employeeStatus.finishDate;
    reset(employeeStatus);
  }, [employeeStatus]);

  return (
    <div className="card">
      <h5 className="card-header">{formTitle}</h5>
      <div className="card-body">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="mt-3 mb-4">Personal information</h5>
            <div className="d-grid mb-3">
              <label className="form-label">First name *</label>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={personalInfo.firstName}
                  {...register('firstName', { required: true, maxLength: 255 })}
                />
              </div>
              {errors.firstName && (
                <p className="text-danger small">
                  Required field with maximum 255 characters
                </p>
              )}
            </div>
            <div className="d-grid mb-3">
              <label className="form-label">Middle name (if applicable)</label>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={personalInfo.middleName}
                  {...register('middleName')}
                />
              </div>
            </div>
            <div className="d-grid mb-3">
              <label className="form-label">Last name *</label>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={personalInfo.lastName}
                  {...register('lastName', { required: true, maxLength: 255 })}
                />
              </div>
              {errors.lastName && (
                <p className="text-danger small">
                  Required field with maximum 255 characters
                </p>
              )}
            </div>

            <h5 className="mt-4 mb-4">Contact Details</h5>
            <div className="d-grid mb-3">
              <label className="form-label">Email address *</label>
              <div className="col-md-6">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactDetails.emailAddress}
                  {...register('emailAddress', {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </div>

              {errors.emailAddress && (
                <p className="text-danger small">
                  Required field and must be a valid email address
                </p>
              )}
            </div>

            <div className="d-grid mb-3">
              <label className="form-label">Mobile number *</label>
              <label className="small text-muted">
                Must be an Australian number
              </label>
              <div className="input-group">
                <span className="input-group-text" id="addon-wrapping">
                  +61
                </span>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={contactDetails.mobileNumber}
                    {...register('mobileNumber', {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
                  />
                </div>
              </div>
              {errors.mobileNumber && (
                <p className="text-danger small">
                  Required field with 10 digits
                </p>
              )}
            </div>
            <div className="d-grid mb-3">
              <label className="form-label">Residential address *</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contactDetails.residentialAddress}
                  {...register('residentialAddress', {
                    required: true,
                    maxLength: 255,
                  })}
                />
              </div>
              {errors.residentialAddress && (
                <p className="text-danger small">
                  Required field with maximum 255 characters
                </p>
              )}
            </div>

            <h5 className="mt-4 mb-4">Employee status</h5>
            <div className="d-grid mb-3">
              <div>
                <label className="form-label">
                  What is the contract type? *
                </label>
                {employeeStatus.contractType && (
                  <label className="text-primary small ms-2">
                    {contractTypes
                      .filter((item) => item.id == employeeStatus.contractType)
                      .map((item) => item.contractType)}
                  </label>
                )}
              </div>
              {contractTypes.length > 0 &&
                contractTypes.map((item) => {
                  return (
                    <div key={item.id}>
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        defaultValue={item.id}
                        {...register('contractType', { required: true })}
                      />
                      <label className="small" htmlFor="contractType">
                        {item.contractType}
                      </label>
                    </div>
                  );
                })}
              {errors.contractType && (
                <p className="text-danger small">Required field</p>
              )}
            </div>

            <div className="d-grid mb-3">
              <label className="form-label">Start date *</label>
              <Controller
                control={control}
                name="startDate"
                defaultValue={employeeStatus.startDate}
                rules={{
                  required: true,
                  validate: (value) =>
                    !getValues('finishDate') ||
                    value <= getValues('finishDate'),
                }}
                render={({
                  field: { onChange, name, value },
                  formState: { errors },
                }) => (
                  <>
                    <div className="col-md-3">
                      <DatePicker
                        className="form-control"
                        selected={value}
                        onChange={onChange}
                        dateFormat={'yyyy-MM-dd'}
                      />
                    </div>

                    {errors && errors[name] && (
                      <p className="text-danger small">
                        Required field with date format yyyy-MM-dd and must
                        occur before Finish date
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="d-grid mb-3">
              <label className="form-label">Finish date</label>
              <Controller
                control={control}
                name="finishDate"
                rules={{
                  validate: (value) =>
                    !value || value >= getValues('startDate'),
                }}
                defaultValue={employeeStatus.finishDate}
                render={({ field: { name, value } }) => (
                  <>
                    <div className="col-md-3">
                      <DatePicker
                        className="form-control"
                        selected={value}
                        onChange={handleFinishDateChange}
                        dateFormat={'yyyy-MM-dd'}
                      />
                    </div>
                    {errors && errors[name] && (
                      <p className="text-danger small">
                        Date format yyyy-MM-dd and must occur after Start date
                      </p>
                    )}
                  </>
                )}
              />
              <div>
                <input
                  className="form-check-input me-3"
                  type="checkbox"
                  {...register('onGoing')}
                  checked={
                    employeeStatus.contractType == CONTRACT_TYPE_CONTRACT &&
                    !employeeStatus.finishDate
                      ? true
                      : false
                  }
                  onClick={handleOnGoingClick}
                />
                <label className="small" htmlFor="onGoing">
                  On going
                </label>
              </div>
            </div>

            <div className="d-grid mb-3">
              <div>
                <label className="form-label">
                  Is this on a full-time or part-time basis? *
                </label>
                {employeeStatus.workType && (
                  <label className="text-primary small ms-2">
                    {workTypes
                      .filter((item) => item.id == employeeStatus.workType)
                      .map((item) => item.workType)}
                  </label>
                )}
              </div>
              {workTypes.length > 0 &&
                workTypes.map((item) => {
                  return (
                    <div key={item.id}>
                      <input
                        className="form-check-input me-3"
                        type="radio"
                        defaultValue={item.id}
                        {...register('workType', { required: true })}
                        onClick={(e) => {
                          if (Number(e.target.value) !== WORK_TYPE_PART_TIME) {
                            setValue('hoursPerWeek', '');
                          }
                        }}
                      />
                      <label className="small" htmlFor="workType">
                        {item.workType}
                      </label>
                    </div>
                  );
                })}
              {errors.workType && (
                <p className="text-danger small">Required field</p>
              )}
            </div>

            <div className="d-grid mb-3">
              <label className="form-label">Hours per week</label>
              <div className="col-md-1">
                <input
                  className="form-control"
                  type="number"
                  defaultValue={employeeStatus.hoursPerWeek}
                  {...register('hoursPerWeek', {
                    min: 1,
                    max: 168,
                    validate: (value) =>
                      (!value &&
                        getValues('workType') != WORK_TYPE_PART_TIME) ||
                      (Number(getValues('workType')) === WORK_TYPE_PART_TIME &&
                        Number(value) > 0),
                  })}
                />
              </div>
              {errors.hoursPerWeek && (
                <p className="text-danger small">
                  Required field for Part-time and must be greater than 0 and
                  less than or equal to 168.
                </p>
              )}
            </div>

            <div className="d-grid d-flex mt-5">
              <button type="submit" className="btn btn-primary ps-5 pe-5 me-3">
                Save
              </button>
              <button
                type="button"
                className="btn btn-light btn-outline-secondary ps-5 pe-5"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
