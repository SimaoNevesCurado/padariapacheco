import { Navbar } from '@/components/padaria/Navbar';
import { Footer } from '@/components/padaria/Footer';
import { Showcase } from '@/components/padaria/Showcase';
import { About } from '@/components/padaria/About';
import { Hero } from '@/components/padaria/Hero';
import { Produto } from '@/types/Models/Produto';
import Noticias from '@/components/padaria/Noticias';
import { Noticia } from '@/types/Models/Noticia';

type Props ={
    vitrine: Produto[];
    noticias: Noticia[];
}

export default function Home({vitrine,noticias} : Props) {
    return (
        <>
            <Navbar />
            <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40">
                <main className="pt-36 pb-20 bg-white">
                    <Hero />
                    <Showcase produtos={vitrine}/>
                    <About />
                    <Noticias noticias={noticias}/>
                </main>
            </div>
            <Footer />
        </>
    );
}


