import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




import './AddEvent.css'

function AddEvent() {
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
