# Leadership-Board-App

Leadership-Board-App is an application which will help keep a track of rankings
by department, books.

Requirements :

1. Popular department - It will show last week winner and top 5 department ranking, department
   ranking will update every day
2. Popular Books - Here librarian has to show books ranking for
   (i) Weekly popular
   (ii) Monthly Popular
   (iii) Today Trending (will update every one hour)

Technologies used : Javascript, Node js, Express js and postgresQL

# Working

1. Book download data - Here using the book download logs API with which we can capture each download with timestamp
   which will help us in accumulating the data.

2. Book Rankings - every hour a cron is being run to take cumulative data of daily, weekly, monthly downloads
   from download logs.

3. Department Rankings - every hour a cron is being run to take cumulative data of weekly and fresh downloads by department
   from download logs.

# How to use

Just clone the repository, make sure to create database using ./lms.sql script and to run use 'node index.js'
To run APIs use leadership-board-app.postman_collection.json and import in postman.
