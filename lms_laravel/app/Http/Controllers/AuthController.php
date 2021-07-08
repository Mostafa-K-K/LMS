<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $admin = Admin::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'username' => $request->username,
            'password' => $request->password,
        ]);

        $token = auth()->login($admin);

        return $this->respondWithToken($token);
    }

    public function login()
    {
        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $data = Admin::where('username', $credentials['username'])->first();
            $data->update(['remember_token' => $token]);
        } catch (Exception $e) {
            return false;
        }

        // return Admin::where('username', $credentials['username'])->first();
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        $credentials = request(['username']);

        try {
            $data = Admin::where('username', $credentials['username'])->first();
            $data->update(['remember_token' => null]);
        } catch (Exception $e) {
            return false;
        }

        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}
