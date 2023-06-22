create table
notes (
id bigint primary key generated always as identity,
content text,
user_id uuid
);
