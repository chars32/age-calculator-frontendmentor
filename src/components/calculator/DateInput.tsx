import { ChangeEvent } from 'react';

// Definimos las props que nuestro componente aceptará
interface DateInputProps {
  id: 'day' | 'month' | 'year';
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string; // El error es opcional
}

const DateInput = ({ id, label, placeholder, value, onChange, error }: DateInputProps) => {
  // Determinamos el color del borde y la etiqueta basado en si hay un error
  const labelColor = error ? 'text-red-500' : 'text-gray-500';
  const borderColor = error ? 'border-red-500' : 'border-gray-300';

  return (
    <div className="flex flex-col w-1/4">
      <label htmlFor={id} className={`${labelColor} font-bold tracking-[0.2em] text-xs mb-2`}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${borderColor} border rounded-lg p-3 text-gray-900 text-xl sm:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600`}
      />
      {/* Mostramos el mensaje de error solo si existe */}
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default DateInput;


