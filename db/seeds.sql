INSERT INTO department (id, name)
VALUES (01, 'Admin'),
       (02, 'Livestock'),
       (03, 'Equine');

INSERT INTO role (id, title, salary, department_id)
VALUES (101, 'Ranch Manager', 100000.00, 01),
       (102, 'Financial Advisor and Payroll', 80000.00, 01),
       (201, 'Cowboy', 60000.00, 02),
       (301, 'Wrangler', 60000.00, 03),
       (202, 'Ranch Hand', 45000.00, 02);