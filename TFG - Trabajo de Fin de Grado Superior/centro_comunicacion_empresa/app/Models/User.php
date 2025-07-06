<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Username;
use App\Models\Message;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'email_verified_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    /**
     *  Relationship with the Usernames table: Each id in the Users table will have one associated username in the Usernames table.
     *  
     */
    public function getUsername(): HasOne // We can get the username directly from the User object using $user1->getUsername;
    {
        return $this->hasOne(Username::class);
    }
    /**
     *  Relationship with Messages table.
     * 
     */
    public function getSentMessages(): HasMany // We can retrieve all messages sent by a user directly from the User object using $user1->getSentMessages;

    {
        return $this->hasMany(Message::class, 'user_id_sender');
    }
    public function getReceivedMessages(): HasMany // We can retrieve all messages received by a user directly from the User object using $user1->getReceivedMessages;
    {    
        return $this->hasMany(Message::class, 'user_id_receiver');
    }
    /**
     *  Relationship with the Posts table: Each id in the Users table can be associated with many post_id in the Posts table.
     *  
     */
    public function getWrittenPosts(): HasMany // We can get all posts written by a user using $user1->getWrittenPosts; 
    {
        return $this->hasMany(Post::class);
    }
    /**
     *  Relationship with the Comments table: Each user in the Users table can write between 0 and N comments on any post.
     *  
     */
    public function getWrittenComments(): HasMany // We can get all comments written by a user using $user1->getWrittenComments; 
    {
        return $this->hasMany(Comment::class);
    }

}
