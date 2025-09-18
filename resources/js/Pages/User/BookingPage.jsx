import UserLayout from "../../Layouts/UserLayout.jsx";
import './BookingPage.css';
import './BookSection.css';
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";





export default function BookingPage({ venues }) {

        const handleClick = (venueId) => {

              // navigate to booking page with venue id
            router.visit(`/book/${venueId}`);

        };



    return (
        <>
            <UserLayout
            items={[
                        { label: "Home", href: "home"},
                        { label: "Logout", href: "logout"}
                    ]}
            >
                <div>

                    <section className="venue-container">

                        {venues.map((venue) => (

                            <div key={venue.id} className="venue-card">
                                    <h2>{venue.venue_name}</h2>
                                    <p>Capacity :<span className="capacity"> {venue.venue_capacity}</span></p>
                                    <p>Status : {
                                                venue.is_booked ? <span className="booked">Booked</span>
                                                : <span className="available">Available</span>
                                                }
                                    </p>


                                    {
                                        venue.is_booked

                                        ? <>
                                                <p className="notAvailable">
                                                        Not available
                                                </p>

                                                {venue.bookings.map((booking) => (
                                                        <p key={booking.id}>
                                                            <p className="endTime">Available from {booking.end_time}</p>
                                                        </p>
                                                        )
                                                )}
                                                
                                            </>
                                        : 
                                        <button 
                                            onClick={() => handleClick(venue.id)} 
                                        className="book-btn" 
                                        >
                                            Book
                                        </button>
                                    }
                                    

                            </div>
                        ))}

                    </section>
                </div>
            </UserLayout>
        </>
    );
}