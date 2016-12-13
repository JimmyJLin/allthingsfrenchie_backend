INSERT INTO ApplicantUsers (name, last_name, email, password) VALUES
('jim', 'jim-last', 'jim@jim.com', '23242sdsdsds'),
('raz', 'raz-last', 'raz@raz.com', 'dsdsdsdsds'),
('emi', 'emi-last', 'emi@emi.com', 'dsdsdsdsdsdsdsds'),
('emine', 'emine-last', 'emine@emine.com', '44dsdsds');

INSERT INTO Employer (employer_id, name, last_name, email, password) VALUES
(1,'jim', 'jim-last', 'jim@jim.com', '23242sdsdsds'),
(2,'raz', 'raz-last', 'raz@raz.com', 'dsdsdsdsds'),
(4,'emi', 'emi-last', 'emi@emi.com', 'dsdsdsdsdsdsdsds'),
(2,'emine', 'emine-last', 'emine@emine.com', '44dsdsds');

INSERT INTO Employers (
  company_name,
  company_address,
  company_city,
  company_state,
  company_zip,
  company_description,
  company_website,
  company_phone_number,
  company_email,
  company_size,
  company_industry,
  company_branch,
  company_logo
) VALUES
(
  'UBS Investment Bank',
  '1 UBS Drive',
  'New YOrk',
  'NY',
  '10012',
  'UBS is a global firm providing financial services in over 50 countries. Visit our site to find out what we offer in your country.',
  'https://www.ubs.com',
  '8882793343',
  'info@ubs.com',
  'Large Cap',
  'Finance',
  'New York',
  'images/company_logo/ubs.png'
),
(
  'Company B',
  'B Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyB.com',
  '21221212121',
  'B@B.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company C',
  'C Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyC.com',
  '21221212121',
  'C@C.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company D',
  'D Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyD.com',
  '21221212121',
  'D@D.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
),
(
  'Company E',
  'E Drive',
  'Awesome',
  'NY',
  '10012',
  'Best Company in Town',
  'www.CompanyE.com',
  '21221212121',
  'E@E.com',
  'Micro Cap',
  'Accounting',
  'New YOrk',
  'logo.png'
);
