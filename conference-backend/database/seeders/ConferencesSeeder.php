<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\Status;
use App\Models\Conferences;

class ConferencesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for($i = 0; $i < 10; $i++) {
            $randomTimestamp = rand(strtotime('2024-01-01 00:00:00'),strtotime('2024-12-31 23:59:59'));
            $randomStartDate = new \DateTime();
            $randomEndDate = new \DateTime();
            $randomStartDate->setTimestamp($randomTimestamp);
            $randomEndDate->setTimestamp($randomTimestamp + rand(7200,10000));
            Conferences::create([
                'conference_name' => \Str::random(16),
                'conference_description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'conference_start_date' => date_format($randomStartDate, 'Y-m-d H:i:s'),
                'conference_end_date' => date_format($randomEndDate, 'Y-m-d H:i:s'),
            ]);
        }
    }
}