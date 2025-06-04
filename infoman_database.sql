CREATE DATABASE IF NOT EXISTS InvestmentAccountsDB;
USE InvestmentAccountsDB;

CREATE TABLE AccountInformation (
    Accnt_ID VARCHAR(20),
    AccntHolder_No INT,
    Accnt_Type VARCHAR(5),
    Accnt_Name VARCHAR(100),
    Accnt_ITF VARCHAR(100),
    PRIMARY KEY (Accnt_ID, AccntHolder_No)
);

CREATE TABLE PrincipalInvestorInformation (
    Accnt_ID VARCHAR(20),
    Princip_Investor_ID VARCHAR(25) PRIMARY KEY,
    Princip_Investor_Name VARCHAR(100),
    Princip_Investor_Perma_Add TEXT,
    Princip_Investor_Present_Add TEXT,
    Princip_Investor_HomeNo VARCHAR(15),
    Princip_Investor_Birth_Date DATE,
    Princip_Investor_Nationality VARCHAR(50),
    Princip_Investor_Sex CHAR(1),
    Princip_Investor_Civil_Status VARCHAR(10),
    Princip_Investor_Birth_Place VARCHAR(100),
    Princip_Investor_Email_Add VARCHAR(100),
    SSS_No VARCHAR(20),
    Princip_Investor_WorkNo VARCHAR(15),
    Princip_Investor_Occupation VARCHAR(50),
    Nature_Work VARCHAR(50),
    Job_Description VARCHAR(50),
    Company_Name VARCHAR(100),
    Gross_Annual_Income DECIMAL(12, 2),
    Princip_Investor_Work_Address TEXT,
    Princip_Investor_Mailing_Address TEXT,
    PH_TIN VARCHAR(20),
    FOREIGN KEY (Accnt_ID) REFERENCES AccountInformation(Accnt_ID)
);

CREATE TABLE PEPInformation (
    Accnt_ID VARCHAR(20),
    PEP_ID VARCHAR(25) PRIMARY KEY,
    PEP_Name VARCHAR(100),
    PEP_Relationship VARCHAR(100),
    PEP_GovtPosition VARCHAR(150),
    FOREIGN KEY (Accnt_ID) REFERENCES AccountInformation(Accnt_ID)
);

CREATE TABLE TPBOInformation (
    Accnt_ID VARCHAR(20),
    TPBO_ID VARCHAR(20) PRIMARY KEY,
    TPBO_Type VARCHAR(30),
    TPBO_Name VARCHAR(100),
    TPBO_Relationship VARCHAR(50),
    TPBO_Residence TEXT,
    TPBO_Birth_Date DATE,
    TPBO_Birth_Place VARCHAR(100),
    TPBO_Sex CHAR(1),
    TPBO_TIN VARCHAR(20),
    TPBO_Nationality VARCHAR(50),
    TPBO_Occupation VARCHAR(100),
    TPBO_Number VARCHAR(15),
    FOREIGN KEY (Accnt_ID) REFERENCES AccountInformation(Accnt_ID)
);

INSERT INTO AccountInformation (Accnt_ID, AccntHolder_No, Accnt_Type, Accnt_Name, Accnt_ITF) VALUES
('2025-JO-0001', 1, 'JO', 'Navarra, John Harold J.', 'Navarra, Bituin J.'),
('2025-JO-0001', 2, 'JO', 'Navarra, Loida J.', 'Navarra, Bituin J.'),
('2025-IN-0001', 1, 'IN', 'Mapoy, John Rod Michael T.', 'NONE'),
('2025-JO-0002', 1, 'JO', 'Cendaña, Ivan Darielle N.', 'Nerza, Hana Amara P.'),
('2025-JO-0002', 2, 'JO', 'Cendaña, Irvin Duane N.', 'Nerza, Hana Amara P.'),
('2025-JA-0001', 1, 'JA', 'Gaa, Angelo Gabrielle D.', 'Dano, Miguel Jaoquin D.'),
('2025-JA-0001', 2, 'JA', 'Dano, Denise D.', 'Dano, Miguel Jaoquin D.'),
('2025-IN-0002', 1, 'IN', 'Santiago, Coleen C.', 'NONE');

INSERT INTO PrincipalInvestorInformation (
    Accnt_ID, Princip_Investor_ID, Princip_Investor_Name, Princip_Investor_Perma_Add, 
    Princip_Investor_Present_Add, Princip_Investor_HomeNo, Princip_Investor_Birth_Date, 
    Princip_Investor_Nationality, Princip_Investor_Sex, Princip_Investor_Civil_Status, 
    Princip_Investor_Birth_Place, Princip_Investor_Email_Add, SSS_No, Princip_Investor_WorkNo, 
    Princip_Investor_Occupation, Nature_Work, Job_Description, Company_Name, Gross_Annual_Income, 
    Princip_Investor_Work_Address, Princip_Investor_Mailing_Address, PH_TIN
) VALUES
('2025-JO-0001', '2025-JOPI-0001', 'Navarra, John Harold J.', 'Mt. Heights Miramonte Park Subd, Caloocan City', 'North Triangle Camarin Caloocan City', '9412345324', '2004-09-04', 'Filipino', 'M', 'SI', 'Legazpi City', 'johnnavarra609@gmail.com', '0045-4995671-6', '9412345324', 'Game Developer', 'Software Development', 'Private', 'Riot', 200000, '12333 West Olympic Blvd, Los Angeles, California, 90064', 'Los Angeles', '285-673-219'),
('2025-IN-0001', '2025-INPI-0001', 'Mapoy, John Rod Michael P.', '417 D.V. Laurilla St. Makati', '417 D.V. Laurilla St. Makati', '9186780090', '2004-10-23', 'Filipino', 'M', 'SI', 'Makati City', 'johnrodmichaelm@gmail.com', '0012-3495677-1', '9412345324', 'Data Analyst', 'Information Technology', 'Private', 'Wells Fargo', 105000, 'McKinley Hill Drive, 1630 Taguig', 'Wells Fargo 420 Montgomery Street San Francisco, CA 94104', '509-812-347'),
('2025-JO-0002', '2025-JOPI-0002', 'Cendaña, Ivan Darielle N.', 'Mulawin St, Alecon Homes Subd, Llano, Caloocan City, Metro Manila, Philippines', 'Mulawin St, Alecon Homes Subd, Llano, Caloocan City, Metro Manila, Philippines', '9754522471', '2004-10-17', 'Filipino', 'M', 'SI', 'Valenzuela City', 'ivandariellecendana816@gmail.com', '0027-6611437-7', '9754522471', 'Security Architect', 'Cybersecurity', 'Private', 'Metrobank', 115000, 'Sen. Gil J. Puyat Ave, Makati, Metro Manila, Philippines 1200', '6813 Ayala Avenue, Barangay Bel-Air, Makati City, Philippines', '128-764-395'),
('2025-JA-0001', '2025-JAPI-0001', 'Gaa, Angelo Gabrielle D.', '198 F.Roxas St. Caloocan City', '198 F.Roxas St. Caloocan City', '9154528386', '2005-02-17', 'Filipino', 'M', 'SI', 'Caloocan City', 'angelogabriellegaa@gmail.com', '0033-1115041-3', '9154528386', 'Web Developer', 'Information Technology', 'Private', 'AB Clothing', 100000, '96 C.Namie St. Caloocan City', '198 F.Roxas St. Caloocan City', '128-764-395'),
('2025-IN-0002', '2025-INPI-0002', 'Santiago, Coleen C.', '#83 Roxas St. Quezon City', '#83 Roxas St. Quezon City', '9765792976', '2004-10-29', 'Filipino', 'F', 'SI', 'Naga City', 'coleen.sntg@gmail.com', '0029-1982375-9', '9765792976', 'Cyber Security Analyst', 'Cybersecurity', 'Private', 'Google', 110000, 'Seven NEO Building, 5th Ave, Manila', '#83 Roxas St. Quezon City', '621-347-890');

INSERT INTO PEPInformation (Accnt_ID, PEP_ID, PEP_Name, PEP_Relationship, PEP_GovtPosition) VALUES
('2025-JO-0001', '2025-JOPEP-1001', 'Red Birdie', 'Former Classmate', 'CAAP, Chairperson'),
('2025-IN-0001', '2025-INPEP-1001', 'Ho Lee Sheyt', 'Strategic Partner', 'Chinese MEM, Minister Response'),
('2025-IN-0001', '2025-INPEP-1002', 'Wi Tu Lo', 'Distant Uncle', 'Shandong Province, Governor'),
('2025-IN-0001', '2025-INPEP-1003', 'Bang Ding Ow', 'Co-worker', 'Muping District, District Leader'),
('2025-JO-0002', '2025-JOPEP-2001', 'Gusion Boots', 'Former Bodyguard', 'Master Sergeant, Philippine Army'),
('2025-JO-0002', '2025-JOPEP-2002', 'Khaleed Miya', 'Sandsurfer Instructor', 'Saudi Arabia\'s Ministry of Culture, Minister'),
('2025-JO-0002', '2025-JOPEP-2003', 'Shotei Hayabusa', 'Bestfriend', 'City of Nagaoka, Mayor'),
('2025-JA-0001', '2025-JAPEP-1001', 'Marygin Del Pilar Jr.', 'Cousin', 'Nueva Ecija, Board Member'),
('2025-JA-0001', '2025-JAPEP-1002', 'Kang Ji-Hoon', 'Nephew', 'Korean Youth Exchange Program, Regional Director'),
('2025-IN-0002', '2025-INPEP-2001', 'Juancho Revilliame', 'Former Officemate', 'Philippine Film Development Council, Chairman'),
('2025-IN-0002', '2025-INPEP-2002', 'Marie Juana Bato', 'Aunt', 'City of Naga, Congresswoman');

INSERT INTO TPBOInformation (
    Accnt_ID, TPBO_ID, TPBO_Type, TPBO_Name, TPBO_Relationship,
    TPBO_Residence, TPBO_Birth_Date, TPBO_Birth_Place, TPBO_Sex,
    TPBO_TIN, TPBO_Nationality, TPBO_Occupation, TPBO_Number
) VALUES
('2025-JO-0001', 'BO0001', 'Beneficiary Owner', 'Cha, Andres', 'Wife', 'Merry Homes, Caloocan City, Metro Manila, Philippines', '2002-11-22', 'Quezon City', 'F', '241-927-342', 'Filipino', 'Psychologist', '9932887611'),
('2025-JO-0002', 'TP0001', 'Third Party', 'Nerza, Aileen P.', 'Aunt', 'Solar Urban Homes, Bagumbong, Caloocan City, Metro Manila, Philippines', '1972-07-30', 'Leyte', 'F', '293-636-614', 'Filipino', 'Software Engineer', '9918023203'),
('2025-JA-0001', 'TP0002', 'Third Party', 'Dano, Denise D.', 'Cousin', '198 F.Roxas St. Caloocan City, Metro Manila, Philippines', '1995-09-25', 'Quezon City', 'F', '231-451-986', 'Filipino', 'Nurse', '9911341833');
