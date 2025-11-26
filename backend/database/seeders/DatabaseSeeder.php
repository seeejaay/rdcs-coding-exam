<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $role = \App\Models\Role::create([
            'name' => 'Admin',
            'description' => 'Administrator Role with full permissions',
        ]);

        User::factory()->create([
            'full_name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => 'P@ssw0rd!',
            'role_id' => $role->id,
        ]);
    }
}
