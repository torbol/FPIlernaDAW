<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\Comment;

class Post extends Model
{
    protected $fillable = ['title', 'content', 'created_at', 'user_id'];
    protected $hidden = ['post_id', 'updated_at'];

    /**
     *  Relationship with the Users table: Each post_id in the Posts table will be associated with a single id in the Users table.
     * 
     */
    public function getAuthorInfo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');

    }
    /**
     *  Relationship with the Comments table: Each post_id in the Posts table will contains many comments in the Comments table.
     * 
     */
    public function getPostComments(): HasMany
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');

    }
}
