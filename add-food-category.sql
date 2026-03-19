-- Add food_category column
alter table meals add column if not exists food_category text default 'other';

-- BASE: roti, rice, bread — forms the base of a meal
update meals set food_category = 'base' where name in (
  'Chapati / Roti (1)','Tandoori Roti (1)','Naan (1)','Puri (1)','Bhatura (1)',
  'Missi Roti (1)','Makki Ki Roti (1)','Plain Paratha','Aloo Paratha',
  'Methi Paratha','Gobi Paratha','Paneer Paratha','Akki Roti','Thalipeeth',
  'Steamed Rice','Jeera Rice','Missi Roti (1)'
);

-- CURRY: sabzi and paneer dishes — needs a base
update meals set food_category = 'curry' where name in (
  'Palak Paneer','Palak Paneer + Roti','Kadai Paneer','Paneer Butter Masala',
  'Shahi Paneer','Matar Paneer','Paneer Do Pyaza','Paneer Lababdar','Paneer Korma',
  'Paneer Bhurji','Aloo Gobi','Aloo Matar','Aloo Methi','Aloo Palak','Dum Aloo',
  'Mix Veg Sabzi','Sarson Ka Saag','Capsicum Masala','Karela Sabzi','Tinda Sabzi',
  'Pumpkin Sabzi','Sem (Flat Beans) Sabzi','Tori/Ridge Gourd Sabzi','Ghiya Sabzi',
  'Bhindi','Baingan Bharta','Matar Mushroom','Mushroom Masala','Soya Chunk Curry',
  'Vegetable Korma','Veg Kofta Curry','Kolhapuri Veg','Stuffed Capsicum',
  'Avial','Kootu','Gatte Ki Sabzi','Moong Dal Sabzi','Pithla','Zunka','Usal'
);

-- DAL: lentil dishes — goes well with base + curry
update meals set food_category = 'dal' where name in (
  'Dal Makhni','Dal Tadka','Moong Dal','Mung Dal','Masoor Dal','Chana Dal',
  'Urad Dal','Tur Dal','Mixed Dal','Panchmel Dal','Lasooni Dal','Moong Dal Tadka',
  'Rajma','Chole','Kala Chana Curry','Chana Masala','Kadhi Pakora','Kadi',
  'Sambhar','Rasam'
);

-- STANDALONE: complete meals on their own — do NOT pair with curry
update meals set food_category = 'standalone' where name in (
  'Dal Makhni + Roti','Moong Dal + Ghiya/Tori Sabzi','Palak Paneer + Roti',
  'Chole Chawal + Hummus','Kadhi + Mix Veg Sabzi + Roti','Bhindi Tur Dal Rice',
  'Rajma Chawal','Dal Rice','Peas Pulao','Vegetable Pulao','Paneer Pulao',
  'Khichdi','Vegetable Biryani','Paneer Fried Rice','Vegetable Fried Rice',
  'Lemon Rice','Tamarind Rice','Curd Rice','Tomato Rice','Coconut Rice',
  'Bisi Bele Bath','Puliyogare','Dal Baati','Chole Bhature','Pav Bhaji',
  'Veg Hakka Noodles','Pasta','Pasta in Tomato Sauce','Pasta Salad',
  'Misal Pav','Kadhi Chawal',
  'Idli Sambar','Masala Dosa','Dosa','Rava Dosa','Set Dosa',
  'Idli (2 pieces)','Rava Idli','Pesarattu','Pongal','Ven Pongal',
  'Vegetable Poha','Poha','Upma','Sevaiyan','Suji Uttapam','Sabudana Khichdi',
  'Muesli','Paneer Cheela','Moong Paneer Chilla','Besan Cheela','Appe (Vegetable)',
  'Dhokla','Thalipeeth','Bhelpuri','Aloo Tikki'
);

-- SALAD / RAITA: light accompaniment to any meal
update meals set food_category = 'salad' where name in (
  'Kala Chana Salad','Rajma Salad','Moong Salad','Moong Chana Salad',
  'Chole Paneer Salad','Chola Salad','Mixed Sprout Salad','Fruit Chaat'
);

update meals set food_category = 'raita' where name in (
  'Boondi Raita','Mixed Veg Raita','Cucumber Raita'
);

-- SNACK
update meals set food_category = 'snack' where name in (
  'Samosa (1)','Kachori (1)','Dahi Vada','Chaat (Papdi)','Vada Pav',
  'Idli Fry','Hummus Wrap','Aloo Sandwich','Vegetable Sandwich','Paneer Sandwich',
  'Paneer Tikka','Medu Vada'
);

-- SOUP
update meals set food_category = 'soup' where name in (
  'Tomato Soup','Sweet Corn Soup','Lentil Soup','Palak Soup','Rasam'
);

-- verify
select food_category, count(*) from meals group by food_category order by count desc;
