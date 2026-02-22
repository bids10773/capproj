<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;

class LoginResponse implements LoginResponseContract
{
     public function toResponse($request)
{
    // Check if the user's role is 'admin'
    if (Auth::user()->role === 'admin') {
        return redirect()->intended(route('admin.dashboard'));
    }

    // Default for patients/users
    return redirect()->intended(route('dashboard'));
}
}
