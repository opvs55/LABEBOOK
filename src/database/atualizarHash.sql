-- Active: 1677178214740@@127.0.0.1@3306

-- atualizar senhas para hashes bcrypt
-- (NÃO RODAR ANTES DA PRÁTICA 3 SER FINALIZADA)

UPDATE users
SET password = "$2a$12$RcAw.vQBSwBNxPJvd5WmYOLR2uULnx9Ahaqafd2JY1kvlWhe9sAkm"
WHERE name = "Samuel";
-- plaintext = dsadsadasdsa

UPDATE users
SET password = "$2a$12$r62jFwIKqOcfPia2SgcNduFzqry9rcMegyGWNrtgulBhbnIv5RyZW"
WHERE name = "jefferson";
-- plaintext = 123421321

UPDATE users
SET password = "$2a$12$SrOXtUZdxvgiFVw7cRawfuNpS4DCYuHq.v551KUI36fw3UtZUMzvq"
WHERE name = "marcos";
-- plaintext = 424244
