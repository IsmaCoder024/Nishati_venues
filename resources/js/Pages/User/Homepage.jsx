import "./Homepage.css";
import UserLayout from "../../Layouts/UserLayout.jsx";
import { Link } from "@inertiajs/react";
import React from "react";
import { usePage } from '@inertiajs/react';

export default function Homepage() {

    const { venues } = usePage().props

    return (
        <>
            <UserLayout
                items={[
                    { label: "Login", href: "login" },
                    { label: "Profile", href: "" },
                    { label: "Contacts", href: "" },
                    { label: "About", href: "" },
                ]}
                showLogout= {false}
            >
                <div className="landing-page">
                    {/* Hero Section */}
                    <header className="hero">
                        <div className="overlay">
                            <h1>A web application for venue booking</h1>
                            <p>
                                Book and make a venue available for your event
                            </p>

                            <a href={(route = "display")}>
                                <button className="cta-btn">Book Now</button>
                            </a>

                            <button className="cta-btn">
                                Get Recommendation
                            </button>
                        </div>
                    </header>

                    {/* Services Section */}
                    <section className="services">
                        <div className="cardHead">
                            <p>Popular picks</p>
                        </div>

                        <div className="cards">

                        {venues.map((venue) => (
                            <div key={ venue.id} className="card">
                                <img
                                    src="https://via.placeholder.com/300x180"
                                    alt="Conference Room"
                                />
                                <h3>{venue.venue_name}</h3>
                                <p>
                                    Occupies {venue.venue_capacity} people
                                </p>
                                <a href={( route='display')}><button className="card-btn">Book</button></a>
                            </div>

                        ))}
                        
                            
                        
                            {/* <div className="card">
                                <img
                                    src="https://via.placeholder.com/300x180"
                                    alt="Spa"
                                />
                                <h3>Spa</h3>
                                <p>
                                    Relax and rejuvenate with our premium spa
                                    services.
                                </p>
                                <button className="card-btn">Book</button>
                            </div>

                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/300x180"
                                    alt="Pool"
                                />
                                <h3>Swimming Pool</h3>
                                <p>
                                    Refresh and recharge in our Olympic size
                                    swimming pool.
                                </p>
                                <button className="card-btn">Book</button>
                            </div>
                         */}
                         </div>
                    </section>
                </div>
            </UserLayout>
        </>
    );
}
