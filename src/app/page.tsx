"use client"

import { ChangeEvent, FormEvent, useState } from "react";

// Definimos los tipo, medante interface, para mayor claridad y seguridad
interface DateInput {
  day: string;
  month: string;
  year: string;
}

interface Age {
  years: number;
  months: number;
  days: number;
}

interface Errors {
  day?: string;
  month?: string;
  year?: string;
}

export default function Home() {
  // Estado para almacenar los valores de los inputs
  const [date, setDate] = useState<DateInput>({day: "", month: "", year: "" });

  // Estado para almacenar la edad calculada
  const [age, setAge] = useState<Age | null>(null);
  
  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState<Errors>({});

  // Manejador de evento para actualiar el estado cuando el usuario escribe
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    setDate((prevDate) => ({ ...prevDate, [id]: value }));
  }

  // Manejador de evento para el envío de formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que la página se recargue
    // Aquí irá la lógica de validación y cálculo en el futuro
    console.log("Formulario enviado con los datos:", date);
  };

  return (
    <main className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl rounded-br-[120px] shadow-xl w-full max-w-2xl">
        <form>
          {/* Contenedor de Inputs */}
          <div className="flex gap-4 sm:gap-8">
            {/* Input del Día */}
            <div className="flex flex-col w-1/4">
              <label htmlFor="day" className="text-gray-500 font-bold tracking-[0.2em] text-xs mb-2">
                DIA
              </label>
              <input
                id="day"
                type="number"
                placeholder="DD"
                className="border border-gray-300 rounded-lg p-3 text-gray-900 text-xl sm:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Input del Mes */}
            <div className="flex flex-col w-1/4">
              <label htmlFor="month" className="text-gray-500 font-bold tracking-[0.2em] text-xs mb-2">
                MES
              </label>
              <input
                id="month"
                type="number"
                placeholder="MM"
                className="border border-gray-300 rounded-lg p-3 text-gray-900 text-xl sm:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Input del Año */}
            <div className="flex flex-col w-1/4">
              <label htmlFor="year" className="text-gray-500 font-bold tracking-[0.2em] text-xs mb-2">
                AÑO
              </label>
              <input
                id="year"
                type="number"
                placeholder="YYYY"
                className="border border-gray-300 rounded-lg p-3 text-gray-900 text-xl sm:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Separador y Botón de Envío */}
          <div className="mt-8 flex items-center relative">
            <hr className="w-full border-t border-gray-300" />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-black rounded-full p-4 sm:p-5 absolute right-0 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-4"
              aria-label="Calcular edad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                </g>
              </svg>
            </button>
          </div>
        </form>

        {/* Sección de Resultados */}
        <div className="mt-12">
          <p className="text-6xl sm:text-8xl font-extrabold italic">
            <span className="text-purple-600">{age ? age.years : "--"}</span> 
            <span className="text-gray-900"> años </span>
          </p>
          <p className="text-6xl sm:text-8xl font-extrabold italic">
            <span className="text-purple-600">{age ? age.months : "--"}</span>
            <span className="text-gray-900"> meses </span>
          </p>
          <p className="text-6xl sm:text-8xl font-extrabold italic">
            <span className="text-purple-600">{age ? age.days : "--"}</span>
            <span className="text-gray-900"> dias </span>
          </p>
        </div>
      </div>
    </main>
  );
}
