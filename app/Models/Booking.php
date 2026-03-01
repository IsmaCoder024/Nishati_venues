<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //

    protected $fillable = [
        'venue_id',
        'user_id',
        'participants',
        'subject',
        'date_booked',
        'time_booked',
        'duration',
        'end_time',
    ];

    public function venue(){
        return $this->belongsTo(Venue::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getTimeEndAttribute()
    {
        return Carbon::parse($this->time_booked)
                    ->addMinutes($this->duration)
                    ->format('H:i');

    }

}
