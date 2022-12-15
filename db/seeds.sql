-- INSERT INTO department (id, name)
-- VALUES (001, 'Admin'),
--        (002, 'Ranch'),
--        (003, 'Home');

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (101, 'Ranch Manager', 100000.00, 01),
--        (102, 'Financial Advisor and Payroll', 80000.00, 01),
--        (201, 'Wrangler', 60000.00, 02),
--        (202, 'Ranch Hand', 45000.00, 02),
--        (301, 'Cook', 50000.00, 03);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Drew', 'Walker', 101, NULL),
       (11, 'Beth', 'Barnes', 201, 101),
       (12, 'Wayne', 'Lee', 202, 201),
       (13, 'Eddie', 'Eagle', 301, 101),
       (14, 'Sheyne', 'Cooper', 102, 101);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;