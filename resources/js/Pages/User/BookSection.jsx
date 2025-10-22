import UserLayout from "../../Layouts/UserLayout.jsx";
import "./BookSection.css";
import { useForm, usePage } from "@inertiajs/react";

export default function BookSection({ venue }) {
    const { flash } = usePage().props;

    const { data, setData, post, reset } = useForm({
        participants: "",
        subject: "",
        date_booked: "",
        time_booked: "",
        duration: "",
        venue_id: venue.id,
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setData(name, type === "checkbox" ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/book/store", {
            onSuccess: () => {
                alert("Venue reserved successfully!");
                reset();
            },

            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <UserLayout items={[{ label: "Home", href: "home" }]}>
            <div>
                {flash.bookError && (
                    <div className="flash-error">{flash.bookError}</div>
                )}
            </div>

                <div>
                {flash.bookTimeError && (
                    <div className="flash-error">{flash.bookTimeError}</div>
                )}
            </div>
            <div className="meeting-container">
                <h2>Event Information</h2>
                <form onSubmit={handleSubmit} className="meeting-form">
                    <div className="form-group">
                        <label>Number of Participants (Average)</label>
                        <input
                            type="number"
                            name="participants"
                            value={data.participants}
                            onChange={handleChange}
                            placeholder="Participants"
                            max="300"
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Duration</label>
                        <select
                            type="number"
                            name="duration"
                            value={data.duration}
                            onChange={handleChange}
                        >
                            <option value="">Select Time</option>
                            <option value="30">30 Minutes</option>
                            <option value="60">1 Hour</option>
                            <option value="90">1:30 Hours</option>
                            <option value="120">2 Hours</option>
                            <option value="150">2:30 Hours</option>
                            <option value="180">3 Hours</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Event Date</label>
                        <input
                            type="date"
                            name="date_booked"
                            value={data.date_booked}
                            onChange={handleChange}
                        />
                        <small>*Month-Date-Year</small>
                    </div>

                    <div className="form-group">
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="time_booked"
                            value={data.time_booked}
                            onChange={handleChange}
                        />
                        <small>*Hour:Min PM/AM</small>
                    </div>

                    <div className="form-group full-width">
                        <label>Subject (Title/Theme)</label>
                        <input
                            type="text"
                            name="subject"
                            value={data.subject}
                            onChange={handleChange}
                            placeholder="Enter title or theme"
                            maxLength="100"
                        />
                    </div>

                    {/* <div className="form-check">
                    <input
                        type="checkbox"
                        name="sendInvitation"
                        checked={data.sendInvitation}
                        onChange={handleChange}
                    />
                    <label>Get a confirmation email(Optional)</label>
                </div> */}

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </UserLayout>
    );
}
