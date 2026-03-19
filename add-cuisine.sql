-- Step 1: Add new columns
alter table meals add column if not exists cuisine text default 'North Indian';
alter table meals add column if not exists fiber decimal(6,2);

-- Step 2: Tag all meals by cuisine

-- North Indian
update meals set cuisine = 'North Indian' where name in (
  'Vegetable Poha','Poha','Dal Makhni','Dal Makhni + Roti','Dal Tadka','Moong Dal',
  'Mung Dal','Masoor Dal','Chana Dal','Urad Dal','Tur Dal','Mixed Dal','Panchmel Dal',
  'Lasooni Dal','Moong Dal Tadka','Moong Dal + Ghiya/Tori Sabzi',
  'Rajma','Rajma Chawal','Rajma Salad',
  'Chole','Chole Chawal + Hummus','Chole Bhature','Chana Masala','Kala Chana Curry',
  'Kala Chana Salad','Chola Salad',
  'Palak Paneer','Palak Paneer + Roti','Paneer Butter Masala','Kadai Paneer',
  'Shahi Paneer','Matar Paneer','Paneer Do Pyaza','Paneer Lababdar','Paneer Korma',
  'Paneer Bhurji','Paneer Pulao','Paneer Tikka','Paneer Cheela','Moong Paneer Chilla',
  'Paneer Paratha','Paneer Sandwich','Paneer Fried Rice',
  'Aloo Gobi','Aloo Matar','Aloo Methi','Aloo Palak','Aloo Paratha','Aloo Tikki',
  'Dum Aloo','Stuffed Capsicum','Capsicum Masala','Karela Sabzi','Tinda Sabzi',
  'Pumpkin Sabzi','Sem (Flat Beans) Sabzi','Mix Veg Sabzi','Mix Veg Sabzi',
  'Tori/Ridge Gourd Sabzi','Ghiya Sabzi','Bhindi','Bhindi Masala','Bhindi Tur Dal Rice',
  'Baingan Bharta','Matar Mushroom','Mushroom Masala','Sarson Ka Saag',
  'Kadhi Pakora','Kadi','Kadhi + Mix Veg Sabzi + Roti','Kadhi Chawal',
  'Jeera Rice','Steamed Rice','Peas Pulao','Vegetable Pulao','Khichdi',
  'Dal Rice','Vegetable Biryani',
  'Chapati / Roti (1)','Tandoori Roti (1)','Puri (1)','Bhatura (1)','Naan (1)',
  'Missi Roti (1)','Makki Ki Roti (1)','Plain Paratha','Methi Paratha','Gobi Paratha',
  'Samosa (1)','Kachori (1)','Dahi Vada','Pav Bhaji','Chaat (Papdi)','Vada Pav',
  'Aloo Sandwich','Vegetable Sandwich','Hummus Wrap',
  'Moong Chana Salad','Moong Salad','Chole Paneer Salad',
  'Boondi Raita','Mixed Veg Raita','Cucumber Raita','Mixed Sprout Salad','Fruit Chaat',
  'Soya Chunk Curry','Veg Kofta Curry','Vegetable Korma','Moong Dal Sabzi',
  'Tomato Soup','Sweet Corn Soup','Lentil Soup','Palak Soup',
  'Kheer','Suji Halwa','Gajar Halwa',
  'Moong Chana Salad'
);

-- Rajasthani
update meals set cuisine = 'Rajasthani' where name in (
  'Dal Baati','Gatte Ki Sabzi','Pithla','Ker Sangri'
);

-- South Indian
update meals set cuisine = 'South Indian' where name in (
  'Dosa','Masala Dosa','Rava Dosa','Set Dosa','Pesarattu',
  'Idli Sambar','Idli (2 pieces)','Idli Fry','Rava Idli',
  'Medu Vada','Appe (Vegetable)',
  'Sambhar','Rasam','Puliyogare','Ven Pongal','Pongal','Kootu','Avial',
  'Bisi Bele Bath','Akki Roti','Coconut Rice','Tamarind Rice','Lemon Rice',
  'Tomato Rice','Curd Rice'
);

-- Maharashtrian
update meals set cuisine = 'Maharashtrian' where name in (
  'Thalipeeth','Misal Pav','Usal','Zunka','Bhelpuri','Sabudana Khichdi'
);

-- Gujarati
update meals set cuisine = 'Gujarati' where name in (
  'Dhokla','Suji Uttapam','Besan Cheela','Kadhi Chawal'
);

-- Indo-Chinese
update meals set cuisine = 'Indo-Chinese' where name in (
  'Veg Hakka Noodles','Vegetable Fried Rice','Paneer Fried Rice'
);

-- Italian
update meals set cuisine = 'Italian' where name in (
  'Pasta','Pasta Salad','Pasta in Tomato Sauce'
);

-- Punjabi
update meals set cuisine = 'Punjabi' where name in (
  'Chole Bhature','Sarson Ka Saag','Makki Ki Roti (1)','Lassi'
);

-- Street Food
update meals set cuisine = 'Street Food' where name in (
  'Bhelpuri','Pav Bhaji','Vada Pav','Chaat (Papdi)','Aloo Tikki',
  'Samosa (1)','Kachori (1)','Dahi Vada','Misal Pav'
);

-- Continental / Healthy
update meals set cuisine = 'Continental' where name in (
  'Muesli','Vegetable Sandwich','Paneer Sandwich','Fruit Chaat',
  'Mixed Sprout Salad','Tomato Soup','Sweet Corn Soup','Lentil Soup','Palak Soup'
);

-- Verify results
select cuisine, count(*) as total
from meals
group by cuisine
order by total desc;
