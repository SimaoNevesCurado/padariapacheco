<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class ImageCompressor
{
    /**
     * @return array{binary: string, hash: string}
     */
    public static function compressUploadedToWebp(
        UploadedFile $file,
        int $maxWidth = 1600,
        int $quality = 78
    ): array {
        if (! function_exists('imagewebp')) {
            throw new RuntimeException('GD com suporte a WebP não está disponível.');
        }

        $source = self::createImageResource($file);
        $sourceWidth = imagesx($source);
        $sourceHeight = imagesy($source);

        $targetWidth = $sourceWidth;
        $targetHeight = $sourceHeight;

        if ($sourceWidth > $maxWidth) {
            $ratio = $maxWidth / $sourceWidth;
            $targetWidth = $maxWidth;
            $targetHeight = max(1, (int) round($sourceHeight * $ratio));
        }

        $target = imagecreatetruecolor($targetWidth, $targetHeight);

        if (! $target) {
            imagedestroy($source);
            throw new RuntimeException('Não foi possível preparar a imagem para compressão.');
        }

        imagealphablending($target, false);
        imagesavealpha($target, true);

        imagecopyresampled(
            $target,
            $source,
            0,
            0,
            0,
            0,
            $targetWidth,
            $targetHeight,
            $sourceWidth,
            $sourceHeight
        );

        ob_start();
        $ok = imagewebp($target, null, $quality);
        $binary = (string) ob_get_clean();

        imagedestroy($source);
        imagedestroy($target);

        if (! $ok || $binary === '') {
            throw new RuntimeException('Falha ao comprimir imagem para WebP.');
        }

        return [
            'binary' => $binary,
            'hash' => hash('sha256', $binary),
        ];
    }

    public static function storeCompressedWebp(
        string $binary,
        string $directory,
        string $disk = 'public'
    ): string {
        $directory = trim($directory, '/');
        $path = $directory.'/'.Str::uuid().'.webp';

        $stored = Storage::disk($disk)->put($path, $binary);

        if (! $stored) {
            throw new RuntimeException('Falha ao guardar imagem comprimida.');
        }

        return $path;
    }

    private static function createImageResource(UploadedFile $file)
    {
        $mime = $file->getMimeType();
        $path = $file->getRealPath();

        if (! $path) {
            throw new RuntimeException('Ficheiro inválido para processamento.');
        }

        $resource = match ($mime) {
            'image/jpeg', 'image/jpg' => imagecreatefromjpeg($path),
            'image/png' => imagecreatefrompng($path),
            'image/gif' => imagecreatefromgif($path),
            'image/webp' => imagecreatefromwebp($path),
            default => throw new RuntimeException('Formato de imagem não suportado para compressão.'),
        };

        if (! $resource) {
            throw new RuntimeException('Não foi possível ler a imagem enviada.');
        }

        return $resource;
    }
}
