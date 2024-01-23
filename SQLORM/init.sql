USE nodeapp;
CREATE TABLE categories (
    id TINYINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE products (
    id TINYINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    categoryId TINYINT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(categoryId) REFERENCES categories(id)
);