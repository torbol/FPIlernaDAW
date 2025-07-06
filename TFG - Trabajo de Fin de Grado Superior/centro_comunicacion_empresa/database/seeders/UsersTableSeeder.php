<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'password' => Hash::make('ILERNA'),
            'name' => 'José Ángel',
            'surname' => 'Chouza Estévez',
            'email' => 'jace@jacedev.es',
            'phone' => '600000000',
            'role' => 'ADMIN',
        ]);
        DB::table('users')->insert([
            'password' =>  Hash::make('MariaFer'),
            'name' => 'María',
            'surname' => 'Fernández García',
            'email' => 'mariafernandez@jacedev.es',
            'phone' => '600000001',
        ]);
        DB::table('users')->insert([
            'password' =>  Hash::make('Alejandro01'),
            'name' => 'Alejandro',
            'surname' => 'Martínez López',
            'email' => 'alejandromartinez@jacedev.es',
            'phone' => '600000002',
        ]);
        DB::table('users')->insert([
            //NULL user (as it was deleted)
            'id' => '4',
        ]);
        
    }
}
