# Network - A Personal Network Tracker
## UCLA CS 130 - Winter 2021

[![Build Status](https://www.travis-ci.com/cs130-w21/4.svg?branch=master)](https://www.travis-ci.com/cs130-w21/4)

Login Page             |  Homepage
------------           |  ------------
<img src="https://user-images.githubusercontent.com/46983549/110195573-f3286300-7df2-11eb-8a88-c10179760504.png" width="500" height="330"> | <img src="https://user-images.githubusercontent.com/46983549/110195561-e3108380-7df2-11eb-95c7-00a3db09afbd.png" width="500" height="330">


### Overview
This repository houses our web application created for our capstone project. It was done using a React JS frontend, a Node JS backend, and a MongoDB database. You can view the application at: [Network - A Personal Network Tracker](https://my-personal-network.herokuapp.com/)


### How to build
There are threee methods of building this application: by script, manually, and automatically; we deployed our application with [Heroku](https://heroku.com/) and utilze [Travis CI](https://www.travis-ci.com/) to automatically deploy after it passes our unit tests, which will be explained shortly. 

#### Recommended local build
If you wish to save yourself some effort you can use the shell script "build.sh" (found in the main folder of this repository) to start the application via an IDE or CLI. All you need to do is ensure you are in the main folder, type ```./build.sh```, and you should see a message stating "Node.js server is running on port 4001." And you're done!

#### Second option for local build
If you wish to manually build and run the application via IDE or CLI you can take the following steps:
* Ensure you are in the repository (/4)
* In the main folder, type ```node app.js``` in the command line. This will start the server via ```localhost:4001``` in your browser.
* Navigate to the "frontend" folder, then type ```npm run build``` in the command line. This will create an optimized build of the frontend files.
  * If you only wish to develop within the frontend directory without re-building every change you can simply type the command ```npm start``` in the command line. If you do this, you do not need to re-start the server. 
* Open your browser and type ```localhost:4001``` in the search bar and press enter. You should see the application up and running. <br>

Common errors occuring during the build process can be solved in the following steps:
* In the main folder, type ```rm -rf /node_modules``` in the command line.
* Then type ```rm package-lock.json``` (DO NOT DELETE ```package.json```!)
* Finally type ```npm install```. This will update the depedencies and will likely solve compilation problems.

#### Recommended deployment build
If you wish to build the code automatically all you need to do is either commit code to the repository and a  [Travis CI](https://www.travis-ci.com/) build will start automatically; should the code pass our pre-defined unit tests, then the code will be deployed thanks to the deployment components of the .travis.yml file. If you do not have code to commit then you can navigate to Travis CI, and given you have access to the repository, you will be able to restart the build and the process will then be the same as stated previously.


 


### Code Authors:
Erynn Phan<br/>
Gabriella Long<br/>
Kian Nizrad<br/>
Matt Dalton<br/>
Saumya Dedhia<br/>
Summer Farren

