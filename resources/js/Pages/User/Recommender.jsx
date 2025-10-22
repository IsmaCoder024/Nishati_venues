import UserLayout from "../../Layouts/UserLayout.jsx";
import "./Recommender.css";

import {useForm } from '@inertiajs/react';

export default function Recommend() {

    const { data, setData, post, processing, reset } = useForm ({

    })
    return (
        <UserLayout>
            <div>
                <p>Hello,
                    I am here to suggest to you possible venue to book basing on your needs,<br/> Should we get started? 
                </p>
                <button onClick={''}>Sure</button>
            </div>

            <p>I am going to request some information to guide my recomendation, starting with;<br/></p>
            <p>You are booking a venue for</p>
            <select>
                <option>Meeting</option>
                <option>Presentation</option>
                <option>Other</option>
            </select>

            <p>When will your event take place?</p>
            <input type="date"></input>

            <p>At what time?</p>
            <input type="time"></input>

            <p>what is the number of attendants you are expecting</p>
            <input type="number"></input><br/><br/>

            <button>Recommend</button>
        </UserLayout>
    );
}
