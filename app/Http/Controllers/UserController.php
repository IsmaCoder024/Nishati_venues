<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Pail\ValueObjects\Origin\Console;


class UserController extends Controller
{
    //
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
            ->with('error','Check your inputs and try again.');
        }


        User::create([
            'firstName'=>$request->firstName,
            'lastName'=>$request->lastName,
            'email'=>$request->email,
            'chequeNo'=>$request->chequeNo,
            'password'=>Hash::make($request->password),

        ]);

        return redirect()->route('login');

    }

    public function login(Request $request, User $user){

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::user();

            if ($user->role == 'admin') {

                return redirect()->route('admin');

            } else {

                return redirect()->route('display');

            }
            

        } else {
            
            return redirect()->back()->with('','');
        }

    }




}
