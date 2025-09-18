import UserLayout from "../../Layouts/UserLayout.jsx";

import './EditReservation.css';

import { useForm } from "@inertiajs/react";

export default function EditReseravtion({ booking }){

    const { data, setData, put, processing } = useForm({

        participants: booking.participants || '',
        subject: booking.subject || '',
        date_booked: booking.date_booked || '',
        time_booked: booking.time_booked || '',
        duration: booking.duration || '',

    });
 
    const handleSubmit = (e) => {

        e.preventDefault();
        put(`/reservations/${booking.id}`, data, {

            //I haven't handle this properly
            onSuccess: () => alert('Updated successfully')

        });

    };


    return (
        <UserLayout
            items={[
                { label: "Home", href: "home"},
                { label: "Logout", href: "logout"}
            ]}    
        >
            <div className="edit-container">
                <h1>Edit Reservation</h1>

                <form onSubmit={ handleSubmit } className="edit-form">
                    
                    <div className="form-group">
                        <label>
                            Participants :
                            <input
                                type="text"
                                value={data.participants}
                                onChange={e => setData('participants', e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Subject : 
                            <input
                                type="text"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-date-group">
                        <label>
                            Date booked :
                            <input
                                type="date"
                                value={data.date_booked}
                                onChange={e => setData('date_booked', e.target.value)}
                            />
                        </label>

                    
                        <label>
                            Time booked :
                            <input
                                type="time"
                                value={data.time_booked}
                                onChange={e => setData('time_booked', e.target.value)}
                            />
                        </label>
                    
                    </div>

                    

                    <div className="form-group">
                    <label>
                        Duration:
                        <input
                            type="text"
                            value={data.duration}
                            onChange={e => setData('duration', e.target.value)}
                        />
                    </label>
                    </div>

                    <button type="submit" disabled={processing} className="update-btn">Update Booking</button>

                </form>
            </div>
        </UserLayout>
    )
}