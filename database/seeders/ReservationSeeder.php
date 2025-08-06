<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reservations')->insert([
            [
                'user_id' => 1,
                'meeting_room_id' => 1,
                'start_time' => Carbon::parse('2025-08-07 09:00:00'),
                'end_time' => Carbon::parse('2025-08-07 10:00:00'),
                'purpose' => 'Team Standup Meeting',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'meeting_room_id' => 2,
                'start_time' => Carbon::parse('2025-08-08 14:00:00'),
                'end_time' => Carbon::parse('2025-08-08 15:30:00'),
                'purpose' => 'Client Presentation',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
