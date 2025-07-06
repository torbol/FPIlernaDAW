<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Username;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Checks user credentials and creates the session.
     */
    public function login(Request $request)
    {
        $username = Username::where('username', $request->username)->first();
        if(!is_null($username)) {
            $id = $username->user_id;
        } else {
            $id = null;
        }
        
        $credentials = [
            'id' => $id,
            'password' => $request->password,
        ];

        if($request->password !== null && Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $token = Str::random(60); // This token will be used later to authorize the API requests (Bearer authentication). It renews the token every time the user logs in.
            $user = Auth::user();
            $user->api_token = hash('sha256', $token);
            $user->save();

            // Creates a cookie with the api_token, allowing authentication with the API later by reading it using JavaScript. It will expire in 24 hours.
            setcookie("LaravelSessionUserApiToken", $token, time() + 24*60*60);

            return redirect()->intended(route('mainPanel.main')); // The intended behavior is to redirect back to the previous page, such as the login page if login fails.
        } else {
            return redirect(route('login'));
        }
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        // Revokes all user tokens used to authenticate API requests. To get a new one in the next session.
        $user->api_token = null;
        $user->save();
        // Logs out the current session.
        Auth::logout();
        // Session reset.
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('login'));
    }

}
