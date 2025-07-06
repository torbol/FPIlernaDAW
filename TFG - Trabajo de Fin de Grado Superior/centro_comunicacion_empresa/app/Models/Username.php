<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Username extends Model
{
    protected $fillable = ['username'];
    protected $hidden = ['user_id'];
    public $timestamps = false; // The create() function expects the created_at and updated_at columns, we can disable them using this variable in the model.

    /**
     *  Inverse of the relationship with the User table: Each username belongs to a single id (in the User table)
     *  We can get the username directly from the User object using $user1->getUsername;
     */
    public function getUserInfo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id'); // user_id is a foreign key in the Username table. We need to specify it, and the owner_key, it will take the id from the User table.

    }
}
