## Web Scraper - Craigslist

Full stack app that will scrape Craigslist searching for Macbooks. The application will calculate median values for Airs and Pros and alert me via email if the deal is good and worth looking at. Cronjob is set up to scrape data every 30 minutes and email me if needed. 

Purpose for this app was to practice TypeScript, get more comfortable with building a full stack application and get familiar with setting up cronjob while creating a potential for me to snag a Macbook for myself or for me to resell for profit.

## Tech in use

* TypeScript
* ReactJS
* Node.Js / Express
* Axios/Cheerio
* Tailwind / DaisyUI
* PostgreSQL
* Crontab
* Nodemailer


## Stretch Items

* Make frontend basically an input app to add more filtering words or settings as cronjob is taking care of going through the listings, analyizing the price and emailing me of any worthy deals
* Refactor fetching/scraping logic 
* Make the email (ejs template) pretty and more user friendly
