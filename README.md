
This app is written with Angular framwork using openweather api for simulating a weather indication around the world

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

In order to run the application you first need to build the docker image from within the project directory:
```
docker build -t weather-app .
```

Then, run the container (I used port 8080 but you can change it if needed):
```
docker run -p 8080:80 weather-app
```

You can access it from the browser via:
`http://localhost:8080` 

 
 ### Without Docker

 In order to run the application without Docker, directly on your host, you just need to run the following:
```
npm install
npm start
```
The client should now run locally on port 4200.
You can access it from the browser via: `http://localhost:4200`



### API
I used 'https://openweathermap.org/api/' api to display the required data.

## Extras
- Themes will be replaced using css variables by clicking on the left side gif  in navbar.
- I Dockerized the application.
- I made the website responsive as possible with the time limits - also for mobile device.
- I used a toastr for presenting messages and erros. 
