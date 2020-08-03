# Travel Planner Project
##### give you the forecasted weather for where you planned your next trip


This website is to help people in checking the new places that they going on trip to these places, it's ask the user to enter the city he want to go to it and deprat and arrive dates, after that the website will use Three API's, one to get the latitude and longitude it called Geonames API, second we have the WeatherBit API where it uses the lan and lon from the Geoname API to get the forcast and current weather data and the last API i have used, was the Pixabay API to get Images for the user destination.


##### In this Project, i have used the following Technologies:

- HTML
- CSS
- Vanilla JavaScript
- Node js
- express js
- Webpack
- Babel
- Service Workers

##### How to use it:

- open it on the Browser.
- fill the form(Destination City, Departing Date and Arriving Date)
- click on the pink button (Start).
- after getting you the data, it will give you preview before storing the data in the localStorage.
- click Save Trip on the Trip Preview dialog.
- Now, your Trip Card is on the slider.


##### How to setup:

1- after downloading the project, install all the Dependencies with  
`npm install` at the root of the project.

2- you can run `npm run start` for development mode, or `npm run build` in production mode, 
one of them need to be called to generate the **dist folder**.

3- after generating the **dist folder**, run `node run start` 
to start running the server app on **port 3000**.

4- now you can go to the browser using **port: 3000**, 
`http://localhost:3000`, it will open the project in the browser.


5- now, everything is ready to use the project, you just need to enter any 
city that you may want to visit.

###### The Extend Options / Ways to Stand Out [I have implemented four of them]:

- Add end date and display length of the trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow the user to remove the trip.
- Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.


