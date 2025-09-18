<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Booking;
use App\Models\User;
use App\Models\Venue;

class AdminController extends Controller
{


    //diplay users list
    public function usersList(){
        $users = User::all();

        return Inertia::render('Admin/UsersList', [
            'users' => $users
        ]);
    }

    //display reservations made
    public function reservations(){

        $bookings = Booking::with('venue')->get();  

        return Inertia::render('Admin/ActiveReservations', [
            'bookings' => $bookings
        ]);
    }

    //delete reservations
    public function handleDelete($bookingId){

        $booking = Booking::findOrFail($bookingId);
        
        $booking->delete();
        

        return back()->with('success', 'Reservation removed');
    }

     //display reservations page
    public function editReservation($bookingId){

        $booking = Booking::with('venue')->findOrFail($bookingId);
        return Inertia::render('Admin/EditReservation',[
            'booking' => $booking
        ]);
    }

    //update selected reseravtion
    public function updateReservation(Request $request, $bookingId){
        
        $request->validate([
            'participants' => 'integer',
            'subject' => 'string|max:100',
            'date_booked' => 'date|after_or_equal:today',
            'time_booked' => '',
            'duration' => 'required|integer',
        ]);

        $booking = Booking::findOrFail($bookingId);
        $booking->update($request->all());

        return redirect()->route('reservations')->with('success', 'Booking updated.');
    }

}
