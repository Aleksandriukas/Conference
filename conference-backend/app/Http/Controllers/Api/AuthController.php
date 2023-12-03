<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var User $user  */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'),200);
        
    }
    
    public function register(RegisterRequest $request)
    {
        $date = $request->validated();
        $user = User::create([
            'name' => $date['name'],
            'email' => $date['email'],
            'password' => $date['password'],
        ]);
    
    
       return response(['messege' => 'User created successfully'], 201);
        
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $request->user()->currentAccessToken()->delete();
        return response(['message' => 'Logged out'],204);
    }

}
