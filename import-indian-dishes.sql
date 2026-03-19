-- Step 1: Update existing meals with nutrition data
update meals set calories = 250, protein = 5,  carbs = 45, fat = 6  where name = 'Vegetable Poha';
update meals set calories = 170, protein = 4,  carbs = 30, fat = 4  where name = 'Dosa';
update meals set calories = 150, protein = 5,  carbs = 28, fat = 1  where name = 'Idli Sambar';
update meals set calories = 320, protein = 12, carbs = 52, fat = 7  where name = 'Muesli';
update meals set calories = 280, protein = 16, carbs = 22, fat = 13 where name = 'Moong Paneer Chilla';
update meals set calories = 180, protein = 5,  carbs = 28, fat = 5  where name = 'Appe (Vegetable)';
update meals set calories = 280, protein = 16, carbs = 22, fat = 13 where name = 'Paneer Cheela';
update meals set calories = 250, protein = 5,  carbs = 45, fat = 6  where name = 'Poha';
update meals set calories = 280, protein = 7,  carbs = 50, fat = 6  where name = 'Sevaiyan';
update meals set calories = 220, protein = 6,  carbs = 36, fat = 6  where name = 'Suji Uttapam';
update meals set calories = 180, protein = 5,  carbs = 32, fat = 4  where name = 'Bhelpuri';
update meals set calories = 340, protein = 14, carbs = 38, fat = 15 where name = 'Paneer Paratha';
update meals set calories = 280, protein = 8,  carbs = 45, fat = 8  where name = 'Aloo Sandwich';
update meals set calories = 350, protein = 5,  carbs = 60, fat = 10 where name = 'Sabudana Khichdi';
update meals set calories = 230, protein = 6,  carbs = 38, fat = 7  where name = 'Upma';
update meals set calories = 420, protein = 18, carbs = 55, fat = 14 where name = 'Dal Makhni + Roti';
update meals set calories = 200, protein = 10, carbs = 28, fat = 5  where name = 'Moong Dal + Ghiya/Tori Sabzi';
update meals set calories = 380, protein = 20, carbs = 35, fat = 16 where name = 'Palak Paneer + Roti';
update meals set calories = 480, protein = 18, carbs = 72, fat = 13 where name = 'Chole Chawal + Hummus';
update meals set calories = 340, protein = 10, carbs = 48, fat = 11 where name = 'Kadhi + Mix Veg Sabzi + Roti';
update meals set calories = 380, protein = 13, carbs = 62, fat = 8  where name = 'Bhindi Tur Dal Rice';
update meals set calories = 120, protein = 3,  carbs = 14, fat = 6  where name = 'Baingan Bharta';
update meals set calories = 300, protein = 16, carbs = 16, fat = 20 where name = 'Kadai Paneer';
update meals set calories = 120, protein = 4,  carbs = 16, fat = 5  where name = 'Kadi';
update meals set calories = 130, protein = 3,  carbs = 14, fat = 7  where name = 'Bhindi';
update meals set calories = 80,  protein = 2,  carbs = 12, fat = 3  where name = 'Ghiya Sabzi';
update meals set calories = 270, protein = 14, carbs = 38, fat = 6  where name = 'Rajma';
update meals set calories = 280, protein = 14, carbs = 40, fat = 7  where name = 'Chole';
update meals set calories = 280, protein = 12, carbs = 32, fat = 12 where name = 'Dal Makhni';
update meals set calories = 200, protein = 11, carbs = 30, fat = 4  where name = 'Tur Dal';
update meals set calories = 180, protein = 11, carbs = 28, fat = 3  where name = 'Mung Dal';
update meals set calories = 380, protein = 16, carbs = 52, fat = 13 where name = 'Paneer Pulao';
update meals set calories = 260, protein = 16, carbs = 8,  fat = 18 where name = 'Paneer Bhurji';
update meals set calories = 180, protein = 4,  carbs = 28, fat = 6  where name = 'Idli Fry';
update meals set calories = 320, protein = 10, carbs = 45, fat = 12 where name = 'Hummus Wrap';
update meals set calories = 320, protein = 10, carbs = 54, fat = 8  where name = 'Pasta';
update meals set calories = 280, protein = 8,  carbs = 40, fat = 10 where name = 'Pasta Salad';
update meals set calories = 180, protein = 10, carbs = 26, fat = 4  where name = 'Kala Chana Salad';
update meals set calories = 190, protein = 11, carbs = 28, fat = 4  where name = 'Rajma Salad';
update meals set calories = 140, protein = 9,  carbs = 20, fat = 2  where name = 'Moong Salad';
update meals set calories = 160, protein = 10, carbs = 22, fat = 3  where name = 'Moong Chana Salad';
update meals set calories = 240, protein = 16, carbs = 24, fat = 9  where name = 'Chole Paneer Salad';
update meals set calories = 180, protein = 10, carbs = 26, fat = 4  where name = 'Chola Salad';

-- Step 2: Insert ~150 new cooked Indian dishes
insert into meals (name, calories, protein, carbs, fat, diet_tags, ingredients) values

-- Breakfast & Tiffin
('Masala Dosa',            230, 5,  38, 7,  array['vegetarian'],              array[]::text[]),
('Rava Dosa',              200, 5,  32, 6,  array['vegetarian'],              array[]::text[]),
('Set Dosa',               190, 5,  32, 5,  array['vegetarian'],              array[]::text[]),
('Pesarattu',              180, 9,  26, 4,  array['vegetarian','high-protein'],array[]::text[]),
('Rava Idli',              150, 5,  24, 4,  array['vegetarian','light'],      array[]::text[]),
('Medu Vada',              180, 6,  22, 8,  array['vegetarian'],              array[]::text[]),
('Aloo Paratha',           300, 7,  42, 12, array['vegetarian'],              array[]::text[]),
('Methi Paratha',          260, 7,  36, 10, array['vegetarian'],              array[]::text[]),
('Gobi Paratha',           280, 7,  40, 11, array['vegetarian'],              array[]::text[]),
('Plain Paratha',          250, 6,  35, 10, array['vegetarian'],              array[]::text[]),
('Besan Cheela',           200, 10, 25, 7,  array['vegetarian','high-protein'],array[]::text[]),
('Dhokla',                 150, 7,  24, 3,  array['vegetarian','light'],      array[]::text[]),
('Pongal',                 280, 8,  46, 8,  array['vegetarian'],              array[]::text[]),
('Vegetable Sandwich',     250, 8,  40, 7,  array['vegetarian'],              array[]::text[]),
('Paneer Sandwich',        320, 14, 40, 12, array['vegetarian','high-protein'],array[]::text[]),
('Idli (2 pieces)',        130, 4,  26, 1,  array['vegetarian','light'],      array[]::text[]),
('Akki Roti',              220, 5,  38, 5,  array['vegetarian'],              array[]::text[]),
('Thalipeeth',             220, 8,  32, 7,  array['vegetarian'],              array[]::text[]),

-- Dal & Lentil dishes
('Dal Tadka',              220, 11, 30, 7,  array['vegetarian','high-protein'],array[]::text[]),
('Masoor Dal',             200, 12, 30, 4,  array['vegetarian','high-protein'],array[]::text[]),
('Chana Dal',              240, 13, 35, 5,  array['vegetarian','high-protein'],array[]::text[]),
('Urad Dal',               220, 12, 32, 5,  array['vegetarian','high-protein'],array[]::text[]),
('Mixed Dal',              200, 12, 30, 4,  array['vegetarian','high-protein'],array[]::text[]),
('Panchmel Dal',           210, 12, 32, 5,  array['vegetarian','high-protein'],array[]::text[]),
('Lasooni Dal',            210, 11, 30, 6,  array['vegetarian','high-protein'],array[]::text[]),
('Moong Dal Tadka',        180, 11, 28, 3,  array['vegetarian','high-protein','light'],array[]::text[]),

-- Rice dishes
('Steamed Rice',           200, 4,  44, 1,  array['vegetarian'],              array[]::text[]),
('Jeera Rice',             220, 4,  44, 4,  array['vegetarian'],              array[]::text[]),
('Rajma Chawal',           400, 16, 68, 7,  array['vegetarian','high-protein'],array[]::text[]),
('Dal Rice',               350, 13, 62, 5,  array['vegetarian','high-protein'],array[]::text[]),
('Vegetable Pulao',        300, 7,  52, 8,  array['vegetarian'],              array[]::text[]),
('Khichdi',                280, 10, 48, 6,  array['vegetarian'],              array[]::text[]),
('Peas Pulao',             280, 8,  50, 6,  array['vegetarian'],              array[]::text[]),
('Vegetable Biryani',      380, 9,  60, 12, array['vegetarian'],              array[]::text[]),
('Paneer Fried Rice',      360, 15, 52, 11, array['vegetarian','high-protein'],array[]::text[]),
('Vegetable Fried Rice',   300, 7,  52, 8,  array['vegetarian'],              array[]::text[]),
('Lemon Rice',             260, 5,  48, 6,  array['vegetarian'],              array[]::text[]),
('Tamarind Rice',          280, 5,  50, 7,  array['vegetarian'],              array[]::text[]),
('Curd Rice',              240, 7,  40, 5,  array['vegetarian','light'],      array[]::text[]),
('Tomato Rice',            250, 5,  46, 6,  array['vegetarian'],              array[]::text[]),
('Coconut Rice',           290, 5,  48, 9,  array['vegetarian'],              array[]::text[]),
('Kadhi Chawal',           320, 9,  52, 8,  array['vegetarian'],              array[]::text[]),
('Bisi Bele Bath',         320, 10, 52, 8,  array['vegetarian'],              array[]::text[]),

-- Paneer dishes
('Palak Paneer',           280, 16, 14, 18, array['vegetarian','high-protein','low-carb'],array[]::text[]),
('Paneer Butter Masala',   340, 16, 18, 24, array['vegetarian','high-protein'],array[]::text[]),
('Shahi Paneer',           360, 16, 20, 26, array['vegetarian','high-protein'],array[]::text[]),
('Paneer Tikka',           240, 18, 8,  16, array['vegetarian','high-protein','low-carb'],array[]::text[]),
('Matar Paneer',           290, 16, 20, 18, array['vegetarian','high-protein'],array[]::text[]),
('Paneer Do Pyaza',        280, 15, 14, 20, array['vegetarian','high-protein','low-carb'],array[]::text[]),
('Paneer Lababdar',        330, 16, 16, 22, array['vegetarian','high-protein'],array[]::text[]),
('Paneer Korma',           360, 16, 18, 26, array['vegetarian','high-protein'],array[]::text[]),

-- Vegetable Sabzi
('Aloo Gobi',              180, 5,  28, 6,  array['vegetarian'],              array[]::text[]),
('Aloo Matar',             200, 5,  30, 7,  array['vegetarian'],              array[]::text[]),
('Aloo Methi',             210, 5,  30, 8,  array['vegetarian'],              array[]::text[]),
('Aloo Palak',             180, 5,  24, 7,  array['vegetarian'],              array[]::text[]),
('Mix Veg Sabzi',          150, 4,  18, 7,  array['vegetarian','light'],      array[]::text[]),
('Sarson Ka Saag',         160, 6,  16, 8,  array['vegetarian','low-carb'],   array[]::text[]),
('Capsicum Masala',        120, 3,  12, 7,  array['vegetarian','low-carb','light'],array[]::text[]),
('Karela Sabzi',           100, 3,  10, 5,  array['vegetarian','low-carb','light'],array[]::text[]),
('Tinda Sabzi',            90,  2,  11, 4,  array['vegetarian','low-carb','light'],array[]::text[]),
('Pumpkin Sabzi',          100, 2,  14, 4,  array['vegetarian','light'],      array[]::text[]),
('Tori/Ridge Gourd Sabzi', 90,  2,  12, 3,  array['vegetarian','light','low-carb'],array[]::text[]),
('Sem (Flat Beans) Sabzi', 110, 4,  14, 5,  array['vegetarian','light'],      array[]::text[]),
('Stuffed Capsicum',       200, 8,  18, 11, array['vegetarian'],              array[]::text[]),
('Dum Aloo',               220, 4,  30, 10, array['vegetarian'],              array[]::text[]),
('Matar Mushroom',         180, 7,  18, 9,  array['vegetarian','low-carb'],   array[]::text[]),
('Mushroom Masala',        160, 6,  14, 9,  array['vegetarian','low-carb'],   array[]::text[]),
('Soya Chunk Curry',       240, 20, 18, 9,  array['vegetarian','high-protein'],array[]::text[]),
('Vegetable Korma',        240, 6,  22, 14, array['vegetarian'],              array[]::text[]),
('Veg Kofta Curry',        280, 8,  22, 18, array['vegetarian'],              array[]::text[]),
('Kolhapuri Veg',          220, 6,  20, 13, array['vegetarian'],              array[]::text[]),
('Avial',                  160, 4,  16, 9,  array['vegetarian','light'],      array[]::text[]),
('Moong Dal Sabzi',        180, 10, 24, 5,  array['vegetarian','high-protein'],array[]::text[]),

-- Kadhi dishes
('Kadhi Pakora',           180, 6,  22, 8,  array['vegetarian'],              array[]::text[]),

-- Chana / Chole dishes
('Kala Chana Curry',       260, 13, 38, 5,  array['vegetarian','high-protein'],array[]::text[]),
('Chole Bhature',          480, 14, 62, 20, array['vegetarian'],              array[]::text[]),
('Chana Masala',           270, 13, 40, 7,  array['vegetarian','high-protein'],array[]::text[]),

-- Breads
('Chapati / Roti (1)',     100, 3,  18, 2,  array['vegetarian'],              array[]::text[]),
('Tandoori Roti (1)',      120, 4,  22, 2,  array['vegetarian'],              array[]::text[]),
('Puri (1)',               150, 3,  18, 8,  array['vegetarian'],              array[]::text[]),
('Bhatura (1)',            200, 5,  28, 8,  array['vegetarian'],              array[]::text[]),
('Naan (1)',               260, 8,  45, 6,  array['vegetarian'],              array[]::text[]),
('Missi Roti (1)',         140, 5,  22, 4,  array['vegetarian'],              array[]::text[]),
('Makki Ki Roti (1)',      150, 3,  28, 3,  array['vegetarian'],              array[]::text[]),

-- Snacks & street food
('Samosa (1)',             260, 5,  32, 13, array['vegetarian'],              array[]::text[]),
('Kachori (1)',            280, 6,  34, 14, array['vegetarian'],              array[]::text[]),
('Dahi Vada',              200, 8,  28, 6,  array['vegetarian'],              array[]::text[]),
('Aloo Tikki',             200, 4,  30, 8,  array['vegetarian'],              array[]::text[]),
('Pav Bhaji',              380, 9,  56, 14, array['vegetarian'],              array[]::text[]),
('Misal Pav',              380, 12, 56, 12, array['vegetarian'],              array[]::text[]),
('Chaat (Papdi)',          200, 6,  35, 5,  array['vegetarian'],              array[]::text[]),
('Vada Pav',               300, 7,  45, 10, array['vegetarian'],              array[]::text[]),
('Usal',                   200, 10, 28, 6,  array['vegetarian','high-protein'],array[]::text[]),

-- Noodles & Pasta
('Veg Hakka Noodles',      320, 8,  54, 8,  array['vegetarian'],              array[]::text[]),
('Pasta in Tomato Sauce',  320, 10, 52, 8,  array['vegetarian'],              array[]::text[]),

-- Raita & Salads
('Boondi Raita',           120, 5,  14, 5,  array['vegetarian','light'],      array[]::text[]),
('Mixed Veg Raita',        90,  4,  10, 3,  array['vegetarian','light'],      array[]::text[]),
('Cucumber Raita',         80,  4,  8,  3,  array['vegetarian','light'],      array[]::text[]),
('Mixed Sprout Salad',     160, 10, 22, 3,  array['vegetarian','high-protein','low-carb'],array[]::text[]),
('Fruit Chaat',            120, 2,  28, 1,  array['vegetarian','light'],      array[]::text[]),

-- South Indian specials
('Sambhar',                120, 5,  18, 3,  array['vegetarian','light'],      array[]::text[]),
('Rasam',                  60,  2,  10, 2,  array['vegetarian','light'],      array[]::text[]),
('Puliyogare',             280, 5,  50, 7,  array['vegetarian'],              array[]::text[]),
('Ven Pongal',             280, 8,  44, 9,  array['vegetarian'],              array[]::text[]),
('Kootu',                  140, 5,  16, 7,  array['vegetarian','light'],      array[]::text[]),

-- Rajasthani / Regional
('Dal Baati',              420, 14, 58, 16, array['vegetarian'],              array[]::text[]),
('Gatte Ki Sabzi',         240, 9,  26, 12, array['vegetarian'],              array[]::text[]),
('Pithla',                 180, 8,  22, 7,  array['vegetarian'],              array[]::text[]),
('Zunka',                  160, 7,  20, 6,  array['vegetarian'],              array[]::text[]),

-- Soups
('Tomato Soup',            80,  2,  12, 3,  array['vegetarian','light'],      array[]::text[]),
('Sweet Corn Soup',        120, 3,  22, 2,  array['vegetarian','light'],      array[]::text[]),
('Lentil Soup',            160, 9,  24, 3,  array['vegetarian','high-protein','light'],array[]::text[]),
('Palak Soup',             90,  4,  10, 3,  array['vegetarian','light'],      array[]::text[]),

-- Desserts (occasional)
('Kheer',                  220, 6,  36, 6,  array['vegetarian'],              array[]::text[]),
('Suji Halwa',             280, 5,  42, 11, array['vegetarian'],              array[]::text[]),
('Gajar Halwa',            260, 5,  38, 10, array['vegetarian'],              array[]::text[]);
