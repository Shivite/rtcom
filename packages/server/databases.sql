explain // how database run the query, 
create INDEX indexname on tablename (columname);
CREATE UNIQUE INDEX index_name ON table_name (column_name); [all values in indexed column is distinct]
CREATE INDEX index_name ON table_name (column1, column2);  [composit index on multiple column]
CREATE INDEX index_name ON table_name (column_name) WHERE condition; [ pratial ]

-- convert all male to female and vice versa
UPDATE users SET gender = CASE
    CASE='female' THEN 'male'
    CASE='male' THEN 'female'
    ELSE gender
END

Duplicate with count
Select name, count(*) from test.contacts group by name having count(name)>1;

Select * from table order by desc limit 10;

Select l.name from test.lawyers as l join test.lawyerreviews  as lr on l.id = lr.lawyers_id;
Explain select * prd_id, prd_name from products where prd_code = "xyz"; 

Create index indexName on product_code(pc);

alter table test.contacts add index cn(name);
Create index indexName on column(key);
Primary Index: Automatically created on the primary key.
Unique Index: Ensures all values in a column are unique.
Regular Index: Speeds up retrieval but allows duplicate values.
Full-Text Index: Used for full-text searches.

Explain to check the execution behaviour of a query.
Explain extended   provide more detailed information about query.
Show warnings: give additional details also.

Slow query log/ Enabling General Query Log: we can enable slow query log by using .conf or .ini we also can use the set global variable also

slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow-query.log
long_query_time = 2

SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow-query.log';
SET GLOBAL long_query_time = 2;

 Viewing and Analyzing Query Logs. Tail -f file/path

Transactions and acid prop:
Transaction: multiple mysql statements/query execution as a single unit.
A atmocity: All or nothin
C Consistency: transaction transform the db from one consistant state to another state.
I Isolation: While execution one transaction will be isolated from other till the time it completed. States of one Transaction	is hidden from other.
D Durability: Once the transaction completed it will be permanent event in the case of failure.ss

START TRANSACTION;
Update product set balance = balance -1 where id =1;
Update set product set balance = balance-2 where id=2;
Commit;

Deadlock: one transaction waiting on other to be completed and timeout happen. 
Avoid: 
Transaction timeout, innodb automatically detect the deadlock & rollback
Avoid complex nested transactions.

stored procedure:
Are recompiled mysql statements, executed them by calling name of procedure with specified params. 
ADV: Precomilled so fast to execute, more secure we can call like mehtods, reusability.

Create procedure procedurename(IN emp_id INT)
BEGIN
	select * from table,
END

mysqldump -u username -p database_name > backup_file.sql

get 3rd topest salary:
select salary from emp orderby salary limit 1 offset 2

SHALLOW COPY: Copies the top-level object only, sharing references to nested objects.
 top-level object is copied; nested objects or arrays are not.
EX: 
const shallowCopy = Object.assign({}, original);
const shallowCopy2 = { ...original };
assignment:
shallowCopy.address.city = 'Los Angeles';

DEEP COPE: create new object with all nested objects. Recursively copies all objects, creating a completely independent copy.
EX:
    const deepCopy = JSON.parse(JSON.stringify(original));



