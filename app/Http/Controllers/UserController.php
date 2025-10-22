<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Pail\ValueObjects\Origin\Console;


class UserController extends Controller
{
    //
    public function homepage(){

        $venues = Venue::withCount('bookings')
                        ->orderBy('bookings_count', 'desc')
                        ->take(3)
                        ->get();

        return Inertia::render('User/Homepage', [
            'venues' => $venues
        ]
    );  

    }

    public function create(Request $request,User $user){
        $validator = validator($request->all(),[
            'firstName'=> 'required|string|max:20',
            'lastName'=> 'required|string|max:20',
            'email'=> 'required|string|email|max:30|unique:users,email',
            'chequeNo' => 'required|string|max:30',
            'password'=>'required|string|max:16|min:8|confirmed'
        ]);

        if ($validator->fails()){
            return redirect()->back()
            ->withErrors($validator)
            ->withInput()
            ->with('registerError','Check your inputs and try again.');
        }

 
        User::create([
            'firstName'=>$request->firstName,
            'lastName'=>$request->lastName,
            'email'=>$request->email,
            'chequeNo'=>$request->chequeNo,
            'password'=>Hash::make($request->password),

        ]);

        return redirect()->route('login')->with('registerSuccess', "Registration complete.Log in to your account");

    }

    public function login(Request $request){

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            //Regenerate session for security
            $request->session()->regenerate();            

            $user = Auth::user();

            if ($user->role == 'admin') {

                return redirect()->route('admin')->with('logSuccess', 'Logged in');

            } else {

                return redirect()->route('display')->with('logSuccess', 'Logged in');

            }
            

        } else {
            
            return redirect()->back()->with('logError','Failed. Please check your credentials')->onlyInput('email');
        }

    }


    public function logout(){
        Auth::logout();

        //destroy current session data
        request()->session()->invalidate();

        //regenerate a new CSRF token
        request()->session()->regenerateToken();

        return redirect()->route('home');
    }




}
