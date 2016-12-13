DROP TABLE if EXISTS ApplicantUsers CASCADE;
DROP TABLE if EXISTS Employers CASCADE;
DROP TABLE if EXISTS Applicants CASCADE;


CREATE TABLE ApplicantUsers (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR(200),
  last_name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(200),
  type VARCHAR(200)
);

CREATE TABLE Employers (
  id SERIAL PRIMARY KEY UNIQUE,
  first_name VARCHAR(200),
  last_name VARCHAR(200),
  email VARCHAR(200) UNIQUE,
  password VARCHAR(200),
  company_name VARCHAR(200),
  company_address VARCHAR(200),
  company_city VARCHAR(200),
  company_state VARCHAR(200),
  company_zip VARCHAR(200),
  company_description VARCHAR(200),
  company_website VARCHAR(100),
  company_phone_number VARCHAR(200),
  company_email VARCHAR(2000),
  company_size VARCHAR(2000),
  company_industry VARCHAR(2000),
  company_branch VARCHAR(2000),
  company_logo VARCHAR(200)
);


CREATE TABLE Applicants (
  id SERIAL PRIMARY KEY UNIQUE,
  user_id INTEGER REFERENCES ApplicantUsers (id) ON DELETE CASCADE,
  desired_industry text,
  desired_location text[],
  education_level VARCHAR(200),
  school VARCHAR(200),
  experience_level VARCHAR(200),
  certifications text[],
  languages_spoken text[],
  resume_pdf VARCHAR(2000),
  profile_image VARCHAR(200)
);
