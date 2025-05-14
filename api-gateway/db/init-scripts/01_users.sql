-- SUPER_ADMIN (1)
INSERT INTO users (name, email, password, is_active, role, birthdate, created_at)
VALUES
  ('Erhan Baş', 'erhan.bas@site.com', 'Admin123!', true, 'SUPER_ADMIN', '1988-03-14', NOW());

-- ADMIN (3)
INSERT INTO users (name, email, password, is_active, role, birthdate, created_at)
VALUES
  ('Selin Kaya', 'selin.kaya@site.com', 'Admin456!', true, 'ADMIN', '1990-01-10', NOW()),
  ('Ahmet Demir', 'ahmet.demir@site.com', 'Admin789!', false, 'ADMIN', '1985-09-22', NOW()),
  ('Burcu Yılmaz', 'burcu.yilmaz@site.com', 'Admin321!', true, 'ADMIN', '1993-06-05', NOW());

-- SELLER (6)
INSERT INTO users (name, email, password, is_active, role, birthdate, created_at)
VALUES
  ('Sena Ekinci', 'sena.ekinci@site.com', 'Sell123!', true, 'SELLER', '1987-07-14', NOW()),
  ('Mehmet Uzun', 'mehmet.uzun@site.com', 'Sell234!', true, 'SELLER', '1992-08-22', NOW()),
  ('Elif Aras', 'elif.aras@site.com', 'Sell345!', true, 'SELLER', '1995-01-17', NOW()),
  ('Cihan Koç', 'cihan.koc@site.com', 'Sell456!', true, 'SELLER', '1989-11-03', NOW()),
  ('Fatma Er', 'fatma.er@site.com', 'Sell567!', true, 'SELLER', '1994-02-25', NOW()),
  ('Serdar Kılıç', 'serdar.kilic@site.com', 'Sell678!', false, 'SELLER', '1988-06-10', NOW());

-- USER (10)
INSERT INTO users (name, email, password, is_active, role, birthdate, created_at)
VALUES
  ('Mert Aslan', 'mert.aslan@site.com', 'User123!', true, 'USER', '2000-07-20', NOW()),
  ('Zeynep Acar', 'zeynep.acar@site.com', 'User234!', true, 'USER', '1998-11-11', NOW()),
  ('Emre Çelik', 'emre.celik@site.com', 'User345!', false, 'USER', '1995-12-01', NOW()),
  ('Nazlı Kar', 'nazli.kar@site.com', 'User456!', true, 'USER', '1997-08-15', NOW()),
  ('Kerem Topal', 'kerem.topal@site.com', 'User567!', true, 'USER', '1993-04-30', NOW()),
  ('Aylin Boz', 'aylin.boz@site.com', 'User678!', true, 'USER', '2001-09-19', NOW()),
  ('Ali Vural', 'ali.vural@site.com', 'User789!', true, 'USER', '1990-05-12', NOW()),
  ('Deniz Kurt', 'deniz.kurt@site.com', 'User852!', true, 'USER', '1996-06-01', NOW()),
  ('Gizem Yılmaz', 'gizem.yilmaz@site.com', 'User963!', false, 'USER', '1994-10-23', NOW()),
  ('Baran Şahin', 'baran.sahin@site.com', 'User741!', true, 'USER', '1999-03-09', NOW());
