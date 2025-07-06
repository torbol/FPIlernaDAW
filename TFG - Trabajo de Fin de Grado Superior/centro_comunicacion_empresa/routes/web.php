<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

Route::view('/login', 'authentication.login')->name('login');
Route::view('/main', 'mainPanel.main')->middleware('auth')->name('mainPanel.main');
Route::redirect('/', 'login');
Route::post('/login', [LoginController::class, 'login'])->name('login.login');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/userManager', [UserController::class, 'indexUserManager'])->middleware('auth')->name('userManager.indexUserManager');
Route::post('/userManager/create', [UserController::class, 'storeUserManager'])->middleware('auth')->name('userManager.storeUserManager');
Route::post('/userManager/edit', [UserController::class, 'updateUserManager'])->middleware('auth')->name('userManager.updateUserManager');
Route::post('/userManager/delete', [UserController::class, 'deleteUserManager'])->middleware('auth')->name('userManager.deleteUserManager');