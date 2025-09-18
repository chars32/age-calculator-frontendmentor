"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import DateInput from "@/components/calculator/DateInput";
import ResultDisplay from "@/components/calculator/ResultDisplay";
import { validateDate } from "@/utils/validation";
import { calculateAge } from "@/utils/ageCalculator";

// Tipos
interface DateInputState {
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
  const [date, setDate] = useState<DateInputState>({ day: "", month: "", year: "" });
  const [age, setAge] = useState<Age | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDate((prevDate) => ({ ...prevDate, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Paso 1: Validar
    const validationErrors = validateDate(date);
    setErrors(validationErrors);

    // Si no hay errores, proceder al cálculo
    if (Object.keys(validationErrors).length === 0) {
      const birthDate = new Date(`${date.year}-${date.month}-${date.day}`);
      const calculatedAge = calculateAge(birthDate);
      setAge(calculatedAge);
    } else {
      setAge(null); // Si hay errores, limpiar el resultado anterior
    }
  };

  return (
    <main className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl rounded-br-[120px] shadow-xl w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 sm:gap-8">
            <DateInput
              id="day"
              label="DIA"
              placeholder="DD"
              value={date.day}
              onChange={handleChange}
              error={errors.day}
            />
            <DateInput
              id="month"
              label="MES"
              placeholder="MM"
              value={date.month}
              onChange={handleChange}
              error={errors.month}
            />
            <DateInput
              id="year"
              label="AÑO"
              placeholder="YYYY"
              value={date.year}
              onChange={handleChange}
              error={errors.year}
            />
          </div>

          <div className="mt-8 flex items-center relative">
            <hr className="w-full border-t border-gray-300" />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-black rounded-full p-4 sm:p-5 absolute right-0 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-4"
              aria-label="Calculate age"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 46 44">
                <g fill="none" stroke="#FFF" strokeWidth="2">
                  <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                </g>
              </svg>
            </button>
          </div>
        </form>

        <ResultDisplay age={age} />
      </div>
    </main>
  );
}
