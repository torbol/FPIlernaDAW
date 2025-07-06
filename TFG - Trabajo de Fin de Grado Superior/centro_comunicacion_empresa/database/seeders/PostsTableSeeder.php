<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            'user_id' => '1',
            'title' => 'PRIMER POST!!',
            'content' => 'Probando a ser el primero en subir un post! Se realiza prueba para ver que todo esté correcto y que no haya problemas de alineado de texto',
            'created_at' => Carbon::parse('2025-03-23T12:16:25+02:00')->setTimezone('Europe/Madrid'),
        ]);
        DB::table('posts')->insert([
            'user_id' => '1',
            'title' => 'SEGUNDO POST!!',
            'content' => 'Segundo post del día!',
            'created_at' => Carbon::parse('2025-03-23T18:20:32+02:00')->setTimezone('Europe/Madrid'),
        ]);
    }
}
