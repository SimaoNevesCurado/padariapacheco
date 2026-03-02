import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type FlashProps = {
    success?: string;
    error?: string;
};

export default function FlashMessage() {
    const { flash } = usePage<{ flash?: FlashProps }>().props;
    const [closedMessage, setClosedMessage] = useState<string | null>(null);
    const message = flash?.error || flash?.success;

    if (!message || closedMessage === message) {
        return null;
    }

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                className={`relative rounded px-4 py-3 pr-10 text-sm text-white shadow-lg ${
                    flash?.error ? 'bg-red-600' : 'bg-green-600'
                }`}
            >
                {message}

                <button
                    onClick={() => setClosedMessage(message)}
                    className="absolute right-2 top-2 text-white/80 hover:text-white"
                    aria-label="Fechar"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
