import UserLayout from "../../Layouts/UserLayout.jsx";
import "./NewVenue.css";

import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function NewVenue() {
    const { flash } = usePage().props;

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
            <div>
                {flash.venueError && (
                    <div className="flash-error">{flash.venueError}</div>
                )}
            </div>

            <div className="form-container">
                <form className="form" onSubmit={submit}>
                    <div className="form-input">
                        <label for="venue_name">
                            Venue name :
                            <input
                                type="text"
                                name="venue_name"
                                value={data.venue_name}
                                onChange={(e) =>
                                    setData("venue_name", e.target.value)
                                }
                                placeholder="Enter the venue's name"
                            />
                        </label>
                    </div>

                    <div className="form-input">
                        <label for="venue_capacity">
                            Venue capacity :
                            <input
                                type="number"
                                name="venue_capacity"
                                min="1"
                                value={data.venue_capacity}
                                onChange={(e) =>
                                    setData("venue_capacity", e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="form-input">
                        <label for="floor">
                            Floor :
                            <input
                                type="number"
                                name="floor"
                                min="ground"
                                value={data.floor}
                                onChange={(e) =>
                                    setData("floor", e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="form-input">
                        <label for="side">
                            Side :
                            <span className="radio-buttons">
                                Left
                                <input
                                    type="radio"
                                    name="side"
                                    value="Left"
                                    onChange={(e) =>
                                        setData("side", e.target.value)
                                    }
                                />
                                Right
                                <input
                                    type="radio"
                                    name="side"
                                    value="Right"
                                    onChange={(e) =>
                                        setData("side", e.target.value)
                                    }
                                />

                                Centre
                                <input
                                    type="radio"
                                    name="side"
                                    value="Centre"
                                    onChange={(e) =>
                                        setData("side", e.target.value)
                                    }
                                />
                            </span>
                        </label>
                    </div>
                    <button className="submit" type="submit">
                        Add
                    </button>
                </form>
            </div>
        </UserLayout>
    );
}
