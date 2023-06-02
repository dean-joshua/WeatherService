# WeatherService

This is a web service developed by me(Joshua Dean) for a coding assessment. The challenge was to:

- Build a node application that pulls weather from an free weather api. It should save the result to a JSON file on the local system, and give the user the ability to remove entries.
  Bonus points for dependency injection (how to persist the data, abstracting out api endpoits). Experience is up to you. (UI, rest api, etc)

I decided on creating a REST api with Swagger documentation.

## What you'll need

- A preferred code editor
- Node installed on your system
- A free [weatherstack.com](https://weatherstack.com/) account so you can get an API KEY

## How to use

- Download the repository through your preferred means
- Navigate to the directory that you just downloaded and run `npm install` to install all the dependencies needed for this project
- Create a `.env` file and add your api key e.g `API_KEY=[YOUR API KEY]`
- In your terminal, run the command `npm start`, navigate to `localhost:3000/api-docs` in your browser, and you should see the swagger documentation page
- Test the routes to your hearts content(you get 250 calls per month with the free weatherstack tier)

## GET Route

- The get route makes use of our Weather API service and accepts a zip code in the request body and returns a json response to the user containing weather data while also saving the json object locally in a file called `weather.json`. Through the saveandUpdateFile function found in our Weather API service we check if a file exists already and if it does we also check if an object with a matching zip code exists in the file. If there is a matching zipcode, we replace it with this most recent call. We don't want duplicates because our free version of weatherstack only gives us access to the most current weather data.

## DELETE route

- The delete route also takes advantage of our Weather API service and accepts a zipcode in the request body, goes to our `weather.json` file, and then deletes an object with the matching zip code. Because we don't allow duplicates(thanks to our get route), only one object should be removed from the file.

## Dependency Injection

- This was a great opportunity for me to learn more about dependency injection. I had heard about it a few times in the last year and did some reading but never had many opportunities to put it into practice. In this application, I make use of it by creating a Weather API class. This class is where all interactions with our API endpoint lives. In this way, I can completely change what weather api I am working with without changing anything in my routes or controllers.
