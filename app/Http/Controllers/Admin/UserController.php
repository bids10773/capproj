<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Actions\Admin\CreateDoctor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                      ->orWhere('middle_name', 'like', "%{$search}%")
                      ->orWhere('last_name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('role', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10) // 10 users per page
            ->withQueryString(); // keeps search when paginating

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Store a newly created doctor.
     */
    public function store(Request $request)
    {
        $doctor = app(CreateDoctor::class)->create($request->all());

        return redirect()->route('admin.users')
            ->with('success', "Doctor {$doctor->full_name} has been created and verified successfully.");
    }
}
