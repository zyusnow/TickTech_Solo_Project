# Welcome to my project TickTech

**TichTech** is inspired by meetup and eventbrite. It is a Tech-Events app for technical industry networking. It allows users to post, like, attend events and make connections in the technical world.

Please checkout live link: https://tick-tech.herokuapp.com/

![](https://res.cloudinary.com/dprnsux1z/image/upload/v1646243188/WX20220302-091308_2x_s2xzki.png)


# Technologies & Tools Used
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>



# Implementation

TickTech was built with frontend using **React** and **Redux** ultilizing **RESTful** convention as the frontend routes structure. The **HTML** and **CSS** were written from entirely scratch and used no external libraries. 

For the backend side, the application was using **Javascript** with framework **Express**, **Node.js**, **Sequelize** integrated **PostgreSQL** for database management. Other libraries and packages include bcrypt.js, express-validator, and csurf. Created a services layer for streamlined database queries and implemented server-side request validation and user authentication. 

## Technical Insights

To create a new event, TickTech allows user to make it in different angles:
  -  **Published event** or **Drafted event**
  -  **Online event** or **offline event** 
  -  **Event category**: talk or seminar, meeting or networking, job fair, conference, etc.
  -  **Event detailed info**: event description, url or location, date, image.


On the **backend**, a more comprehensive set of validation checks were performed by express-validator based on different angles of events. Drafted events allowed missing values as null to send to the database compared with published events. A virtual event and an offline event required **separate data validation checks**. Here is how the frontend and backend interacted:

For the **frontend**:
```const handleSubmit = async(e) => {
        e.preventDefault();
        let venueId;
        if (virtual === false) {
            const newVenue = {
                name: venueName ? venueName : null,
                address: venueAddress ? venueAddress : null,
                city: venueCity ? venueCity : null,
                state: venueState ? venueState : null,
                zipCode: venueZipCode ? venueZipCode : null,
                published: published
            }

            let errVenue = [];
            const  data = await dispatch(addNewVenue(newVenue, published))
            const errors = data.errors;
            venueId = data.id
            if (errors) { // if data has errors inside
                const errList = Object.values(errors)  // get values from obj
                const flatErrList = [...errList];  // flat
                flatErrList.map(each => errVenue.push(each.msg))  // make it in an array
                setVenueErrors(errVenue)  // right now get errors
                // venueHasError = true;
            }
        }
        const newEvent = {
            name: name ? name : 'draft event',
            date: date ? date: null,
            capacity:capacity ? capacity : null,
            description: description ? description : null,
            virtual: virtual,
            virtualUrl: virtualUrl ? virtualUrl : null,
            imgUrl: imgUrl ? imgUrl : null,
            published,
            typeId:typeId ? +typeId : null,
            venueId: venueId ? +venueId : null,
        }


        let errEvent = [];
        const data2 = await dispatch(addEvent(newEvent))
        const errors2 = data2.errors;
        if (errors2) { // if data has errors inside
            // venueHasError === true
            const errList2 = Object.values(errors2)  // get values from obj
            const flatErrList2 = [...errList2];  // flat
            flatErrList2.map(each => errEvent.push(each.msg))  // make it in an array
            setEventErrors(errEvent)  // right now get errors
          } else {
            if (published) navigate(`/events/${data2.id}`);
            else navigate('/events');
          }
    }
  ```
For the **backend**:
```
router.post('/add', requireAuth, validateEvent, asyncHandler(async (req, res) => {

    const { id } = req.user;
    const { name, date, capacity, description, virtual, virtualUrl, imgUrl, published, venueId, typeId} = req.body;

    const validateErrors = validationResult(req);
    if (validateErrors.isEmpty()) {
        const event = await Event.create({
            name,
            date,
            capacity,
            description,
            virtual,
            virtualUrl,
            imgUrl,
            published,
            venueId,
            typeId,
            hostId: id
        });
        res.json(event);
    }
    else {
        return res.json(validateErrors)
    }
}));
```


## Guide to Set Up
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
