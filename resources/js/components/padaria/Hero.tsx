
import background from "@/../images/headerIMG.jpeg";
import { Link, usePage } from '@inertiajs/react';
import { SiteInfo } from '@/types/Models/Site';
import { route } from 'ziggy-js';


export function Hero() {
    const { site } = usePage<{ site: SiteInfo | null }>().props;
    const heroBackground = site?.imagem_home
        ? (site.imagem_home.startsWith('http://') ||
          site.imagem_home.startsWith('https://') ||
          site.imagem_home.startsWith('/')
            ? site.imagem_home
            : `/storage/${site.imagem_home}`)
        : background;

    return (
        <section
            className="relative h-[500px] bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-20"
            style={{ backgroundImage: `url(${heroBackground})` }}

        >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-center">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-8">
                        {site?.heroText}
                    </h1>

                    <Link href={route('contacts')}
                        className="text-sm md:text-base font-medium bg-orange-300/90 hover:bg-orange-400 px-6 py-3 rounded-md mt-10 mb-8 transition-colors duration-300">
                        Fala connosco
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-6 w-[95%] sm:w-[90%] lg:w-[85%] text-center">
                <div>
                    <p className="font-semibold">Seg-Sexta: {site?.horario_semana}</p>
                    <p className="font-semibold">Domingo: {site?.horario_domingo}</p>
                    <p className="font-semibold">Sabado: {site?.sabado}</p>

                </div>

                <div className="hidden md:block w-px h-12 bg-gray-200" />

                <div>
                    <p className="text-sm text-gray-500">Visita-nos em</p>
                    <p className="text-lg font-semibold">
                       {site?.morada}
                    </p>
                </div>

                <div className="hidden md:block w-px h-12 bg-gray-200" />

                <div>
                    <p className="text-sm text-gray-500">Desde 1951</p>
                    <p className="text-lg italic text-[#a86b3c]">
                        {site?.slogan}
                        </p>
                </div>
            </div>
        </section>
    );
}
