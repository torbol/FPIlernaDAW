<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

Route::middleware('auth:api')->group(function () { // We set up a middleware that checks the user's bearer token and grants authorization only if it is valid.
    Route::get('/userManager/{id}', [ApiController::class, 'show']);         
    Route::get('/main/listAllUsers', [ApiController::class, 'listAllUsers']);
    Route::get('/getUserMessages/{username_receiver}', [ApiController::class, 'getPersonalMessages']);        
    Route::get('/getChatPublicMessages', [ApiController::class, 'getChatPublicMessages']);        
    Route::post('/sendMessage', [ApiController::class, 'storeMessage']);
    Route::get('/getPosts', [ApiController::class, 'listAllPosts']);        
    Route::post('/insertComment/{post_id}', [ApiController::class, 'storeComment']);        
    Route::post('/insertPost', [ApiController::class, 'storePost']);        
    Route::delete('/deletePost/{post_id}', [ApiController::class, 'deletePostOrComment']);        
    Route::delete('/deleteComment/{comment_id}', [ApiController::class, 'deletePostOrComment']);        
});     