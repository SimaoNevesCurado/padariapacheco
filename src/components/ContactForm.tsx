export const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Formulário enviado com sucesso!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-[#a86b3c] mb-4">
        Envie-nos uma Mensagem
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a86b3c] focus:border-[#a86b3c]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a86b3c] focus:border-[#a86b3c]"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefone (Opcional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a86b3c] focus:border-[#a86b3c]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a86b3c] focus:border-[#a86b3c]"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#a86b3c] hover:bg-[#8a5a34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a86b3c]"
          >
            Enviar Mensagem
          </button>
        </div>
      </form>
    </div>
  );
};
