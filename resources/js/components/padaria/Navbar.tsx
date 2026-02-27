import { useState } from "react";
import { Link } from "@inertiajs/react";
import logo from "../../../images/Logo_padaria.png";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-lg z-20">
            <div className="container mx-auto flex items-center justify-between py-6 px-4 md:px-20">

                {/* LOGO */}
                <div className="flex h-12 items-center">
                    <img src={logo} className="h-16" alt="Logo" />
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center font-bold text-black gap-10">

                    <Link href="/" className="hover:text-orange-300">
                        Início
                    </Link>

                    <Link href="/produtos" className="hover:text-orange-300">
                        Produtos
                    </Link>

                    <Link href="/contactos" className="hover:text-orange-300">
                        Contactos
                    </Link>

                    {/* ADMIN DROPDOWN */}
                    <div className="relative">

                        <button
                            onClick={() => setAdminOpen(!adminOpen)}
                            className="flex items-center gap-1 hover:text-orange-300 transition"
                        >
                          Outros

                            <svg
                                className={`h-4 w-4 transition-transform ${
                                    adminOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {adminOpen && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-lg bg-white border shadow-lg overflow-hidden">


                            <Link
                                    href="/dashboard"
                                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                                    onClick={() => setAdminOpen(false)}
                                >
                                    Painel Admin
                                </Link>

                            </div>
                        )}

                    </div>

                </div>

                {/* MOBILE HAMBURGER */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
                >
                    <svg
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {open ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">

                    <div className="flex flex-col py-4 px-6 font-semibold text-black space-y-4">

                        <Link
                            href="/"
                            className="hover:text-orange-300"
                            onClick={() => setOpen(false)}
                        >
                            Início
                        </Link>

                        <Link
                            href="/produtos"
                            className="hover:text-orange-300"
                            onClick={() => setOpen(false)}
                        >
                            Produtos
                        </Link>

                        <Link
                            href="/contactos"
                            className="hover:text-orange-300"
                            onClick={() => setOpen(false)}
                        >
                            Contactos
                        </Link>

                        {/* ADMIN MOBILE */}
                        <details className="w-full">

                            <summary className="cursor-pointer hover:text-orange-300">
                                Outros
                            </summary>

                            <div className="ml-4 mt-2 flex flex-col space-y-2 text-sm">

                                <Link
                                    href="/dashboard"
                                    className="hover:text-orange-300"
                                    onClick={() => setOpen(false)}
                                >
                                    Painel Admin
                                </Link>

                            </div>

                        </details>

                    </div>

                </div>
            )}
        </nav>
    );
}
