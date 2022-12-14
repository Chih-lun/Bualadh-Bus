# Bualadh-Bus

## Introduction

A collaborative project to provide travel time information via a public transport application for Dublin Bus users. To be completed in fulfillment of the UCD MSc Computer Science (Conversion) Summer Research Practicum.

## How to setup devlopment environment
- Activate backend
1. cd to app/django
2. run command "pip install -r requirements.txt" to install the required modules
3. run command "python manage.py runserver" to initialize backend server
- Activate frontend
1. cd to app/react/frontend
2. run command "npm install" to install the required modules
3. run command "npm start" to initialize frontend server

Once the instructions in the above are initialized, the application for development is ready to run.

## Run this app using docker
1. Modify app/react/frontend/src/Home/Home.js and app/react/frontend/src/Timetables/Timetable.js. Since the port number in the URL for HTTP requests can encounter issues with Nginx when using docker, there are 4 places (2 in Home.js and 2 in Timetable.js) to revise. To be more specific, all the code with "http://127.0.0.1:8000/" should be replaced by "http://127.0.0.1/". Home.js lines [35, 60, 104] and Timetables.js lines [23, 35] are affected.
2. cd to app
3. run command "docker-compose up" to build the required images and modules

When the docker is composed up, the application is ready to serve. However, shut down the application is by command "ctrl+C" if necessary.
