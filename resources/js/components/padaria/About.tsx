import foto1 from "../../../images/foto1.png";
import foto2 from "../../../images/foto2.png";
import { usePage } from '@inertiajs/react';
import { SiteInfo } from '@/types/Models/Site';


export function About() {
    const { site } = usePage<{ site: SiteInfo | null }>().props;

    return (
        <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#a86b3c]">
                Sobre Nós
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-1/2 text-gray-700 space-y-10 text-lg md:text-xl">
                    <p>
                        {site?.texto_home}
                    </p>

                </div>

                <div className="flex gap-4 w-full lg:w-1/2">
                    <img
                        src={foto1}
                        alt="Padaria"
                        className="w-1/2 rounded-lg shadow-xl object-cover max-h-[500px]"
                    />
                    <img
                        src={foto2}
                        alt="Padaria"
                        className="w-1/2 rounded-lg shadow-xl object-cover max-h-[500px]"
                    />
                </div>
            </div>
        </section>
    );
}

