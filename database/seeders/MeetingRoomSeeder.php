<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeetingRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('meeting_rooms')->insert([
            [
                'name' => 'Conference Room A',
                'capacity' => 10,
                'location' => '1st Floor',
                'available' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Board Room',
                'capacity' => 20,
                'location' => '2nd Floor',
                'available' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Meeting Pod 3',
                'capacity' => 4,
                'location' => 'Ground Floor',
                'available' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
