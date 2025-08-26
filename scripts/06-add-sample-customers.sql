-- Insert sample profiles (customers)
INSERT INTO auth.users (id, email, created_at, updated_at) VALUES
('11111111-1111-1111-1111-111111111111', 'customer1@example.com', NOW(), NOW()),
('22222222-2222-2222-2222-222222222222', 'customer2@example.com', NOW(), NOW()),
('33333333-3333-3333-3333-333333333333', 'customer3@example.com', NOW(), NOW()),
('44444444-4444-4444-4444-444444444444', 'customer4@example.com', NOW(), NOW()),
('55555555-5555-5555-5555-555555555555', 'customer5@example.com', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample profiles
INSERT INTO profiles (id, full_name, phone, city, address, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'Nguyễn Văn An', '0901234567', 'Hồ Chí Minh', '123 Nguyễn Văn Linh, Q7', NOW() - INTERVAL '30 days'),
('22222222-2222-2222-2222-222222222222', 'Trần Thị Bình', '0912345678', 'Hà Nội', '456 Hoàng Hoa Thám, Ba Đình', NOW() - INTERVAL '15 days'),
('33333333-3333-3333-3333-333333333333', 'Lê Minh Cường', '0923456789', 'Đà Nẵng', '789 Lê Duẩn, Hải Châu', NOW() - INTERVAL '60 days'),
('44444444-4444-4444-4444-444444444444', 'Phạm Thị Dung', '0934567890', 'Cần Thơ', '321 Trần Hưng Đạo, Ninh Kiều', NOW() - INTERVAL '7 days'),
('55555555-5555-5555-5555-555555555555', 'Hoàng Văn Em', '0945678901', 'Hồ Chí Minh', '654 Võ Văn Tần, Q3', NOW() - INTERVAL '90 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample orders for customers
INSERT INTO orders (user_id, order_number, status, payment_status, subtotal, shipping_fee, total_amount, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_district, shipping_ward, created_at) VALUES
-- Customer 1 - VIP (multiple orders, high value)
('11111111-1111-1111-1111-111111111111', 'ORD001', 'delivered', 'completed', 500000, 0, 500000, 'Nguyễn Văn An', '0901234567', '123 Nguyễn Văn Linh', 'Hồ Chí Minh', 'Quận 7', 'Phường Tân Thuận Đông', NOW() - INTERVAL '25 days'),
('11111111-1111-1111-1111-111111111111', 'ORD002', 'delivered', 'completed', 800000, 0, 800000, 'Nguyễn Văn An', '0901234567', '123 Nguyễn Văn Linh', 'Hồ Chí Minh', 'Quận 7', 'Phường Tân Thuận Đông', NOW() - INTERVAL '20 days'),
('11111111-1111-1111-1111-111111111111', 'ORD003', 'delivered', 'completed', 1200000, 0, 1200000, 'Nguyễn Văn An', '0901234567', '123 Nguyễn Văn Linh', 'Hồ Chí Minh', 'Quận 7', 'Phường Tân Thuận Đông', NOW() - INTERVAL '10 days'),
('11111111-1111-1111-1111-111111111111', 'ORD004', 'delivered', 'completed', 600000, 0, 600000, 'Nguyễn Văn An', '0901234567', '123 Nguyễn Văn Linh', 'Hồ Chí Minh', 'Quận 7', 'Phường Tân Thuận Đông', NOW() - INTERVAL '5 days'),
('11111111-1111-1111-1111-111111111111', 'ORD005', 'shipping', 'completed', 300000, 30000, 330000, 'Nguyễn Văn An', '0901234567', '123 Nguyễn Văn Linh', 'Hồ Chí Minh', 'Quận 7', 'Phường Tân Thuận Đông', NOW() - INTERVAL '2 days'),

-- Customer 2 - Active (5+ orders)
('22222222-2222-2222-2222-222222222222', 'ORD006', 'delivered', 'completed', 150000, 30000, 180000, 'Trần Thị Bình', '0912345678', '456 Hoàng Hoa Thám', 'Hà Nội', 'Ba Đình', 'Phường Ngọc Hà', NOW() - INTERVAL '12 days'),
('22222222-2222-2222-2222-222222222222', 'ORD007', 'delivered', 'completed', 200000, 0, 200000, 'Trần Thị Bình', '0912345678', '456 Hoàng Hoa Thám', 'Hà Nội', 'Ba Đình', 'Phường Ngọc Hà', NOW() - INTERVAL '8 days'),
('22222222-2222-2222-2222-222222222222', 'ORD008', 'delivered', 'completed', 120000, 30000, 150000, 'Trần Thị Bình', '0912345678', '456 Hoàng Hoa Thám', 'Hà Nội', 'Ba Đình', 'Phường Ngọc Hà', NOW() - INTERVAL '6 days'),
('22222222-2222-2222-2222-222222222222', 'ORD009', 'delivered', 'completed', 250000, 0, 250000, 'Trần Thị Bình', '0912345678', '456 Hoàng Hoa Thám', 'Hà Nội', 'Ba Đình', 'Phường Ngọc Hà', NOW() - INTERVAL '4 days'),
('22222222-2222-2222-2222-222222222222', 'ORD010', 'confirmed', 'pending', 180000, 30000, 210000, 'Trần Thị Bình', '0912345678', '456 Hoàng Hoa Thám', 'Hà Nội', 'Ba Đình', 'Phường Ngọc Hà', NOW() - INTERVAL '1 day'),

-- Customer 3 - Inactive (few orders)
('33333333-3333-3333-3333-333333333333', 'ORD011', 'delivered', 'completed', 80000, 30000, 110000, 'Lê Minh Cường', '0923456789', '789 Lê Duẩn', 'Đà Nẵng', 'Hải Châu', 'Phường Hải Châu I', NOW() - INTERVAL '50 days'),
('33333333-3333-3333-3333-333333333333', 'ORD012', 'delivered', 'completed', 120000, 30000, 150000, 'Lê Minh Cường', '0923456789', '789 Lê Duẩn', 'Đà Nẵng', 'Hải Châu', 'Phường Hải Châu I', NOW() - INTERVAL '30 days');

-- Customer 4 is new (no orders)
-- Customer 5 - Inactive (1 old order)
INSERT INTO orders (user_id, order_number, status, payment_status, subtotal, shipping_fee, total_amount, shipping_name, shipping_phone, shipping_address, shipping_city, shipping_district, shipping_ward, created_at) VALUES
('55555555-5555-5555-5555-555555555555', 'ORD013', 'delivered', 'completed', 90000, 30000, 120000, 'Hoàng Văn Em', '0945678901', '654 Võ Văn Tần', 'Hồ Chí Minh', 'Quận 3', 'Phường 12', NOW() - INTERVAL '80 days');
