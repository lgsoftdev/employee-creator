CREATE DATABASE IF NOT EXISTS employee_creator;
USE employee_creator;

DROP TABLE IF EXISTS employee_contact_details;
DROP TABLE IF EXISTS employee_status;

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  middle_name varchar(255) DEFAULT NULL,
  last_name varchar(255) NOT NULL,
  is_archived tinyint DEFAULT 0 NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_contact_details (
  id int NOT NULL AUTO_INCREMENT,
  employee_id int NOT NULL,
  email_address varchar(255) NOT NULL,
  mobile_number char(10) NOT NULL,
  residential_address varchar (255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS employment_contract_types;
CREATE TABLE employment_contract_types (
  id int NOT NULL AUTO_INCREMENT,
  contract_type varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS employment_work_types;
CREATE TABLE employment_work_types (
  id int NOT NULL AUTO_INCREMENT,
  work_type varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee_status (
  id int NOT NULL AUTO_INCREMENT,
  employee_id int  NOT NULL,
  contract_type int NOT NULL,
  start_date date NOT NULL,
  finish_date date DEFAULT NULL,
  work_type int NOT NULL,
  hours_per_week smallint DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (contract_type) REFERENCES employment_contract_types(id),
  FOREIGN KEY (work_type) REFERENCES employment_work_types(id)
);

INSERT INTO employment_contract_types (contract_type)
VALUES
	('Permanent'),
	('Contract');
    
INSERT INTO employment_work_types (work_type)
VALUES
	('Full-time'),
	('Part-time');

UNLOCK TABLES;
