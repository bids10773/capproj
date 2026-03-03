<?php

namespace App\Actions\Admin;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CreateDoctor
{
    /**
     * Validate and create a new doctor.
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
            'medical_field' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'email.unique' => 'This email is already registered.',
            'password.confirmed' => 'The password confirmation does not match.',
            'medical_field.required' => 'Medical field is required for doctors.',
        ])->validate();

        // Create doctor with pre-verified email
        return User::create([
            'first_name' => $input['first_name'],
            'middle_name' => $input['middle_name'] ?? null,
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'contact' => $input['contact'],
            'password' => Hash::make($input['password']),
            'role' => 'doctor',
            'medical_field' => $input['medical_field'],
            'email_verified_at' => now(), // Pre-verified as per requirement
        ]);
    }
}
