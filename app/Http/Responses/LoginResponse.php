<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;

class LoginResponse implements LoginResponseContract
{
     public function toResponse($request)
    {
        // Check if the user's role and redirect accordingly
        $role = Auth::user()->role;
        
        if ($role === 'admin') {
            return redirect()->intended(route('admin.dashboard'));
        }
        
        if ($role === 'doctor') {
            return redirect()->intended(route('doctor.dashboard'));
        }
        
        if ($role === 'medtech') {
            return redirect()->intended(route('medtech.dashboard'));
        }
        
        if ($role === 'radtech') {
            return redirect()->intended(route('radtech.dashboard'));
        }

        // Default for patients/users
        return redirect()->intended(route('dashboard'));
    }
}
