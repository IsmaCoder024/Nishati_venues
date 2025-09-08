import UserLayout from "../../Layouts/UserLayout.jsx";
import './BookingPage.css';
import './BookSection.css';
import { useState } from "react";
import { useForm } from "@inertiajs/react";


export function BookSection({ venueId }) {

const { data, setData, post, reset } = useForm({
    participants: "",
    subject: "",
    date_booked: "",
    time_booked: "",
    duration: "",
    venue_id: venueId,
  });


  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData(name, type === "checkbox" ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/book", {
      
      onSuccess: () => {
        alert("Meeting reserved successfully!");
        reset();
      },

      onError: (errors) => {
        console.log(errors);
      },

    });

  };

  return (
    <div className="meeting-container">
      <h2>Event Information</h2>
      <form onSubmit={ handleSubmit } className="meeting-form">
        
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
            name="duration"
            value={data.duration}
            onChange={handleChange}
          >
            <option value="">Select Time</option>
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="120">2 Hours</option>
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
        </div>

        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="time_booked"
            value={data.time_booked}
            onChange={handleChange}
          />
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

        <div className="form-check">
          <input
            type="checkbox"
            name="sendInvitation"
            checked={data.sendInvitation}
            onChange={handleChange}
          />
          <label>Get a confirmation email(Optional)</label>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}



export default function BookingPage({ venues }) {
        const [showSection, setShowSection] = useState(null); // will store the ID of the open venue

        const handleClick = (venueId) => {
            setShowSection(prev => prev === venueId? null : venueId);
            // if same venue clicked → hide, else show new one

        };


            //handle changes of book buutton
        // const btn = document.querySelector(".book-btn");

        //  btn.addEventListener("click", function (){

        //     if (btn.textContent === "Book") {
        //         btn.textContent = "Close";
        //         btn.style.background = "red"
        //     } else {
        //         btn.textContent = "Book";    
        //     }
        // });

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
                                    <p>Status :<span className="status"> {venue.is_booked ? "Booked" : "Available"}</span></p>

                                    <button 
                                        onClick={() => handleClick(venue.id)} 
                                        className="book-btn" 
                                    >
                                        Book
                                    </button>

                                    {
                                        
                                    }
        
                                    {showSection === venue.id && (
                                        venue.is_booked
                                        ? <h1 className="status-not">Not available</h1>
                                        : <BookSection venueId={ venue.id} />
                                    )}

                            </div>
                        ))}

                    </section>
                </div>
            </UserLayout>
        </>
    );
}