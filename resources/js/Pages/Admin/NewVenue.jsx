import './NewVenue.css';
import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react"

export default function NewVenue(){

    const {data, setData, post, processing} = useForm({
        venue_name:'',
        venue_capacity:'',
        floor:'',
        side:'',
    })

     const submit = (e) => {
        e.preventDefault();
        post(('/new'));

    };

    return (
        <>
        <form onSubmit={submit}>
            
            <div>
            <label for="venue_name">Venue name:</label>
            <input
                type="text"
                name="venue_name"
                value={data.venue_name}
                onChange={ (e) => setData('venue_name' , e.target.value)}
                placeholder = "Enter the venue's name"
            />
            </div>

            <div>
            <label for="venue_capacity">Venue capacity:</label>
            <input
                type="number"
                name="venue_capacity"
                value={data.venue_capacity}
                onChange={ (e) => setData('venue_capacity' , e.target.value)}
            />
            </div>

            <div>
            <label for="floor">Floor :</label>
            <input
                type="number"
                name="floor"
                value={data.floor}
                onChange={ (e) => setData('floor' , e.target.value)}
            />

            <div>
            <label for="side">Side :  </label>
            
            Left
            <input
                type="radio"
                name="side"
                value="left"
                onChange={ (e) => setData('side' , e.target.value)}
            />

            Right
            <input
                type="radio"
                name="side"
                value="right"
                onChange={ (e) => setData('side' , e.target.value)}
            />

            <br></br>

            <button type='submit'>Add</button>
            </div>
            </div>

        </form>
        </>
    )
}