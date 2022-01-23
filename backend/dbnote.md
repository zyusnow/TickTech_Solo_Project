- drop database ticktech_db;

Create database
- npx dotenv sequelize db:create

Create model
- npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
- npx dotenv sequelize db:migrate

Create seeder
- npx sequelize seed:generate --name <seedfilename>
- npx dotenv sequelize db:seed:all


npx sequelize model:generate --name Event --attributes

npx sequelize model:generate --name Venue --attributes name:string,address:string,city:string,state:string,zipCode:string
npx sequelize model:generate --name Type --attributes name:string
npx sequelize model:generate --name Like --attributes userId:integer,eventId:integer
npx sequelize model:generate --name Register --attributes userId:integer,eventId:integer
