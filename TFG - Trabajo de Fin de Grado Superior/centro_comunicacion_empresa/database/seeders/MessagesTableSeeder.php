<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('messages')->insert([
            'user_id_sender' => '1',
            'user_id_receiver' => '3',
            'content' => 'Hola Alejandro!',
            'created_at' => Carbon::parse('2025-03-23T12:20:37+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('messages')->insert([
            'user_id_sender' => '3',
            'user_id_receiver' => '1',
            'content' => 'Buenas José! Qué tal?',
            'created_at' => Carbon::parse('2025-03-23T13:10:25+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('messages')->insert([
            'user_id_sender' => '3',
            'user_id_receiver' => '2',
            'content' => 'Hola María!, ¿me indicas un correo al que enviártelo?',
            'created_at' => Carbon::parse('2025-03-14T17:06:40+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('messages')->insert([
            'user_id_sender' => '2',
            'user_id_receiver' => '1',
            'content' => 'Hola José, podrías ayudarme a cambiar la contraseña?',
            'created_at' => Carbon::parse('2025-03-24T13:18:26+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('messages')->insert([
            'user_id_sender' => '2',
            'content' => 'Hola a todos! Este mensaje es para el grupo.',
            'created_at' => Carbon::parse('2025-03-24T13:18:26+02:00')->setTimezone('Europe/Madrid'),
        ]);
    }
}
