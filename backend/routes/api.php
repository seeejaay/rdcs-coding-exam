<?php

//Controllers
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AuthController;

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// CRUD Routes for USERS
// Route::get('api/v1/users', [UserController::class, 'index']);
// Route::post('api/v1/users', [UserController::class, 'create']);
// Route::get('api/v1/users/{id}', [UserController::class, 'read']);
// Route::put('api/v1/users/{id}', [UserController::class, 'update']);
// Route::delete('api/v1/users/{id}', [UserController::class, 'delete']);

// CRUD Routes for ROLES
// Route::get('api/v1/roles', [RoleController::class, 'index']);
// Route::post('api/v1/roles', [RoleController::class, 'create']);
// Route::get('api/v1/roles/{id}', [RoleController::class, 'read']);
// Route::put('api/v1/roles/{id}', [RoleController::class, 'update']);
// Route::delete('api/v1/roles/{id}', [RoleController::class, 'delete']);

// Authentication Routes
// Route::post('api/v1/login', [AuthController::class, 'login']);
// Route::post('api/v1/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

//Public Routes
    //Authentication Routes
    Route::prefix('v1')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('login');
    });

//Protected Routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function(){
    //CRUD Routes for USERS
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'create']);
    Route::get('users/{id}', [UserController::class, 'read']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'delete']);
    //Current User Profile
    Route::get('profile', [UserController::class, 'profile']);
    //CRUD Routes for ROLES
    Route::get('roles', [RoleController::class, 'index']);
    Route::post('roles', [RoleController::class, 'create']);
    Route::get('roles/{id}', [RoleController::class, 'read']);
    Route::put('roles/{id}', [RoleController::class, 'update']);
    Route::delete('roles/{id}', [RoleController::class, 'delete']);

    //Authentication Routes
    Route::post('logout', [AuthController::class, 'logout']);
});
