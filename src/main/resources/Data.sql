drop table if exists category CASCADE 
drop table if exists expense CASCADE 
drop table if exists user CASCADE 

create table user (user_id number not null, user_name varchar(30), user_email varchar(30))

insert into user values (1,'Ranju','ranju@gmail.com')
insert into user values (2,'Rajanush','rajanishh@gmail.com')
insert into user values (3,'Thakku','thakku@gmail.com')

create table category(category_id number,category_name varchar(20))

insert into category values (1,'Travel')
insert into category values (2,'Home Loan')
insert into category values (3,'Student loan')

create table expense(expense_id number,expense_date date,expense_descript varchar(20),location varchar(20),category_category_id number,user_user_id number)

insert into expense values (100,'2019-06-16','Blue Mosque Trip','Istanbul',1,1)
insert into expense values (101,'2019-06-16','Business Trip','Ankara',2,2)
insert into expense values (102,'2019-06-16','Trip to Floriya','Floriya',3,1)