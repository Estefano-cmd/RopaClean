create table rol(
    id_rol serial primary key,
    description_rol varchar(15)
);

INSERT INTO rol (description_rol) VALUES ('CUSTOMER');
INSERT INTO rol (description_rol) VALUES ('EMPLOYEE');
INSERT INTO rol (description_rol) VALUES ('ADMIN');
INSERT INTO rol (description_rol) VALUES ('MOTORCYCLIST');


create table brand(
    id_brand serial primary key,
    description_brand varchar(30)
);

INSERT INTO brand (description_brand) VALUES ('SUZUKI');
INSERT INTO brand (description_brand) VALUES ('HONDA');
INSERT INTO brand (description_brand) VALUES ('YAMAHA');

create table model(
    id_model serial primary key,
    descrition_model varchar(30),
    id_brand serial,
    foreign key (id_brand) references brand(id_brand)
);

INSERT INTO model (descrition_model, id_brand) VALUES ('NAVI', 2);
INSERT INTO model (descrition_model, id_brand) VALUES ('TWISTER', 2);
INSERT INTO model (descrition_model, id_brand) VALUES ('STREET', 3);

create table motorcycle(
    id_motorcycle serial primary key,
    plate varchar(30),
    color varchar(30),
    id_brand serial,
    id_model serial,
    foreign key (id_brand) references brand(id_brand),
    foreign key (id_model) references model(id_model)
);

INSERT INTO motorcycle (plate, color, id_brand, id_model) VALUES ('1111', 'ROJO', 2, 1);
INSERT INTO motorcycle (plate, color, id_brand, id_model) VALUES ('2222', 'AZUL', 2, 2);
INSERT INTO motorcycle (plate, color, id_brand, id_model) VALUES ('3333', 'NEGRO', 3, 3);


create table login(
    id_user serial primary key,
    username varchar(15),
    password varchar(30),
    state boolean,
	id_rol serial,
	foreign key (id_rol) references rol(id_rol)
);

INSERT INTO login (username, password, state, id_rol) VALUES ('cliente1', '12345678', true, 1);
INSERT INTO login (username, password, state, id_rol) VALUES ('empleado1', '12345678', true, 2);
INSERT INTO login (username, password, state, id_rol) VALUES ('admin', 'admin', true, 3);
INSERT INTO login (username, password, state, id_rol) VALUES ('motociclista1', '12345678', true, 4);
INSERT INTO login (username, password, state, id_rol) VALUES ('motociclista2', '12345678', true, 4);
INSERT INTO login (username, password, state, id_rol) VALUES ('motociclista3', '12345678', true, 4);


create table motorcyclist(
    id_motorcyclist serial primary key,
    name varchar(30),
    surname varchar(30),
    phone varchar(15),
    license varchar(30),
    ci varchar(15),
    id_motorcycle serial,
    id_user serial,
    foreign key (id_motorcycle) references motorcycle(id_motorcycle),
    foreign key (id_user) references login(id_user)
);

INSERT INTO motorcyclist (name, surname, phone, license, ci, id_motorcycle, id_user) VALUES ('JUAN', 'PEREZ', '1234567', '1111A', '123456', 1, 4);
INSERT INTO motorcyclist (name, surname, phone, license, ci, id_motorcycle, id_user) VALUES ('JOSE', 'RAMIREZ', '7654321', '2222A', '654321', 2, 5);
INSERT INTO motorcyclist (name, surname, phone, license, ci, id_motorcycle, id_user) VALUES ('FERNANDO', 'CUELLAR', '1936567', '3333A', '135790', 3, 6);


create table job(
    id_job serial primary key,
    detail_job varchar(30)
);

INSERT INTO job (detail_job) VALUES ('GERENTE')

create table employee(
    id_employee serial primary key,
    name varchar(30),
    surname varchar(30),
    phone varchar(15),
    ci varchar(15),
    id_job serial,
    id_user serial,
    foreign key (id_job) references job(id_job),
    foreign key (id_user) references login(id_user)
);

INSERT INTO employee (name, surname, phone, ci, id_job, id_user) VALUES ('MARTIN', 'CALERO', '60906650', '6247749', 1, 2);

create table customer(
    id_customer serial primary key,
    name varchar(30),
    surname varchar(30),
    phone varchar(15),
    ci varchar(15),
    id_user serial,
    foreign key (id_user) references login(id_user)
);

INSERT INTO customer (name, surname, phone, ci, id_user) VALUES ('BRYANA', 'OJOPI', '77589904', '7807074', 1);

create table coord(
    id_coord serial primary key,
    detail_position varchar(30),
    position point,
    id_customer serial,
    foreign key (id_customer) references customer(id_customer)
);

INSERT INTO coord (detail_position, position, id_customer) VALUES ('CASA', '(-17.751530, -63.185190)', 1);
SELECT * from coord co inner join customer cu on cu.id_customer = co.id_customer


create table cash_order(
    id_order serial primary key,
    order_date date,
    detail_order varchar(200),
    state varchar(1),
    id_customer serial,
    id_motorcyclist serial,
    foreign key (id_customer) references customer(id_customer),
    foreign key (id_motorcyclist) references motorcyclist(id_motorcyclist)
);

create table pay(   
    id_pay serial primary key,
    amount numeric(9,2),
    state varchar(1),
    date_pay date,
    id_order serial,
    foreign key (id_order) references cash_order(id_order)
);