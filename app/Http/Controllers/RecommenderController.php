<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RecommenderController extends Controller
{
    //
    public function index(){
        return Inertia::render('/User/Recommendation');
    }


}
