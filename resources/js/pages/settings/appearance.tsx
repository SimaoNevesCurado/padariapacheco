import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tema" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Tema da aplicacao"
                        description="O tema escuro foi removido. A aplicacao usa apenas tema claro."
                    />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
