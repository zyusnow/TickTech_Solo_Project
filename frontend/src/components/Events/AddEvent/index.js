import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchApiTypes } from "../../../store/type";

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
    const [virtual, setVirtual] = useState(false);
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
            const newVenue = {
                name: venueName ? venueName : null,
                address: venueAddress ? venueAddress : null,
                city: venueCity ? venueCity : null,
                state: venueState ? venueState : null,
                zip: venueZipCode ? venueZipCode : null,
                published: published
            }
        }
        const newEvent = {
            name,
            date,
            capacity,
            
        }


    }

    return (
        <>
            <div id="main2">
                <div className="add_title">Create an event</div>
                <div className='add_info'>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</div>
                <div id='add_container'>

                </div>
            </div>
        </>
    )
}

export default AddEvent
