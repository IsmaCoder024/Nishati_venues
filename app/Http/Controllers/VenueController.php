<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;


use App\Models\User;
use App\Models\Venue;
use App\Models\Booking;
use Laravel\Pail\ValueObjects\Origin\Console;

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

        $venues = Venue::with('bookings')->get();

        return Inertia::render('User/BookingPage', [
            'venues' => $venues
        ]);

    }


        //return the intended venue clicked
    public function clicked($venueId){

        $venue = Venue::findOrFail($venueId);
        return inertia('User/BookSection', ['venue' => $venue]);

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

            $time_booked = Carbon::parse($request->time_booked);

            $end_time = $time_booked->copy()->addMinutes((int)$request->duration);


            $conflict = Booking::where('venue_id', $request->venue_id)
                            ->whereDate('date_booked', $request->date_booked)
                            ->whereTime('time_booked','<', $end_time)
                            ->whereTime('end_time', '>', $time_booked)
                            ->exists();

            if($conflict) {

                return back()->withErrors(['venue_id' => 'This venue is booked for the selected time']);

            }

            else {

            Booking::create([
                'venue_id' => $request->venue_id,
                'user_id' => auth()->id(),
                'participants' => $request->participants,
                'subject' => $request->subject,
                'date_booked' => $request->date_booked,
                'time_booked' => $time_booked->format('H:i'),
                'duration' => $request->duration,
                'end_time' => $end_time->format('H:i'),                    
            ]);

            return redirect()->route('display')->with('');

            }

        }
       
        
        
    }
    
}
