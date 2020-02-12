# Reoz App - Backend

This is the backend repository for the Reoz Game app.


## How to use it
At this moment there is no customization available for the application launch. You can start the server with `npm start` which will start the server ith nodemon (there is no build / production mode yet).

## What it does
It actually sets up two servers:
- A 'traditional' web server used to initialize the application for the client(s) and receive actions from it
- A websocket used by the server to regularly send events to the client(s) such as shop's stock reinitialization

- It is able to receive client connection requests and attribute a web token to each, to retrieve a user's data if they are able to give the token at each request.
- It sets up some starting data for each client : 1 creature and a shop

## What it can't do
- Handle client actions for the moment (so there is not really anything to do in the app yet)