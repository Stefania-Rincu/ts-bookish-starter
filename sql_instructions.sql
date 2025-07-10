CREATE TABLE BOOK (
                      id INT IDENTITY(1,1) CONSTRAINT pk_book PRIMARY KEY,
                      title VARCHAR(100) CONSTRAINT null_title NOT NULL,
                      isbn VARCHAR(13) CONSTRAINT null_isbn NOT NULL,
                      num_copies INT CONSTRAINT null_num_copies NOT NULL,
                      CONSTRAINT ck_num_copies CHECK(num_copies > 0));

CREATE TABLE AUTHOR (
                        id INT IDENTITY(1,1) CONSTRAINT pk_author PRIMARY KEY,
                        author_name VARCHAR(50) CONSTRAINT null_author_name NOT NULL);

CREATE TABLE AUTHOR_BOOK (
                             id INT IDENTITY(1,1) CONSTRAINT pk_wrote PRIMARY KEY,
                             id_author INT CONSTRAINT null_author NOT NULL,
                             id_book INT CONSTRAINT null_book NOT NULL,
                             CONSTRAINT fk_wrote_author FOREIGN KEY(id_author) REFERENCES author(id),
                             CONSTRAINT fk_wrote_book FOREIGN KEY(id_book) REFERENCES book(id),
                             CONSTRAINT unq_author_book UNIQUE (id_author, id_book));

CREATE TABLE USERS (
                       id INT IDENTITY(1,1) CONSTRAINT pk_user PRIMARY KEY,
                       last_name VARCHAR(30) CONSTRAINT null_last_name NOT NULL,
                       first_name VARCHAR(30) CONSTRAINT null_first_name NOT NULL);

CREATE TABLE USER_BOOK (
                           id INT IDENTITY(1,1) CONSTRAINT pk_borrowed PRIMARY KEY,
                           id_user INT CONSTRAINT null_user NOT NULL,
                           id_book INT CONSTRAINT null_book NOT NULL,
                           due_return DATE CONSTRAINT null_date NOT NULL,
                           CONSTRAINT fk_borrowed_user FOREIGN KEY(id_user) REFERENCES users(id),
                           CONSTRAINT fk_borrowed_book FOREIGN KEY(id_book) REFERENCES book(id));



INSERT INTO BOOK
VALUES ('Harry Potter and the Philosophers Stone', '9780747532743', 4);
INSERT INTO BOOK
VALUES ('Harry Potter and the Chamber of Secrets', '9781408855669', 2);
INSERT INTO BOOK
VALUES ('How Technology Is Changing Human Behavior', '9781440869518', 3);
INSERT INTO BOOK
VALUES ('Forms that Work :Designing Web Forms for Usability', '9781558607101', 4);
INSERT INTO BOOK
VALUES ('Don`t Make Me Think, Revisited', '9780321965516', 2);


INSERT INTO AUTHOR
VALUES ('J K Rowling');
INSERT INTO AUTHOR
VALUES ('Rossana Pasquino');
INSERT INTO AUTHOR
VALUES ('C.G. Prado');
INSERT INTO AUTHOR
VALUES ('Caroline Jarrett');
INSERT INTO AUTHOR
VALUES ('Gerry Gaffney');
INSERT INTO AUTHOR
VALUES ('Steve Krug');


INSERT INTO AUTHOR_BOOK
VALUES (1,  1);
INSERT INTO AUTHOR_BOOK
VALUES (1,  2);
INSERT INTO AUTHOR_BOOK
VALUES (2,  3);
INSERT INTO AUTHOR_BOOK
VALUES (3,  3);
INSERT INTO AUTHOR_BOOK
VALUES (4,  4);
INSERT INTO AUTHOR_BOOK
VALUES (5,  4);
INSERT INTO AUTHOR_BOOK
VALUES (6,  4);


INSERT INTO USERS
VALUES ('Jane', 'Doe');
INSERT INTO USERS
VALUES ('Joe', 'Something');
INSERT INTO USERS
VALUES ('John', 'Somethingelse');
INSERT INTO USERS
VALUES ('Jack', 'Sparrow');


INSERT INTO USER_BOOK
VALUES (1, 1, '3 july 2025');
INSERT INTO USER_BOOK
VALUES (1, 2, '3 july 2025');
INSERT INTO USER_BOOK
VALUES (2, 1, '13 july 2025');
INSERT INTO USER_BOOK
VALUES (2, 3, '13 july 2025');
INSERT INTO USER_BOOK
VALUES (3, 3, '15 july 2025');
INSERT INTO USER_BOOK
VALUES (3, 4, '15 july 2025');
INSERT INTO USER_BOOK
VALUES (4, 4, '19 july 2025');


DROP TABLE AUTHOR_BOOK;
DROP TABLE USER_BOOK;
DROP TABLE USERS;
DROP TABLE AUTHOR;
DROP TABLE BOOK;