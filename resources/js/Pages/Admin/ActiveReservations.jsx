import UserLayout from "../../Layouts/UserLayout.jsx";
import { router } from "@inertiajs/react";
import './ActiveReservations.css';


export default function ActiveReservations({ bookings }) {

    

    const handleDelete = (id) => {
        if(confirm('Are you sure you want to delete this booking?')) {
            router.delete(`/reservations/${id}`);
        }
    };

    const handleEdit = (id) => {
        router.get(`/reservations/${id}/edit`);
    };

    return (
        <UserLayout
            items={[
                { label: "Home", href: "home"},
            ]}
        >
            <div className="bookings-container">
                { bookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                        <h1>{booking.venue?.venue_name}</h1>
                        <p>Subject : <span className="field-display">{booking.subject}</span> </p>
                        <p>Participants : <span className="field-display">{booking.participants}</span> </p>
                        <p>Duration : <span className="field-display">{booking.duration} mins</span> </p>
                        <p>Start at : <span className="field-display">{booking.time_booked}</span> </p>
                        <p>Finish at : <span className="field-display">{booking.end_time}</span> </p>
                        <p>Booked by : <span className="field-display">{booking.user?.firstName} {booking.user?.lastName}</span> </p>
                        
                        <div className="buttons">
                            <button onClick={() => handleDelete(booking.id)}>Remove reservation</button>
                            <button onClick={() => handleEdit(booking.id)}>Edit reservation</button>
                        </div>
                    </div>
                ))}
            </div>
        </UserLayout>
    );
}
