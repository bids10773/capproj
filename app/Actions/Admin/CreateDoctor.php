<?php

namespace App\Actions\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CreateDoctor
{
    /**
     * Validate and create a new user (doctor, radtech, or medtech).
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        // Validation
        Validator::make($input, [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'contact' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:doctor,radtech,medtech'],
        ], [
            'email.unique' => 'This email is already registered.',
            'password.confirmed' => 'The password confirmation does not match.',
            'role.in' => 'Please select a valid role.',
        ])->validate();

        // Create user with pre-verified email
        return User::create([
            'first_name' => $input['first_name'],
            'middle_name' => $input['middle_name'] ?? null,
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'contact' => $input['contact'],
            'password' => Hash::make($input['password']),
            'role' => $input['role'],
            'email_verified_at' => now(), // Pre-verified as per requirement
        ]);
    }
}
