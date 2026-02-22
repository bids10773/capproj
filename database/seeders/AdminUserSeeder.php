<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    \App\Models\User::create([
        'name' => 'Admin',
        'email' => 'adminuser@account.com',
        'password' => bcrypt('admin0123'),
        'role' => 'admin',
    ]);
}
}