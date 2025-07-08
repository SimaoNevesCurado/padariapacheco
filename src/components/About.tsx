export default function About() {
  return (
    <section className="mt-24 px-4 sm:px-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#a86b3c]">
        Sobre Nós
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Text Content */}
        <div className="lg:w-1/2">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            Desde 1951, a Padaria Pacheco tem sido um ponto de referência na
            freguesia de Monte Redondo, Leiria. Com mais de 70 anos de
            experiência, preservamos a tradição e o sabor autêntico dos nossos
            produtos, garantindo qualidade e frescura em cada fornada.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mt-6">
            Orgulhamo-nos de oferecer aos nossos clientes pão, bolos e
            pastelaria feitos com dedicação e respeito pelas receitas que
            atravessaram gerações. Agradecemos a confiança de toda a comunidade
            que nos tem acompanhado ao longo destas décadas, e continuamos
            empenhados em levar até si o melhor da arte da panificação.
          </p>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src="AboutIMG.jpeg"
            alt="Padaria Pacheco"
            className="w-full h-auto rounded-lg shadow-xl object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
