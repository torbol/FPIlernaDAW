<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Username;
use App\Models\Message;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    /**
     * Lists all users with a non null name (active users).
     */
    public function listAllUsers()
    {
        $loggedUser = Auth::user();
        $users = User::whereNotNull('name')->get();
        $totalMessagesNotRead = Message::where('user_id_receiver', $loggedUser->id)->where('read', 0)->get();
        $usernamesCollection = [];
        foreach ($users as $user) {
            $username = $user->getUsername->username;
            if (Auth::user()->getUsername->username !== $username) {
                $messagesNotRead = $totalMessagesNotRead->where('user_id_sender', $user->id)->count(); // Give us the number of messages with a read value of 0 (not read yet).
                array_push($usernamesCollection, [
                    'username' => $username, 
                    'new_messages' => $messagesNotRead]);
            }
            
        }
        return response()->json($usernamesCollection, 200);
    }

    /**
     * Gets the user info that we want to show.
     */
    public function show(string $id)
    {
        if (Auth::user()->role === 'ADMIN') {
            $user = User::findOrFail($id);
            $data = [
                'username' => $user->getUsername->username,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
            ]; 

            return response()->json($data, 200);
        } else {
            $data = [
                'error' => 'Tu usuario no está autorizado para acceder a este recurso.'
            ];
            return response()->json($data, 403);
        }
        
    }

    /**
     * Gets the user's personal messages with other users.
     */
    public function getPersonalMessages(string $username_receiver)
    {
        $user_sender = Auth::user();
        $user_id_receiver = Username::where('username', $username_receiver)->first()->user_id;
        // We need to filter, knowing that user_id_sender can be either a sender or receiver, and user_id_receiver can be both as well.
        $personalChatMessagesReceived = $user_sender->getReceivedMessages->where('user_id_sender', $user_id_receiver); // Messages received from $user_id_receiver.
        $personalChatMessagesSent = $user_sender->getSentMessages->where('user_id_receiver', $user_id_receiver); // Messages sent to $user_id_receiver.

        $data = []; 
        // Substitute #user_id_sender #user_id_receiver with "received"
        foreach ($personalChatMessagesReceived as $message) {
            array_push($data, [
                'username_interacts_with' => $username_receiver,
                'message_id' => $message->message_id,
                'class' => 'received',
                'content' => $message->content,
                'created_at' => $message->created_at,
            ]);
        }
        // Substitute #user_id_sender #user_id_receiver with "sent"
        foreach ($personalChatMessagesSent as $message) {
            array_push($data, [
                'username_interacts_with' => $username_receiver,
                'message_id' => $message->message_id,
                'class' => 'sent',
                'content' => $message->content,
                'created_at' => $message->created_at,
            ]);
        }

        /* Now that we have the $data array with sent and received messages, we need to sort these 
        messages by date (we will use the field 'message_id', which is equivalent to sorting by timestamp due to the 
        database insertion order). The usort function is ideal for this purpose, as it sorts values using a callback 
        function and reassigns the keys in ascending order. More info https://www.php.net/manual/es/function.usort.php
         */
        usort($data, function ($element1, $element2) {
            // element1 will never be equal to element2, because it is impossible for two message_id values to be the same, so we can return -1 ($a<$b) or 1 ($a>$b).
            return ($element1['message_id'] < $element2['message_id']) ? -1 : 1;
        });
        
        // We change the read status to 1, as messages has been shown to the user
        Message::where('user_id_sender', $user_id_receiver)->where('user_id_receiver', $user_sender->id)->update(['read' => 1]);

        // Returns the final $data array in response to the request.
        return response()->json($data, 200);
    }

    /**
     * Gets the public chat messages.
     */
    public function getChatPublicMessages()
    {
        $user_id_receiver = null;
        // We need to filter, knowing that user_id_sender can be anyone and user_id_receiver will be null.
        $chatPublicMessages = Message::where('user_id_receiver', $user_id_receiver)->get();

        $data = []; 

        // Small function to determine if the message is sent or received in the public chat.
        function determineClassMessage($message) {
            if ($message->user_id_sender === Auth::id()) {
                return "sent";
            } else {
                return "received";
            }
        }
        // Substitute #user_id_sender with either "received" or "sent"
        foreach ($chatPublicMessages as $message) {
            array_push($data, [
                'message_id' => $message->message_id,
                'username_sender' => Username::where('user_id', $message->user_id_sender)->first()->username,
                'class' => determineClassMessage($message),
                'content' => $message->content,
                'created_at' => $message->created_at,
            ]);
        }

        // Returns the final $data array in response to the request.
        return response()->json($data, 200);
    }

    /**
     * Stores a received message as JSON in the DB.
     */
    public function storeMessage(Request $request) {
        // Checks that all fields contain valid data.
        $validator = Validator::make($request->all(), [
            'user_id_receiver' => 'nullable|numeric',
            'content' => 'required',
        ]);
        
        if ($validator->fails()) {
            $data = [
                'message' => 'Error al enviar el mensaje',
                'errors' => $validator->errors(),
                'status' => 400,
            ];
            return response()->json($data, 400);
        }

        // Tiny function to determine the user_id_receiver.
        function determineUserIdReceiver($request) {
            if ($request->username === null) {
                return null;
            } else {
                return Username::where('username', $request->username)->first()->user_id;
            }
        }

        // Creates the new message in the DB.
        $newMessage = Message::create([
            'user_id_sender' => Auth::user()->id,
            'user_id_receiver' => determineUserIdReceiver($request),
            'content' => $request->content,
            'created_at' => time(),
            'updated_at' => time(),
            'read' => 0,
        ]);
        
        // If the message can't be created, we will receive the following error response.
        if (!$newMessage) {
            $data = [
                'message' => 'Se ha producido un error al enviar el mensaje',
                'status' => '500',
            ];

            return response()->json($data, 500);
        }

        // If the message can be created, it will return the following message.
        $data = [
            'message' => 'Mensaje enviado correctamente', 
            'status' => '201'
        ];

        return response()->json($data, 201);
        
    }

    /**
     * Returns an array containing all posts stored in the database.
     */
    public function listAllPosts() {
        $posts = Post::all();

        $data = []; // This is what we will return.
        // We need to add the username field who posted that message.
        function isAdmin() {
            if(Auth::user()->role === 'ADMIN') {
                return true;
            } else {
                return false;
            }
        }

        function getComments($post) {
            $postComments = [];
            foreach ($post->getPostComments as $comment) {
                array_push($postComments, [
                    'comment_id' => $comment->comment_id,
                    'comment_author' => $comment->getAuthorInfo->getUsername->username,
                    'content' => $comment->content,
                    'created_at' => $comment->created_at,
                ]);
            }
            // We sort comments from newest to oldest (by date, which is in reverse order).
            $postComments = array_reverse($postComments);
            return $postComments;
        }
        
        foreach ($posts as $post) {
            array_push($data, [
                'post_id' => $post->post_id,
                'username' => $post->getAuthorInfo->getUsername->username,
                'title' => $post->title,
                'content' => $post->content,
                'created_at' => $post->created_at,
                'delete' => isAdmin(),
                'comments' => getComments($post),
            ]);
        }
        // Gives in reverse order the posts array (newest first always)
        $data = array_reverse($data);
        return response()->json($data, 200);
    }

    /**
     * Inserts a post into the DB.
     */
    public function storePost(Request $request) {
        if (Auth::user()->role === 'ADMIN') {
            // Creates the new post in the DB.
            $newPost = Post::create([
                'user_id' => Auth::user()->id,
                'title' => $request->title,
                'content' => $request->content,
                'created_at' => time(),
                'updated_at' => time(),
            ]);
            
            // If the post can't be created, we will receive the following error response.
            if (!$newPost) {
                $data = [
                    'message' => 'Se ha producido un error al publicar el post',
                    'status' => '500',
                ];

                return response()->json($data, 500);
            }

            // If the post can be create, it will return the following message.
            $data = [
                'message' => 'Post publicado correctamente', 
                'status' => '201'
            ];

            return response()->json($data, 201);
        } else {
            $data = [
                'error' => 'Tu usuario no está autorizado para acceder a este recurso.'
            ];
            return response()->json($data, 403);
        }
    }

    /**
     * Inserts a comment into the DB.
     */
    public function storeComment(Request $request) {
        // Creates the new comment in the DB.
        $newComment = Comment::create([
            'post_id' => $request->post_id,
            'user_id' => Auth::user()->id,
            'content' => $request->content,
            'created_at' => time(),
            'updated_at' => time(),
        ]);
        
        // If comment can't be created, we will receive the following error response.
        if (!$newComment) {
            $data = [
                'message' => 'Se ha producido un error al publicar el comentario',
                'status' => '500',
            ];

            return response()->json($data, 500);
        }

        // If the comment can be create, it will return the following message.
        $data = [
            'message' => 'Comentario publicado correctamente', 
            'status' => '201'
        ];

        return response()->json($data, 201);
    }

    /**
     * Daletes a comment from the DB.
     */
    public function deletePostOrComment(Request $request) {
        if (Auth::user()->role === 'ADMIN') {
            // If the URL contains .../deletePost/...
            if ($request->is('*/deletePost/*')) {
                $request->validate([
                    'post_id' => 'numeric',
                ]);
                // Deletes the post instance.
                $rowToDelete = Post::where('post_id', $request->post_id)->delete();

            } else if ($request->is('*/deleteComment/*')) { // If the URL contains .../deleteComment/...
                $request->validate([
                    'comment_id' => 'numeric',
                ]);
                // Deletes the post instance.
                $rowToDelete = Comment::where('comment_id', $request->comment_id)->delete();
            }
            
            if ($rowToDelete) {
                // Status code 204 doesn't return any response.
                $statusMessage = null;
                $statusCode = 204;
            } else {
                $statusMessage = [
                    'Post_id' => $request->post_id,
                    'Message' => 'ERROR, no se ha podido eliminar el recurso indicado',
                ];
                $statusCode = 404;
            }
        } else {
            $statusMessage = [
                'Message' => 'Tu usuario no está autorizado para hacer uso de este recurso.',
            ];
            $statusCode = 403;
        }
        
        return response()->json($statusMessage, $statusCode);
    }
}
