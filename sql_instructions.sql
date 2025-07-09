CREATE TABLE BOOK (
                      id INT CONSTRAINT pk_book PRIMARY KEY,
                      title VARCHAR(100) CONSTRAINT null_title NOT NULL,
                      isbn VARCHAR(13) CONSTRAINT null_isbn NOT NULL,
                      num_copies INT CONSTRAINT null_num_copies NOT NULL,
                      CONSTRAINT ck_num_copies CHECK(num_copies > 0));

CREATE TABLE AUTHOR (
                        id INT CONSTRAINT pk_author PRIMARY KEY,
                        author_name VARCHAR(50) CONSTRAINT null_author_name NOT NULL);

CREATE TABLE AUTHOR_BOOK (
                             id INT CONSTRAINT pk_wrote PRIMARY KEY,
                             id_author INT CONSTRAINT null_author NOT NULL,
                             id_book INT CONSTRAINT null_book NOT NULL,
                             CONSTRAINT fk_wrote_author FOREIGN KEY(id_author) REFERENCES author(id),
                             CONSTRAINT fk_wrote_book FOREIGN KEY(id_book) REFERENCES book(id),
                             CONSTRAINT unq_author_book UNIQUE (id_author, id_book));

CREATE TABLE USERS (
                       id INT CONSTRAINT pk_user PRIMARY KEY,
                       last_name VARCHAR(30) CONSTRAINT null_last_name NOT NULL,
                       first_name VARCHAR(30) CONSTRAINT null_first_name NOT NULL);

CREATE TABLE USER_BOOK (
                           id INT CONSTRAINT pk_borrowed PRIMARY KEY,
                           id_user INT CONSTRAINT null_user NOT NULL,
                           id_book INT CONSTRAINT null_book NOT NULL,
                           due_return DATE CONSTRAINT null_date NOT NULL,
                           CONSTRAINT fk_borrowed_user FOREIGN KEY(id_user) REFERENCES users(id),
                           CONSTRAINT fk_borrowed_book FOREIGN KEY(id_book) REFERENCES book(id));



INSERT INTO BOOK
VALUES (1, 'Harry Potter and the Philosophers Stone', '9780747532743', 4);
INSERT INTO BOOK
VALUES (2, 'Harry Potter and the Chamber of Secrets', '9781408855669', 2);
INSERT INTO BOOK
VALUES (3, 'How Technology Is Changing Human Behavior', '9781440869518', 3);
INSERT INTO BOOK
VALUES (4, 'Forms that Work :Designing Web Forms for Usability', '9781558607101', 4);
INSERT INTO BOOK
VALUES (5, 'Don`t Make Me Think, Revisited', '9780321965516', 2);


INSERT INTO AUTHOR
VALUES (10, 'J K Rowling');
INSERT INTO AUTHOR
VALUES (11, 'Rossana Pasquino');
INSERT INTO AUTHOR
VALUES (12, 'C.G. Prado');
INSERT INTO AUTHOR
VALUES (13, 'Caroline Jarrett');
INSERT INTO AUTHOR
VALUES (14, 'Gerry Gaffney');
INSERT INTO AUTHOR
VALUES (15, 'Steve Krug');


INSERT INTO AUTHOR_BOOK
VALUES (50, 10,  1);
INSERT INTO AUTHOR_BOOK
VALUES (51, 10,  2);
INSERT INTO AUTHOR_BOOK
VALUES (52, 11,  3);
INSERT INTO AUTHOR_BOOK
VALUES (53, 12,  3);
INSERT INTO AUTHOR_BOOK
VALUES (54, 13,  4);
INSERT INTO AUTHOR_BOOK
VALUES (55, 14,  4);
INSERT INTO AUTHOR_BOOK
VALUES (56, 15,  4);


INSERT INTO USERS
VALUES (100, 'Jane', 'Doe');
INSERT INTO USERS
VALUES (101, 'Joe', 'Something');
INSERT INTO USERS
VALUES (102, 'John', 'Somethingelse');
INSERT INTO USERS
VALUES (103, 'Jack', 'Sparrow');


INSERT INTO USER_BOOK
VALUES (150, 100, 1, '3 july 2025');
INSERT INTO USER_BOOK
VALUES (151, 100, 2, '3 july 2025');
INSERT INTO USER_BOOK
VALUES (152, 101, 1, '13 july 2025');
INSERT INTO USER_BOOK
VALUES (153, 101, 3, '13 july 2025');
INSERT INTO USER_BOOK
VALUES (154, 102, 3, '15 july 2025');
INSERT INTO USER_BOOK
VALUES (155, 102, 4, '15 july 2025');
INSERT INTO USER_BOOK
VALUES (156, 103, 4, '19 july 2025');



DROP TABLE AUTHOR_BOOK;
DROP TABLE USER_BOOK;
DROP TABLE USERS;
DROP TABLE AUTHOR;
DROP TABLE BOOK;