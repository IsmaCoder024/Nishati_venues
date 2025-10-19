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
        $users = User::withCount('bookings')->get();

        return Inertia::render('Admin/UsersList', [
            'users' => $users
        ]);
    }

    //Delete User
    public function deleteUser($userId){

        $user = User::findOrFail($userId);

        $user->delete();
    }

    // display selected user
    public function editUser($userId){

        $user = User::findOrFail($userId);
        return Inertia::render('Admin/EditUser',[
            'user' => $user
        ]);

    } 


    //update selected user

    public function updateUser(Request $request, $userId){

        $request->validate([
            'firstName' => 'required|string|max:20',
            'lastName'=> 'required|string|max:20',
            'email'=> 'required|string|email|max:30',
            'chequeNo' => 'required|string|max:30',
        ]);

        $user = User::findOrFail($userId);
        $user->update($request->all(), [
            'firstName'=>$request->firstName,
            'lastName'=>$request->lastName,
            'email'=>$request->email,
            'chequeNo'=>$request->chequeNo,
        ]);

        return redirect()->route('usersList')->with('success', 'User info updated.');

    }

    //display reservations made
    public function reservations(){

        $bookings = Booking::with(['venue', 'user'])->get();
        

        return Inertia::render('Admin/ActiveReservations', [
            'bookings' => $bookings
        ]);
    }

    //delete reservations
    public function deleteReservation($bookingId){

        $booking = Booking::findOrFail($bookingId);
        
        $booking->delete();
        

        return back()->with('success', 'Reservation removed');
    }

     //display selected reservation
    public function editReservation($bookingId){

        $booking = Booking::with('venue')->findOrFail($bookingId);
        return Inertia::render('Admin/EditReservation',[
            'booking' => $booking
        ]);
    }

    //update selected reseravation
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
