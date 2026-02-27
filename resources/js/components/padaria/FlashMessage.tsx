import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type FlashProps = {
    success?: string;
    error?: string;
};

export default function FlashMessage() {
    const { flash } = usePage<{ flash?: FlashProps }>().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.error)) {
        return null;
    }

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                className={`relative rounded px-4 py-3 pr-10 text-sm text-white shadow-lg ${
                    flash.error ? 'bg-red-600' : 'bg-green-600'
                }`}
            >
                {flash.error || flash.success}

                <button
                    onClick={() => setVisible(false)}
                    className="absolute right-2 top-2 text-white/80 hover:text-white"
                    aria-label="Fechar"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
