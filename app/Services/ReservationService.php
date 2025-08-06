<?php

namespace App\Services;

use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationService
{
    public function createReservation(array $validated, ?string $remark = null): Reservation
    {   
        return Reservation::create([
            'user_id'           => Auth::id(),
            'meeting_room_id'   => $validated['meeting_room_id'],
            'purpose'           => $validated['reason'],
            'title'             => $validated['title'],
            'remark'            => $remark ?? '',
            'start_time'        => $validated['start_time'],
            'end_time'          => $validated['end_time'],
        ]);
    }
}
