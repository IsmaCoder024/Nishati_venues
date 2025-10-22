import UserLayout from "../../Layouts/UserLayout.jsx";

import './EditVenue.css'

import { useForm, usePage } from "@inertiajs/react";

export default function EditVenue({ venue }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing } = useForm({
        venue_name: venue.venue_name || "",
        venue_capacity: venue.venue_capacity || "",
        floor: venue.floor || "",
        side: venue.side || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/venuesList/${venue.id}`, data);
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div>
                {flash.updateVenueError && (
                    <div className="flash-error">{flash.updateVenueError}</div>
                )}
            </div>

            <div className="edit-container">
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>
                            Venue name :
                            <input
                                type="text"
                                value={data.venue_name}
                                onChange={(e) =>
                                    setData("venue_name", e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Venue capacity :
                            <input
                                type="number"
                                value={data.venue_capacity}
                                onChange={(e) =>
                                    setData("venue_capacity", e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Floor :
                            <input
                                type="number"
                                value={data.floor}
                                onChange={(e) =>
                                    setData("floor", e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="update-btn"
                    >
                        {processing ? "Updating" : "Update venue info"}
                    </button>
                </form>
            </div>
        </UserLayout>
    );
}
