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
    Validator::make($input, [
        ...$this->profileRules(), 
        'password' => $this->passwordRules(),
        'terms' => ['required', 'accepted'],
    ], [
        // Professional English Validation Messages
        'terms.accepted' => 'Please accept the Terms and Privacy Policy to proceed with your registration.',
        'contact.required' => 'A valid contact number is required for medical record verification.',
        'email.unique' => 'This email is already registered. Please log in to your account instead.',
        'password.confirmed' => 'The password confirmation does not match.',
    ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'contact' => $input['contact'], // Added to creation
            'password' => Hash::make($input['password']),
        ]);
    }
}
