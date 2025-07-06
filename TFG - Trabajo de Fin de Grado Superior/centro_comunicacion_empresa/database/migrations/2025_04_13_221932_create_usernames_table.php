<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usernames', function (Blueprint $table) {
            $table->foreignId('user_id')->references('id')->on('users')->constrained(table: 'users', indexName: 'id');
            $table->string('username')->unique();
            $table->primary(['user_id', 'username']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usernames');
    }
};
