<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;


class Venue extends Model
{
    //
    protected $fillable = [
        'venue_name',
        'venue_capacity',
        'floor',
        'side'

    ];

    protected $appends = ['is_booked'];



    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getIsBookedAttribute()
    {
        $now = Carbon::now();

        return $this->bookings()
            ->whereDate('date_booked',$now->toDateString())
            ->whereTime('time_booked', '<=', $now->toTimeString())
            ->whereTime('end_time', '>=', $now->toTimeString())
            ->exists();
    }
    
    
}
