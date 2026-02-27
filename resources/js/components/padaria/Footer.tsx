import { SiteInfo } from '@/types/Models/Site';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
export function Footer() {
    const { site } = usePage<{ site: SiteInfo | null }>().props;

    return (
        <footer className="mt-24 bg-[#a86b3c] pt-12 pb-8 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-xl font-bold">Contactos</h3>
                        <ul className="space-y-2">
                            <li>📞 {site?.telefone}</li>
                            <li>📧 {site?.email}</li>
                            <li>📍 {site?.morada}</li>
                            <li>
                                <Link
                                    href={route('vagas.show')}
                                    className="inline-block font-medium transition-all duration-200 hover:scale-105 "
                                >
                                    Venha trabalhar connosco!
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold">Horário</h3>
                        <ul className="space-y-2">
                            <li>Seg - Sexta: {site?.horario_semana}</li>
                            <li>Sábado: {site?.sabado}</li>
                            <li>Domingos - Feriados: {site?.horario_domingo}</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold">Siga-nos</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/profile.php?id=61582133819292" target="_blank" className="cursor-pointer hover:text-amber-200">
                                Facebook
                            </a>
                            <a  href="https://www.instagram.com/padariapacheco1951/" target="_blank" className="cursor-pointer hover:text-amber-200">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-amber-200/30 pt-6 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Padaria Pacheco. Todos
                        os direitos reservados.
                    </p>
                    <p className="mt-2">
                        Desenvolvido por{' '}
                        <a
                            href="https://simaocurado.dev"
                            className="hover:text-blue-300"
                        >
                            Simão Curado
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
