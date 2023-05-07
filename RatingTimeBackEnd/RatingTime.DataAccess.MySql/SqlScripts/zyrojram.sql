CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `migration_id` varchar(150) NOT NULL,
    `product_version` varchar(32) NOT NULL,
    PRIMARY KEY (`migration_id`)
);

START TRANSACTION;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE TABLE `genre` (
        `id` int NOT NULL,
        `name` varchar(30) NOT NULL,
        PRIMARY KEY (`id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE TABLE `movie` (
        `id` int NOT NULL,
        `title` varchar(255) NOT NULL,
        `image_url` varchar(2048) NULL,
        PRIMARY KEY (`id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE TABLE `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `username` varchar(40) NOT NULL,
        `email` nvarchar(320) NOT NULL,
        `password` nvarchar(72) NOT NULL,
        `role` varchar(40) NOT NULL DEFAULT 'User',
        PRIMARY KEY (`id`),
        CONSTRAINT `ck_user_role` CHECK (`role` in ('User', 'Admin'))
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE TABLE `movie_genre` (
        `id` int NOT NULL AUTO_INCREMENT,
        `movie_id` int NOT NULL,
        `genre_id` int NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_movie_genre_genre_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE,
        CONSTRAINT `fk_movie_genre_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE TABLE `rating` (
        `id` int NOT NULL AUTO_INCREMENT,
        `stars_number` tinyint NOT NULL,
        `user_id` int NOT NULL,
        `movie_id` int NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_rating_movie_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE RESTRICT,
        CONSTRAINT `fk_rating_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE INDEX `ix_movie_genre_genre_id` ON `movie_genre` (`genre_id`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE UNIQUE INDEX `ix_movie_genre_movie_id_genre_id` ON `movie_genre` (`movie_id`, `genre_id`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE INDEX `ix_rating_movie_id` ON `rating` (`movie_id`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE UNIQUE INDEX `ix_rating_user_id_movie_id` ON `rating` (`user_id`, `movie_id`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE UNIQUE INDEX `ix_user_email` ON `user` (`email`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    CREATE UNIQUE INDEX `ix_user_username` ON `user` (`username`);
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `migration_id` = '20230507122229_InitialMySqlMigration')
BEGIN
    INSERT INTO `__EFMigrationsHistory` (`migration_id`, `product_version`)
    VALUES ('20230507122229_InitialMySqlMigration', '7.0.4');
END;

COMMIT;

