-- Script để fix Flyway validation error cho V5 migration
-- Chạy script này trong MySQL database trước khi restart app

-- 1. Kiểm tra state hiện tại
SELECT * FROM flyway_schema_history WHERE version = '5';

-- 2. Kiểm tra table có tồn tại không
SHOW TABLES LIKE 'peer_practice_sessions';

-- 3. Nếu table KHÔNG tồn tại - Xóa record trong flyway_schema_history
-- Uncomment dòng dưới nếu table chưa tồn tại:
-- DELETE FROM flyway_schema_history WHERE version = '5';

-- 4. Nếu table ĐÃ tồn tại - Sửa structure và repair history
-- Uncomment các dòng dưới nếu table đã tồn tại:

-- Sửa columns nếu cần
-- ALTER TABLE peer_practice_sessions 
--   MODIFY COLUMN learner2_id BIGINT NULL,
--   MODIFY COLUMN status VARCHAR(20) DEFAULT 'PENDING';

-- Thêm columns nếu thiếu
-- ALTER TABLE peer_practice_sessions 
--   ADD COLUMN IF NOT EXISTS target_level VARCHAR(20),
--   ADD COLUMN IF NOT EXISTS chat_history TEXT;

-- Repair flyway history
-- UPDATE flyway_schema_history 
-- SET success = 1, installed_on = NOW() 
-- WHERE version = '5' AND success = 0;

-- 5. Verify sau khi fix
SELECT * FROM flyway_schema_history WHERE version = '5';
DESCRIBE peer_practice_sessions;


