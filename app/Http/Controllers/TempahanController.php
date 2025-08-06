<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Room;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Services\ReservationService;

class TempahanController extends Controller
{   
    protected $reservationService;

    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    public function index()
    {
        $rooms = Room::all(); // or Room::paginate(10), etc.
        $reservations = Reservation::with('room','user')->get();

        return Inertia::render('daftar-tempahan', [
            'rooms' => $rooms,
            'reservations' => $reservations,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'             => ['required'],
            'reason'            => ['required'],
            'meeting_room_id'   => ['required'],
            'start_time'        => ['required', 'date'],
            'end_time'          => ['required', 'date', 'after_or_equal:start_time'],
        ],
        [
            'title.required'            => 'Sila isi tajuk / perkara',
            'reason.required'           => 'Sila isi agenda',
            'meeting_room_id.required'  => 'Sila pilih bilik mesyuarat',
            'remark.required'           => 'Sila masukkan catatan',
            'start_time.required'       => 'Sila masukkan tarikh dan masa mula',
            'end_time.required'         => 'Sila masukkan tarikh dan masa tamat',
        ]);

        $this->reservationService->createReservation($validated, $request->input('remark'));
        return to_route('daftar-tempahan')->with('success', 'Leave request submitted successfully.');
    }

    // public function reservationCalendar()
    // {
        // $reservations = Reservation::with('room')->get();

        // return Inertia::render('calendar', [
        //     'reservations' => $reservations
        // ]);

        // return Inertia::render('calendar', [
        //     'events' => $reservations->map(function ($reservation) {
        //         return [
        //             'id' => $reservation->id,
        //             'title' => $reservation->title . ' - ' . $reservation->room->name,
        //             'start' => $reservation->start_time,
        //             'end' => $reservation->end_time,
        //             'room' => $reservation->room->name,
        //         ];
        //     }),
        // ]);
    // }
}
