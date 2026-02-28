<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        // Validation
        Validator::make($input, [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'], // optional
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'contact'    => ['required', 'string', 'max:20'],
            'password'   => $this->passwordRules(),
            'terms'      => ['required', 'accepted'],
        ], [
            // Custom Validation Messages
            'terms.accepted' => 'Please accept the Terms and Privacy Policy to proceed with your registration.',
            'contact.required' => 'A valid contact number is required for medical record verification.',
            'email.unique' => 'This email is already registered. Please log in to your account instead.',
            'password.confirmed' => 'The password confirmation does not match.',
        ])->validate();

        // Create user
        return User::create([
            'first_name' => $input['first_name'],
            'middle_name' => $input['middle_name'] ?? null, // optional
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'contact' => $input['contact'],
            'password' => Hash::make($input['password']),
            'role' => 'user', // default role for new users
        ]);
    }
}