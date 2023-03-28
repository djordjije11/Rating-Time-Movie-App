IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [migration_id] nvarchar(150) NOT NULL,
        [product_version] nvarchar(32) NOT NULL,
        CONSTRAINT [pk___ef_migrations_history] PRIMARY KEY ([migration_id])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [genre] (
    [id] int NOT NULL IDENTITY,
    [tmdb_id] int NOT NULL,
    [name] varchar(30) NOT NULL,
    CONSTRAINT [pk_genre] PRIMARY KEY ([id])
);
GO

CREATE TABLE [movie] (
    [id] int NOT NULL IDENTITY,
    [tmdb_id] int NOT NULL,
    [title] varchar(255) NOT NULL,
    [image_url] varchar(2048) NULL,
    CONSTRAINT [pk_movie] PRIMARY KEY ([id])
);
GO

CREATE TABLE [user] (
    [id] int NOT NULL IDENTITY,
    [username] varchar(40) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL,
    [email] nvarchar(320) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL,
    [password] varchar(40) COLLATE SQL_Latin1_General_CP1_CS_AS NOT NULL,
    CONSTRAINT [pk_user] PRIMARY KEY ([id])
);
GO

CREATE TABLE [movie_genre] (
    [id] int NOT NULL IDENTITY,
    [movie_id] int NOT NULL,
    [genre_id] int NOT NULL,
    CONSTRAINT [pk_movie_genre] PRIMARY KEY ([id]),
    CONSTRAINT [fk_movie_genre_genre_genre_id] FOREIGN KEY ([genre_id]) REFERENCES [genre] ([id]) ON DELETE CASCADE,
    CONSTRAINT [fk_movie_genre_movie_movie_id] FOREIGN KEY ([movie_id]) REFERENCES [movie] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [rating] (
    [id] int NOT NULL IDENTITY,
    [stars_number] tinyint NOT NULL,
    [user_id] int NOT NULL,
    [movie_id] int NOT NULL,
    CONSTRAINT [pk_rating] PRIMARY KEY ([id]),
    CONSTRAINT [fk_rating_movie_movie_id] FOREIGN KEY ([movie_id]) REFERENCES [movie] ([id]) ON DELETE NO ACTION,
    CONSTRAINT [fk_rating_users_user_id] FOREIGN KEY ([user_id]) REFERENCES [user] ([id]) ON DELETE CASCADE
);
GO

CREATE INDEX [ix_movie_genre_genre_id] ON [movie_genre] ([genre_id]);
GO

CREATE UNIQUE INDEX [ix_movie_genre_movie_id_genre_id] ON [movie_genre] ([movie_id], [genre_id]);
GO

CREATE INDEX [ix_rating_movie_id] ON [rating] ([movie_id]);
GO

CREATE INDEX [ix_rating_user_id] ON [rating] ([user_id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20230328144059_InitialMigration', N'7.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE UNIQUE INDEX [ix_user_email] ON [user] ([email]);
GO

CREATE UNIQUE INDEX [ix_user_username] ON [user] ([username]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20230328145211_AddedUniqueIndexesForUsersUsernameAndEmail', N'7.0.4');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DROP INDEX [ix_rating_user_id] ON [rating];
GO

CREATE UNIQUE INDEX [ix_rating_user_id_movie_id] ON [rating] ([user_id], [movie_id]);
GO

CREATE UNIQUE INDEX [ix_movie_tmdb_id] ON [movie] ([tmdb_id]);
GO

CREATE UNIQUE INDEX [ix_genre_tmdb_id] ON [genre] ([tmdb_id]);
GO

INSERT INTO [__EFMigrationsHistory] ([migration_id], [product_version])
VALUES (N'20230328145344_AddedUniqueIndexesForTmdbIdsAndRating', N'7.0.4');
GO

COMMIT;
GO

