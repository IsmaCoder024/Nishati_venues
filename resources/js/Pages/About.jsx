import UserLayout from "../Layouts/UserLayout.jsx";

import "./About.css";
import bookNow from "../images/book now-popular picks.png";
import VenueReservation from "../images/venue-reservation.png";
import successReserved from "../images/successReserved.png";

export default function About() {
    return (
        <UserLayout>
            <div className="page-container">
                <section className="card-container">
                    <h1>Overview.</h1>
                    <p>
                        A web-based application for organisation staffs
                        developed for reserving Conference rooms, to be used in
                        variety of activities.
                    </p>
                </section>

                <section className="card-container">
                    <h1>Support and Compatibility.</h1>
                    <p>
                        Designed to work efficient and interactively in all
                        varieties of computing devices (laptops, desktops,
                        tablets and mobile phones) and Operating Systems.
                    </p>
                </section>

                <section className="card-container">
                    <h1>Functionality.</h1>
                    <p>
                        <b>"Nishati-Venues"</b> allows Users to reserve a
                        Conference room through the following steps;
                        <div className="steps-container">
                            <li>
                                From the site homepage click on the button{" "}
                                <i>"Book now"</i>.
                                <br />
                                You may also book a confrence room from{" "}
                                <i>"Popular picks"</i> section on the homepage,
                                if it is among the choices.
                            </li>
                            <img src={bookNow} />
                        </div>
                        <div className="steps-container">
                            <li>
                                On clicking <i>"Book now",</i> display page will
                                appear. Click <i>"Book"</i> to choose the
                                confrence room which is available and you need
                                to reserve.
                            </li>
                        </div>
                        <div className="steps-container">
                            <li>
                                A page for venue reservation will appear, where
                                you will have to fill all the information about
                                the reservation, then <i>"Submit"</i>.
                            </li>
                            <img src={VenueReservation} />
                        </div>

                        <div className="steps-container">
                            <li>
                                After a successfull booking, a success flash message will appear on the top.
                            </li>
                            <img src={successReserved} />
                        </div>
                    </p>
                </section>
            </div>
        </UserLayout>
    );
}
