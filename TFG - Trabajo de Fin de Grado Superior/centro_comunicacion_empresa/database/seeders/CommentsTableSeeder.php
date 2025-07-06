<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            'post_id' => '1',
            'user_id' => '2',
            'content' => 'Hola! Dejo el primer comentario',
            'created_at' => Carbon::parse('2025-03-23T19:01:20+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('comments')->insert([
            'post_id' => '1',
            'user_id' => '3',
            'content' => 'Yo también dejo uno!',
            'created_at' => Carbon::parse('2025-03-23T21:12:33+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('comments')->insert([
            'post_id' => '2',
            'user_id' => '1',
            'content' => 'Probando :)',
            'created_at' => Carbon::parse('2025-03-24T10:40:45+02:00')->setTimezone('Europe/Madrid'),
        ]);
    }
}
