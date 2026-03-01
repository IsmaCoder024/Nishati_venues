import UserLayout from "../../Layouts/UserLayout.jsx";

import './VenueList.css';

import { router } from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function VenuesList({ venues }) {
    const { flash } = usePage().props;

    const [processing, setProcessing] = useState();

    const [showSection, setShowSection] = useState();

    const handleAction = (venueId) => {
        setShowSection((prev) => (prev === venueId ? null : venueId));
    };

    const handleEdit = (id) => {
        router.get(`/venuesList/${id}/edit`);
        setProcessing(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this venue?")) {
            setProcessing(true);
            router.delete(`/venuesList/${id}`);
        }
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div className="flash-success">
                {processing ? "Retrieving.." : ""}
            </div>

            <div>
                {flash.updateVenueSuccess && (
                    <div className="flash-success">
                        {flash.updateVenueSuccess}
                    </div>
                )}
            </div>

            <section className="venue-container">
                <table>
                    <tr>
                        <th>id</th>
                        <th>Venue name</th>
                        <th>Venue capacity</th>
                        <th>Location</th>
                        <th>Number of past bookings</th>
                        <th>Actions</th>
                    </tr>

                    {venues.map((venue) => (
                        <tr key={venue.id} className="">
                            <td>
                                <span className="record-0">{venue.id}</span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {venue.venue_name}
                                </span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {venue.venue_capacity}
                                </span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {venue.floor}-{venue.side}
                                </span>
                            </td>

                            <td>
                                <span className="record-1">
                                    {venue.bookings_count}
                                </span>
                            </td>

                            <td>
                                <div className="actions-group">
                                    <span className="record-3">
                                        <button
                                            onClick={() =>
                                                handleAction(venue.id)
                                            }
                                        >
                                            Action
                                        </button>
                                    </span>

                                    {showSection === venue.id && (
                                        <nav className="actions">
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleEdit(venue.id)
                                                    }
                                                >
                                                    Edit venue record
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(venue.id)
                                                    }
                                                >
                                                    Delete venue
                                                </button>
                                            </li>
                                        </nav>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </section>
        </UserLayout>
    );
}
