<?php

use App\Models\Info;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('updating the site image stores WebP and replaces the previous file', function () {
    Storage::fake('public');
    Storage::disk('public')->put('site/old.webp', 'old image');

    $info = Info::create(['imagem_home' => 'site/old.webp']);

    $this->actingAs(User::factory()->create())
        ->patch(route('info.update'), [
            'imagem_home' => UploadedFile::fake()->image('hero.png', 20, 20),
        ])
        ->assertRedirect();

    $newPath = $info->fresh()->imagem_home;

    expect($newPath)->toStartWith('site/')->toEndWith('.webp');
    Storage::disk('public')->assertExists($newPath);
    Storage::disk('public')->assertMissing('site/old.webp');
});
