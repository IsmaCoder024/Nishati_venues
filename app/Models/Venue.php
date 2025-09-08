<?php

namespace App\Models;

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
        return $this->bookings()->exists();
    }
    
}
