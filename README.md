# Exercise

Put your newfound knowledge to the test by developing a CRUD application for
managing employee records. The application should include the following fields
for each employee: First Name, Last Name, Birthday, and Age (automatically
generated based on the selected birthday). This hands-on exercise will help
reinforce your skills, and you'll utilize Next.js for both frontend and backend
components while employing MySQL as the database.

SQL CODE:

```sql
CREATE DATABASE employee_records;
USE employee_records;

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    age INT
);

DELIMITER //
CREATE PROCEDURE InsertEmployee(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birthday DATE
)
BEGIN
    DECLARE today DATE;
    DECLARE birth_date DATE;
    DECLARE employee_age INT;

    SET today = CURDATE();
    SET birth_date = p_birthday;

    SET employee_age = TIMESTAMPDIFF(YEAR, birth_date, today) -
        (DATE_FORMAT(today, '%m%d') < DATE_FORMAT(birth_date, '%m%d'));

    INSERT INTO employees (first_name, last_name, birthday, age)
    VALUES (p_first_name, p_last_name, p_birthday, employee_age);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateEmployeeAge(
    IN p_employee_id INT
)
BEGIN
    DECLARE today DATE;
    DECLARE birth_date DATE;
    DECLARE employee_age INT;

    -- Get the current date
    SET today = CURDATE();

    -- Get the birthdate for the employee
    SELECT birthday INTO birth_date FROM employees WHERE employee_id = p_employee_id;

    -- Calculate the age accurately
    SET employee_age = YEAR(today) - YEAR(birth_date) -
        (DATE_FORMAT(today, '%m%d') < DATE_FORMAT(birth_date, '%m%d'));

    -- Update the age for the employee
    UPDATE employees
    SET age = employee_age
    WHERE employee_id = p_employee_id;
END //
DELIMITER ;
```
