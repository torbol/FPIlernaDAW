<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Post;

class Comment extends Model
{
    protected $fillable = ['content', 'created_at', 'post_id', 'user_id'];
    protected $hidden = ['comment_id' , 'updated_at'];

    /**
     *  Relationship with the Users table: Each comment_id in the Comments table corresponds to a unique id in the Users table, indicating the user info who wrote the comment.
     * 
     */
    public function getAuthorInfo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');

    }
    /**
     *  Relationship with the Posts table: Each comment_id in the Comments table corresponds to a unique post_id in the Posts table.
     * 
     */
    public function getPostInfo(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'post_id', 'post_id');

    }
}
