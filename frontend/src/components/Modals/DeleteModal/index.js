import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import { deleteOldEvent, fetchApiDraftEvents } from '../../../store/event';

function DeleteModal({eventId, published}) {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [showModal, setShowModal] = useState(false);
        const sessionUser = useSelector((state) => state?.session?.user);
        const handleDelete = (e) => {
            e.preventDefault();
            dispatch(deleteOldEvent(eventId, published));
            setShowModal(false)
        }

        return (
            <>
                <button className='delete_btn' onClick={() => setShowModal(true)}>Delete</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h3>Do you confirm to delete this event?</h3>
                        <div className='delete_confirm_container'>
                            <button className="button_submit button button_cancel " onClick={() => setShowModal(false)}>Cancel</button>
                            <form  onSubmit={handleDelete}>
                                <button className="button_submit buttton_confirm"type="submit">Confirm</button>
                            </form>
                        </div>
                    </Modal>
                )}
            </>
        )
}

export default DeleteModal
