-- Insert Roles
INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

-- Insert Users with BCrypt encoded passwords
-- user1 password: user123 (BCrypt encoded)
-- admin1 password: admin123 (BCrypt encoded)
INSERT INTO users (username, password, role_id, enabled) VALUES ('user1', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy77ULkm', 1, true);

-- admin1 password: admin123 (BCrypt encoded)
INSERT INTO users (username, password, role_id, enabled) VALUES ('admin1', '$2a$10$opIV9QGnVqKvZhNMPM2RgOk8vHDlZQ7yfpZGe/n9dR6rH7j4O3w.K', 2, true);

-- Additional users for testing
INSERT INTO users (username, password, role_id, enabled) VALUES ('user2', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy77ULkm', 1, true);
INSERT INTO users (username, password, role_id, enabled) VALUES ('admin2', '$2a$10$opIV9QGnVqKvZhNMPM2RgOk8vHDlZQ7yfpZGe/n9dR6rH7j4O3w.K', 2, true);
