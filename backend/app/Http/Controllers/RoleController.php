<?php
namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    // View All Roles
    public function index(){
        return response()->json(Role::all());
    }

    //Create Role
    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|unique:roles,name',
            'description' => 'nullable|string',
        ]);
         $role = Role::create($validated);
         return response()->json(['message'=>'Role Created Successfully', 'role'=> $role], 201);
    }

    //View Role By ID
    public function read($id){
        return response()->json(Role::findOrFail($id));
    }

    //Update Role
    public function update(Request $request, $id){
        $role = Role::findOrFail($id);
        $validated = $request-> validate([
            'name' => 'sometimes|required|string|unique:roles,name,'.$role->id,
            'description' => 'nullable|string',
        ]);
        $role->update($validated);
        return response()->json(['message'=>'Role Updated Successfully', 'role'=>$role], 200);
    }

    //Delete Role
    public function delete($id){
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(['message'=>'Role Deleted Successfully'], 204);
    }
}