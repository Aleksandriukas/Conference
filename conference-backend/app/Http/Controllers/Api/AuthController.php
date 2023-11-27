<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(Auth::attempt(['email' => $email, 'password' => $password])){
            return response(['message' => 'Invalid credentials'], 401);
        }
        /** @var User $user  */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
        
    }
    
    public function register(RegisterRequest $request)
    {
        $date = $request->validated();
        $user = User::create([
            'name' => $date['name'],
            'email' => $date['email'],
            'password' => bcrypt::make($date['password'])
        ]);
    
        $token = $user->createToken('main')->plainTextToken;
    
       return response(compact('user','token'));
        
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $request->user()->currentAccessToken()->delete();
        return response(['message' => 'Logged out'],204);
    }

}
