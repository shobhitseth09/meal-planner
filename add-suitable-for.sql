-- Step 1: Add suitable_for column to meals
alter table meals add column if not exists suitable_for text[] default array['breakfast','lunch','dinner','snack'];

-- Step 2: Tag meals by when they are appropriate

-- Breakfast only
update meals set suitable_for = array['breakfast'] where name in (
  'Vegetable Poha','Poha','Dosa','Masala Dosa','Rava Dosa','Set Dosa','Pesarattu',
  'Idli Sambar','Idli (2 pieces)','Rava Idli','Appe (Vegetable)',
  'Muesli','Upma','Sevaiyan','Suji Uttapam','Sabudana Khichdi',
  'Paneer Cheela','Moong Paneer Chilla','Besan Cheela',
  'Aloo Paratha','Methi Paratha','Gobi Paratha','Plain Paratha','Paneer Paratha',
  'Thalipeeth','Akki Roti','Pongal','Ven Pongal','Dhokla'
);

-- Lunch & Dinner
update meals set suitable_for = array['lunch','dinner'] where name in (
  'Dal Makhni','Dal Makhni + Roti','Dal Tadka','Moong Dal','Mung Dal','Masoor Dal',
  'Chana Dal','Urad Dal','Tur Dal','Mixed Dal','Panchmel Dal','Lasooni Dal',
  'Moong Dal Tadka','Moong Dal + Ghiya/Tori Sabzi','Moong Dal Sabzi',
  'Rajma','Rajma Chawal','Chole','Chole Chawal + Hummus','Chole Bhature','Chana Masala',
  'Kala Chana Curry',
  'Palak Paneer','Palak Paneer + Roti','Paneer Butter Masala','Kadai Paneer',
  'Shahi Paneer','Matar Paneer','Paneer Do Pyaza','Paneer Lababdar','Paneer Korma',
  'Paneer Bhurji','Paneer Pulao','Paneer Fried Rice',
  'Aloo Gobi','Aloo Matar','Aloo Methi','Aloo Palak','Dum Aloo',
  'Mix Veg Sabzi','Sarson Ka Saag','Capsicum Masala','Karela Sabzi','Tinda Sabzi',
  'Pumpkin Sabzi','Sem (Flat Beans) Sabzi','Tori/Ridge Gourd Sabzi','Ghiya Sabzi',
  'Bhindi','Bhindi Tur Dal Rice','Baingan Bharta','Matar Mushroom','Mushroom Masala',
  'Soya Chunk Curry','Vegetable Korma','Veg Kofta Curry','Kolhapuri Veg','Avial',
  'Kadhi Pakora','Kadi','Kadhi + Mix Veg Sabzi + Roti','Kadhi Chawal',
  'Steamed Rice','Jeera Rice','Rajma Chawal','Dal Rice','Vegetable Pulao','Khichdi',
  'Peas Pulao','Vegetable Biryani','Lemon Rice','Tamarind Rice','Curd Rice',
  'Tomato Rice','Coconut Rice','Bisi Bele Bath','Puliyogare',
  'Chapati / Roti (1)','Tandoori Roti (1)','Puri (1)','Bhatura (1)','Naan (1)',
  'Missi Roti (1)','Makki Ki Roti (1)',
  'Pav Bhaji','Chole Bhature','Dal Baati','Gatte Ki Sabzi','Misal Pav',
  'Veg Hakka Noodles','Pasta','Pasta in Tomato Sauce','Stuffed Capsicum',
  'Kootu','Sambhar'
);

-- Snacks only
update meals set suitable_for = array['snack'] where name in (
  'Bhelpuri','Aloo Tikki','Samosa (1)','Kachori (1)','Dahi Vada',
  'Chaat (Papdi)','Vada Pav','Dhokla','Idli Fry','Medu Vada',
  'Hummus Wrap','Aloo Sandwich','Vegetable Sandwich','Paneer Sandwich',
  'Fruit Chaat','Usal','Pithla','Zunka',
  'Boondi Raita','Mixed Veg Raita','Cucumber Raita',
  'Tomato Soup','Sweet Corn Soup','Lentil Soup','Palak Soup'
);

-- Salads — good for lunch, dinner, snack
update meals set suitable_for = array['lunch','dinner','snack'] where name in (
  'Pasta Salad','Kala Chana Salad','Rajma Salad','Moong Salad',
  'Moong Chana Salad','Chole Paneer Salad','Chola Salad','Mixed Sprout Salad'
);

-- Paneer Tikka — snack or starter for lunch/dinner
update meals set suitable_for = array['lunch','dinner','snack'] where name = 'Paneer Tikka';

-- Step 3: Allow multiple items per meal slot
-- Drop old unique constraint and add ordering
alter table meal_plan drop constraint if exists meal_plan_plan_date_meal_type_key;
alter table meal_plan add column if not exists item_order integer default 0;
