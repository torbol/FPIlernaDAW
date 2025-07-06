<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Message extends Model
{
    protected $fillable = ['user_id_sender', 'user_id_receiver', 'updated_at', 'content', 'created_at', 'read'];
    protected $hidden = ['message_id', 'user_id_sender', 'user_id_receiver'];
    /**
     *  Relationship with the Usernames table: Each message_id in the Messages table will be sent by a single id in the Users table and will be received by exactly one user. (If it's for a groupal chat, the receiver will be null).
     * 
     */
    public function getSenderInfo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_sender');

    }
    public function getReceiverInfo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_receiver');

    }
}
