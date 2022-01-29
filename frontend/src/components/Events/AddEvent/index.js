import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../../../store/event";
import { fetchApiTypes } from "../../../store/type";
import { addNewVenue } from "../../../store/venue";


import './AddEvent.css'

function AddEvent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const types = useSelector(state => state.type.types);
    const typesArr = Object.values(types)

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState('');
    const [virtual, setVirtual] = useState("");
    const [virtualUrl, setVirtualUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [published, setPublished] = useState(true);
    const [type, setType] = useState("");
    const [venueName, setVenueName] = useState("");
    const [venueAddress, setVenueAddress] = useState("");
    const [venueCity, setVenueCity] = useState("");
    const [venueState, setVenueState] = useState("");
    const [venueZipCode, setVenueZipCode] = useState("");
    const [venueErrors, setVenueErrors] = useState([]);
    const [eventErrors, setEventErrors] = useState([]);

    useEffect(() => {
        dispatch(fetchApiTypes());
    }, [dispatch]);

    useEffect(()=> {
        if (!sessionUser) {
            navigate('/login')
        }
    },[])

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (virtual === false) {
            var venueId;
            const newVenue = {
                name: venueName ? venueName : null,
                address: venueAddress ? venueAddress : null,
                city: venueCity ? venueCity : null,
                state: venueState ? venueState : null,
                zip: venueZipCode ? venueZipCode : null,
                published: published
            }

            let errVenue = [];
            const  data = await dispatch(addNewVenue(newVenue, published))
            venueId = data.id
            if (data.venueErrors) { // if data has errors inside
                const errList = Object.values(data.venueErrors)  // get values from obj
                const flatErrList = [...errList];  // flat
                flatErrList.map(each => errVenue.push(each.msg))  // make it in an array
                setVenueErrors(errVenue)  // right now get errors
            }
        }

        const newEvent = {
            name,
            date,
            capacity,
            description,
            virtual,
            virtualUrl: virtualUrl ? virtualUrl : null,
            imgUrl,
            published,
            typeId:type,
            venueId
        }

        let errEvent = [];
        const data2 = await dispatch(addEvent(newEvent))
        if (data2.eventErrors) { // if data has errors inside
            const errList2 = Object.values(data2.eventErrors)  // get values from obj
            const flatErrList2 = [...errList2];  // flat
            flatErrList2.map(each => errEvent.push(each.msg))  // make it in an array
            setEventErrors(errEvent)  // right now get errors
          } else {
            if (published) navigate(`/events/${data2.id}`);
            else navigate('/events');
          }
    }

    return (
        <>
            <div id="main2">
                <div className="add_title">Create an event</div>
                <div className='add_info'>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</div>
                <div id='add_container'>
                    <form className='login_form' onSubmit={handleSubmit}>
                    <ul>
                        {venueErrors.concat(eventErrors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div>
                        <label htmlFor='name'>Event Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            name='name'
                        />
                        <label htmlFor='date'>Event Time:</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            name='date'
                        />
                        <label htmlFor='type'>Event Type</label>
                        <select
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required>
                            <option value=''>Select</option>
                            {typesArr.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        <label htmlFor='capacity'>Capacity:</label>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                            name='capacity'
                        />
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            name='description'
                        />
                        <label htmlFor='imgUrl'>Image Link</label>
                        <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            required
                            name='imgUrl'
                        />
                        <label htmlFor='virtual'>Location:</label>
                        <input
                            name='virtual'
                            type='radio'
                            value='false'
                            checked={virtual === false}
                            onChange={(e) => setVirtual(false)}
                        /> Venue
                        <input
                            name='virtual'
                            type='radio'
                            value='true'
                            checked={virtual === true}
                            onChange={(e) => setVirtual(true)}
                        /> Online Event
                    </div>
                    {virtual && (
                        <div>
                            <label htmlFor='virtualUrl'>Online Link</label>
                            <input
                                type="text"
                                value={virtualUrl}
                                name="virtualUrl"
                                onChange={(e) => setVirtualUrl(e.target.value)}
                            />
                        </div>

                    )}
                    {!virtual && (
                        <div>
                            <label htmlFor='venueName'>Venue Name:</label>
                            <input
                                type="text"
                                name='venueName'
                                value={venueName}
                                onChange={(e) => setVenueName(e.target.value)}
                            />
                            <label htmlFor='venueAddress'>Address:</label>
                            <input
                                type="text"
                                name='venueAddress'
                                value={venueAddress}
                                onChange={(e) => setVenueAddress(e.target.value)}
                            />
                            <label htmlFor='venueCity'>City:</label>
                            <input
                                type="text"
                                name="venueCity"
                                value={venueCity}
                                onChange={(e) => setVenueCity(e.target.value)}
                            />
                            <label htmlFor='venueState'>State:</label>
                            <input
                                type="text"
                                name="venueState"
                                value={venueState}
                                onChange={(e) => setVenueState(e.target.value)}
                            />
                            <label htmlFor='venueZipCode'>Zip Code:</label>
                            <input
                                type="text"
                                name="venueZipCode"
                                value={venueZipCode}
                                onChange={(e) => setVenueZipCode(e.target.value)}
                            />
                            


                        </div>

                    )}




                    </form>
                </div>
            </div>
        </>
    )
}

export default AddEvent
