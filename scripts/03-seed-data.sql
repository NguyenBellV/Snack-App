-- Insert categories
INSERT INTO categories (name, slug, description, is_active) VALUES
('Bánh kẹo', 'banh-keo', 'Các loại bánh kẹo ngọt ngào', true),
('Nước ngọt', 'nuoc-ngot', 'Nước giải khát có gas và không gas', true),
('Snack', 'snack', 'Đồ ăn vặt giòn tan', true),
('Bánh quy', 'banh-quy', 'Bánh quy các loại', true),
('Kẹo cao su', 'keo-cao-su', 'Kẹo cao su và kẹo nhai', true),
('Chocolate', 'chocolate', 'Sôcôla và kẹo chocolate', true);

-- Insert products
INSERT INTO products (name, slug, description, short_description, price, original_price, category_id, brand, origin, weight, expiry_months, stock_quantity, rating, review_count, featured) VALUES
('Bánh Oreo Original 137g', 'banh-oreo-original-137g', 'Bánh quy Oreo Original với lớp kem vani thơm ngon, giòn tan trong miệng. Sản phẩm được làm từ nguyên liệu chất lượng cao, đảm bảo an toàn vệ sinh thực phẩm.', 'Bánh quy Oreo Original với kem vani', 25000, 30000, 4, 'Oreo', 'Malaysia', '137g', 12, 100, 4.8, 1250, true),

('Coca Cola 330ml', 'coca-cola-330ml', 'Nước ngọt Coca Cola 330ml với hương vị đặc trưng, sảng khoái. Sản phẩm chính hãng, đảm bảo chất lượng.', 'Nước ngọt Coca Cola 330ml', 12000, 15000, 2, 'Coca Cola', 'Việt Nam', '330ml', 18, 200, 4.9, 2500, true),

('Snack Oishi Bí Đỏ 42g', 'snack-oishi-bi-do-42g', 'Snack Oishi vị bí đỏ giòn tan, thơm ngon. Được làm từ bí đỏ tự nhiên, bổ dưỡng và an toàn.', 'Snack Oishi vị bí đỏ giòn tan', 8000, 10000, 3, 'Oishi', 'Thái Lan', '42g', 12, 150, 4.7, 800, false),

('Kẹo Mentos Mint 37.5g', 'keo-mentos-mint-37-5g', 'Kẹo Mentos vị bạc hà mát lạnh, giúp thơm miệng và sảng khoái. Bao bì tiện lợi, dễ mang theo.', 'Kẹo Mentos vị bạc hà', 15000, 18000, 1, 'Mentos', 'Hà Lan', '37.5g', 24, 80, 4.6, 650, false),

('Pepsi 330ml', 'pepsi-330ml', 'Nước ngọt Pepsi 330ml với hương vị cola đặc trưng, tươi mát và sảng khoái.', 'Nước ngọt Pepsi 330ml', 11000, 14000, 2, 'Pepsi', 'Việt Nam', '330ml', 18, 180, 4.8, 1800, false),

('Bánh Chocopie 360g', 'banh-chocopie-360g', 'Bánh Chocopie với lớp marshmallow mềm mịn, phủ chocolate thơm ngon. Hộp 12 cái tiện lợi.', 'Bánh Chocopie hộp 12 cái', 45000, 55000, 6, 'Orion', 'Hàn Quốc', '360g', 12, 60, 4.9, 950, true),

('Kẹo Haribo Goldbears 100g', 'keo-haribo-goldbears-100g', 'Kẹo dẻo Haribo hình gấu với nhiều hương vị trái cây tự nhiên, mềm dẻo và thơm ngon.', 'Kẹo dẻo Haribo hình gấu', 35000, 40000, 1, 'Haribo', 'Đức', '100g', 18, 40, 4.7, 320, false),

('Trident White Mint', 'trident-white-mint', 'Kẹo cao su Trident White vị bạc hà, giúp làm trắng răng và thơm miệng lâu dài.', 'Kẹo cao su làm trắng răng', 22000, 25000, 5, 'Trident', 'Mỹ', '14 viên', 24, 70, 4.5, 180, false);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(1, '/placeholder.svg?height=400&width=400&text=Oreo+Front', 'Bánh Oreo mặt trước', 0, true),
(1, '/placeholder.svg?height=400&width=400&text=Oreo+Back', 'Bánh Oreo mặt sau', 1, false),
(1, '/placeholder.svg?height=400&width=400&text=Oreo+Side', 'Bánh Oreo mặt bên', 2, false),
(2, '/placeholder.svg?height=400&width=400&text=Coca+Cola', 'Coca Cola 330ml', 0, true),
(3, '/placeholder.svg?height=400&width=400&text=Oishi', 'Snack Oishi Bí Đỏ', 0, true),
(4, '/placeholder.svg?height=400&width=400&text=Mentos', 'Kẹo Mentos Mint', 0, true),
(5, '/placeholder.svg?height=400&width=400&text=Pepsi', 'Pepsi 330ml', 0, true),
(6, '/placeholder.svg?height=400&width=400&text=Chocopie', 'Bánh Chocopie', 0, true),
(7, '/placeholder.svg?height=400&width=400&text=Haribo', 'Kẹo Haribo Goldbears', 0, true),
(8, '/placeholder.svg?height=400&width=400&text=Trident', 'Trident White Mint', 0, true);

-- Insert product features
INSERT INTO product_features (product_id, feature) VALUES
(1, 'Hương vị kem vani đặc trưng'),
(1, 'Bánh quy giòn tan'),
(1, 'Không chất bảo quản có hại'),
(1, 'Bao bì tiện lợi, dễ bảo quản'),
(2, 'Hương vị cola đặc trưng'),
(2, 'Không caffeine'),
(2, 'Lon nhôm tái chế được'),
(3, 'Làm từ bí đỏ tự nhiên'),
(3, 'Giòn tan, thơm ngon'),
(3, 'Không chất tạo màu nhân tạo'),
(6, 'Marshmallow mềm mịn'),
(6, 'Phủ chocolate cao cấp'),
(6, 'Hộp 12 cái tiện lợi');

-- Insert sample coupons
INSERT INTO coupons (code, name, description, discount_type, discount_value, min_order_amount, max_discount_amount, usage_limit, is_active, expires_at) VALUES
('WELCOME10', 'Chào mừng khách hàng mới', 'Giảm 10% cho đơn hàng đầu tiên', 'percentage', 10, 100000, 50000, 1000, true, NOW() + INTERVAL '30 days'),
('FREESHIP', 'Miễn phí vận chuyển', 'Miễn phí ship cho đơn từ 200k', 'fixed', 30000, 200000, 30000, 500, true, NOW() + INTERVAL '15 days'),
('SAVE50K', 'Giảm 50k', 'Giảm 50k cho đơn hàng từ 500k', 'fixed', 50000, 500000, 50000, 200, true, NOW() + INTERVAL '7 days');
