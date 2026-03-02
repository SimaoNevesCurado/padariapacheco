<?php

namespace App\Http\Controllers\Settings;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserManagementController extends Controller
{
    /**
     * Show the user management page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register', [
            'users' => User::query()
                ->select(['id', 'name', 'email', 'created_at'])
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Create a new user account.
     */
    public function store(Request $request, CreateNewUser $createNewUser): RedirectResponse
    {
        $createNewUser->create($request->all());

        return to_route('register')->with('success', 'Utilizador criado com sucesso.');
    }

    /**
     * Delete a user account.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()?->is($user)) {
            return back()->with('error', 'Nao pode apagar o seu proprio utilizador.');
        }

        $user->delete();

        return back()->with('success', 'Utilizador apagado com sucesso.');
    }
}
