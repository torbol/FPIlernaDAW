<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display all users.
     */
    public function indexUserManager()
    {
        // Verifies if the user requesting this resource is an ADMIN, if not authorized, returns a prohibition message.
        if (Auth::user()->role === 'ADMIN') {
            $users = User::all();
            return view('users.userManager', compact('users'));
        } else {
            return response('Prohibido. Recurso reservado solo para administradores.', 403)->header('Content-Type', 'text/plain');
        }
    }

    /**
     * Store a new User from userManager.
     */
    public function storeUserManager(Request $request)
    {
        if (Auth::user()->role === 'ADMIN') {
            $request->validate([
                'username' => 'required|min:8',
                'password' => 'required|min:8',
                'name' => 'required',
                'surname' => 'required',
                'email' => 'required|email',
                'phone' => 'required|numeric',
                'role' => 'nullable',
            ]);

            // Checks the value of role and save it in a variable for later use.
            $role = ($request->role === 'ADMIN') ? $request->role : null;

            // Inserts the new user into the users table.
            try {
                DB::beginTransaction(); // We will start a transaction to ensure no data is stored if an error occurs (for example duplicated username).
                $newUser = User::create([
                    'name' => $request->name,
                    'surname' => $request->surname,
                    'password' => $request->password,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'role' => $role,
                ]); 
    
                // Inserts the username into the usernames table.
                $newUser->getUsername()->create([
                    'username' => $request->username,
                ]);
                DB::commit(); // Saves everything if no errors occur.

            } catch (Throwable $e) {
                DB::rollBack(); // Rolls back to the previous state if a database error occurs.
            }

            // Returns to the previous UserManager page. If everything proceeds as expected, a message will be displayed. Otherwise, any errors will be shown.
            return redirect(route('userManager.indexUserManager'))->withErrors([
                'message' => 'Usuario creado con éxito',
            ]);
        
            
        } else {
            return response('Prohibido. Recurso reservado solo para administradores.', 403)->header('Content-Type', 'text/plain');
        }  
    }

    /**
     * Update an user from userManager form
     */
    public function updateUserManager(Request $request)
    {
        if (Auth::user()->role === 'ADMIN') {
            $request->validate([
                'username' => 'required|min:8',
                'password' => 'nullable|min:8',
                'name' => 'required',
                'surname' => 'required',
                'email' => 'required|email',
                'phone' => 'required|numeric',
                'role' => 'nullable',
            ]);

            $user = User::findOrFail($request->id);
            
            // Checks the value of role and saves it into a variable.
            $role = ($request->role === 'ADMIN') ? $request->role : null;
            
            // Array to pass to the update function.
            $updatedData = [
                'name' => $request->name,
                'surname' => $request->surname,
                'email' => $request->email,
                'phone' => $request->phone,
                'role' => $role,
            ];
            // Checks if the password field is not null and pushes it to the updatedData array.
            if (($request->password) !== null) {
                $updatedData['password'] = $request->password;
            }

            // Updates the new values in the Users table.
            try {
                DB::beginTransaction();
                $user->update($updatedData);
                // Updates the new username in the Usernames table.
                $user->getUsername()->update([
                    'username' => $request->username,
                ]);
                DB::commit();
            } catch (Throwable $e) {
                DB::rollBack();
            }
            

            // Returns to the previous UserManager page. If everything proceeds as expected, a message will be displayed. Otherwise, any errors will be shown.
            return redirect(route('userManager.indexUserManager'))->withErrors([
                'message' => 'Datos de usuario actualizados con éxito',
            ]);
        } else {
            return response('Prohibido. Recurso reservado solo para administradores.', 403)->header('Content-Type', 'text/plain');
        }
    }

    /**
     * Remove an user from the Users table DB.
     */
    public function deleteUserManager(Request $request)
    {
        if (Auth::user()->role === 'ADMIN') {

            /* We won't actually delete the table's row because we want to maintain the index correlation between the 
            Users and usernames tables (in the model, there is a constraint, so it could also raise an error). We need to
            set the name, password, surname, email, phone, and role to null (only the user's personal information). */
            $request->validate([
                'id' => 'numeric',
            ]);

            $userToDelete = User::find($request->id);

            // Sets the values to null.
            $userToDelete->name = null;
            $userToDelete->surname = null;
            $userToDelete->email = null;
            $userToDelete->password = null;
            $userToDelete->phone = null;
            $userToDelete->role = null;

            // Saves changes to the DB
            $userToDelete->save();

            // Returns to the previous UserManager page, showing errors if they occur.
            return redirect(route('userManager.indexUserManager'))->withErrors([
                'message' => 'Datos de usuario eliminados con éxito',
            ]);

        } else {
            return response('Prohibido. Recurso reservado solo para administradores.', 403)->header('Content-Type', 'text/plain');
        }
    }
    
}