<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsernamesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usernames')->insert([
            'user_id' => 1,     // Checks if the value exists in the Users table before inserting (can duplicate in phpMyAdmin even if it's a primary key)
            'username' => 'josecho97',
        ]);
        DB::table('usernames')->insert([
            'user_id' => 2,
            'username' => 'marifer80',
        ]);
        DB::table('usernames')->insert([
            'user_id' => 3,
            'username' => 'alejmar76',
        ]);
        DB::table('usernames')->insert([
            //NULL user (as it was deleted)
            'user_id' => 4,
            'username' => 'fabicas72',
        ]);
    }
}
