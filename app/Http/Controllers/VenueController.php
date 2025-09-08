<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Venue;
use App\Models\Booking;

class VenueController extends Controller
{
    //
        //creates a venue    
    public function create(Request $request){
        $validator = validator($request->all(),[
            'venue_name' => 'required|string|max:30',
            'venue_capacity' => 'required|integer|min:1',
            'floor' => 'required|integer|min:0',
            'side' => 'required',

        ]);

        if ($validator->fails()){
            return redirect()->back()
            ->withErrors($validator)
            ->withInput()
            ->with('error','Invalid inputs');
        }

        else {

            Venue::create([
                'venue_name' => $request->venue_name,
                'venue_capacity' => $request->venue_capacity,
                'floor' => $request->floor,
                'side' => $request->side,
            ]);

        }

        return redirect()->route('admin');

    }

        //displays available venues
    public function display(){

        $venues = Venue::all();

        return Inertia::render('User/BookingPage', [
            'venues' => $venues
        ]);

    }

        //creates a booking
    public function book(Request $request){

        $validator = validator( $request->all(), [
            'venue_id' => 'required|exists:venues,id',
            'participants' => 'required|integer',
            'subject' => 'required|string|max:100',
            'date_booked' => 'required|date|after_or_equal:today',
            'time_booked' => 'required',
            'duration' => 'required|integer',

        ]);

        if ($validator->fails()){
            return redirect()->back()
                            ->withErrors("")
                            ->with("");
        }
        else {
            Booking::create([
                'venue_id' => $request->venue_id,
                'participants' => $request->participants,
                'subject' => $request->subject,
                'date_booked' => $request->date_booked,
                'time_booked' => $request->time_booked,
                'duration' => $request->duration,
            ]);

            return redirect()->route('admin');
        }

    }
}
