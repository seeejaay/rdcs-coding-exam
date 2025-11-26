<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {

    //View All Users
    public function index(){
        return response()->json(User::with('role')->get());
    }

    //Create User
    public function create(Request $request){
        $validated = $request->validate([
            'full_name' => 'required|string|max:255|
            regex:/^[a-zA-Z\s]+$/|unique:users,full_name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::create($validated);
        return response()->json(['message'=>'User Created Successfully', 'user'=> $user],201);
    }

    //View User By ID
    public function read($id){
        $user = User::find($id);
        if(!$user){
            return response()->json(['message'=>'User not found'],404);
        }
        return response()->json($user);
    }


    //Edit User
    public function update(Request $request,$id){
        $user = User::find($id);
        if(!$user){
            return response()->json(['message'=>'User not found'],404);
        }

        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255|regex:/^[a-zA-Z\s]+$/|unique:users,full_name,'.$user->id,
            'email' => 'sometimes|required|email|unique:users,email,'.$user->id,
            'password' => 'sometimes|required|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/',
            'role_id' => 'sometimes|required|exists:roles,id',
        ]);
        $user->update($validated);
        return response()->json(['message'=>'User Updated Successfully', 'user'=>$user],200);
    }

    //Delete user
    public function delete($id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message'=>'User Deleted Successfully'],204);
    }

    //Current User Profile
    public function profile(Request $request){
        $user = $request->user();
        return response()->json($user);
    }
}