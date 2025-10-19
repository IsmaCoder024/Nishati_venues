import UserLayout from "../../Layouts/UserLayout.jsx";
import "./NewVenue.css";

import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function NewVenue() {
    const { data, setData, post, processing } = useForm({
        venue_name: "",
        venue_capacity: "",
        floor: "",
        side: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/new");
    };

    return (
        <UserLayout>
            <div className="form-container">
                <form className="form" onSubmit={submit}>
                    <div className="form-input">
                        <label for="venue_name">Venue name:</label>
                        <input
                            type="text"
                            name="venue_name"
                            value={data.venue_name}
                            onChange={(e) =>
                                setData("venue_name", e.target.value)
                            }
                            placeholder="Enter the venue's name"
                        />
                    </div>

                    <div className="form-input">
                        <label for="venue_capacity">Venue capacity:</label>
                        <input
                            type="number"
                            name="venue_capacity"
                            value={data.venue_capacity}
                            onChange={(e) =>
                                setData("venue_capacity", e.target.value)
                            }
                        />
                    </div>

                    <div className="form-input">
                        <label for="floor">Floor :</label>
                        <input
                            type="number"
                            name="floor"
                            value={data.floor}
                            onChange={(e) => setData("floor", e.target.value)}
                        />
                    </div>

                    <div className="form-input">
                        <label for="side">Side : </label>
                        Left
                        <input
                            type="radio"
                            name="side"
                            value="left"
                            onChange={(e) => setData("side", e.target.value)}
                        />
                        Right
                        <input
                            type="radio"
                            name="side"
                            value="right"
                            onChange={(e) => setData("side", e.target.value)}
                        />
                        <br></br>
                    </div>
                    <button  className="submit" type="submit">Add</button>
                </form>
            </div>
        </UserLayout>
    );
}
