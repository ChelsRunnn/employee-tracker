INSERT INTO department (id, name)
VALUES (01, 'Admin'),
       (02, 'Ranch'),
       (03, 'Home');

INSERT INTO role (id, title, salary, department_id)
VALUES (101, 'Ranch Manager', 100000.00, 01),
       (102, 'Financial Advisor and Payroll', 80000.00, 01),
       (201, 'Wrangler', 60000.00, 02),
       (202, 'Ranch Hand', 45000.00, 02),
       (301, 'Cook', 50000.00, 03),