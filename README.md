## Welcome to my project TickTech

TichTech is inspired by meetup and eventbrite. It is a Tech-Events app for technical industry networking. It allows users to post, like, attend events and make connections in the technical world.

Please checkout live link: https://tick-tech.herokuapp.com/

![](https://res.cloudinary.com/dprnsux1z/image/upload/v1646243188/WX20220302-091308_2x_s2xzki.png)

## Technologies & Tools Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>

## Set Up
### Node modules installing
  - Backend: Under backend folder run: `npm install`
  - Fronted: Under fronted folder run: `npm install`


### Database setting up
  - Create a user
    - Under psql: `CREATE USER <user> WITH PASSWORD '<password>' CREATEDB`
  - Create .env file
    - Copy .env-example into your own .env file
    - Add values based on the file
  - Create the database as following:
    - `npx dotenv sequelize db:create`
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`

### Start to travel
  - Run `npm start` both under frontend and backend folder
  - Ready to go

## Features

