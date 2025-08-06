<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'purpose',
        'meeting_room_id',
        'start_time',
        'end_time',
        'remark',
    ];
}
