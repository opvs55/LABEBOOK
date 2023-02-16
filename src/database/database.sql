-- Active: 1676552731950@@127.0.0.1@3306

/*1ª parte é a implementação do banco de dados da lógica que envolve a criação de tabelas e suas relações*/

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL
);


CREATE TABLE post (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    context TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO users (id, name, email, password, role)
VALUES
("u001", "Samuel", "samuel@samuel.com", "dsadsadasdsa", "ADMIN"),
("u002", "jefferson", "jefferson@jefferso.com", "123421321", "NORMAL"),
("u003", "marcos", "marcos@marcos.com", "424244", "NORMAL");



INSERT INTO post(id, creator_id, context)
VALUES
("p001", "u002", "salve salve salve salve"),
("p002", "u003", "alou meu povo"),
("p003", "u001", "pastrollavasdsadsadas"),
("p004", "u003", "amém");


CREATE TABLE likes_dislikes (
    user_id text NOT NULL,
    post_id text NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p001", 1),
    ("u003", "p002", 1),
    ("u002", "p002", 0),
    ("u002", "p003", 1),
    ("u001", "p004", 0);



UPDATE post
SET likes = 1
WHERE id = "p001";

UPDATE post
SET likes = 1
WHERE id = "p002";

UPDATE post
SET dislikes = 1
WHERE id = "p002";

UPDATE post
SET likes = 1
WHERE id = "p003";

UPDATE post
SET dislikes = 1
WHERE id = "p004";


UPDATE post
SET likes = ( likes + 1)
WHERE id = "p002";




SELECT * FROM post;