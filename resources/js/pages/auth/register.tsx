import HeadingSmall from '@/components/heading-small';
import { store } from '@/routes/register';
import { register } from '@/routes';
import { Form, Head, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

type ManagedUser = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Criar utilizadores',
        href: register().url,
    },
];

export default function Register({ users }: { users: ManagedUser[] }) {
    const { flash, errors } = usePage<
        SharedData & {
            flash?: {
                success?: string;
                error?: string;
            };
            errors: Record<string, string>;
        }
    >().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar utilizadores" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Criar utilizador"
                        description="Preencha os dados para criar uma nova conta."
                    />

                    {flash?.success && (
                        <p className="text-sm text-green-600">{flash.success}</p>
                    )}

                    {flash?.error && (
                        <p className="text-sm text-red-600">{flash.error}</p>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="space-y-6"
                    >
                        {({ processing, errors: formErrors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Nome completo"
                                    />
                                    <InputError
                                        message={formErrors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@empresa.com"
                                    />
                                    <InputError message={formErrors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError
                                        message={formErrors.password}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirmar password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirmar password"
                                    />
                                    <InputError
                                        message={formErrors.password_confirmation}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    data-test="register-user-button"
                                >
                                    Criar utilizador
                                </Button>
                            </>
                        )}
                    </Form>
                </div>

                <div className="space-y-6">
                    <HeadingSmall
                        title="Utilizadores"
                        description="Lista de utilizadores existentes."
                    />

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="w-40">Acao</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Form
                                            action={`/register/${user.id}`}
                                            method="delete"
                                            options={{
                                                preserveScroll: true,
                                            }}
                                            onBefore={() =>
                                                window.confirm(
                                                    'Tem a certeza que quer apagar este utilizador?',
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={processing}
                                                >
                                                    Apagar
                                                </Button>
                                            )}
                                        </Form>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {users.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Ainda nao existem utilizadores.
                        </p>
                    )}

                    {errors.user && (
                        <p className="text-sm text-red-600">{errors.user}</p>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
