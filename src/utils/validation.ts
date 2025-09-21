interface DateInput {
  day: string;
  month: string;
  year: string;
}

interface Errors {
  day?: string;
  month?: string;
  year?: string;
  general?: string; // Para errores que afectan a toda la fecha
}

export const validateDate = (date: DateInput): Errors => {
  const errors: Errors = {};
  const { day, month, year } = date;

  // --- Regla 1: Campos Vacíos ---
  if (!day) errors.day = "Este campo es requerido";
  if (!month) errors.month = "Este campo es requerido";
  if (!year) errors.year = "Este campo es requerido";

  // Si hay errores de campos vacíos, no tiene sentido seguir validando
  if (Object.keys(errors).length > 0) return errors;

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  // --- Regla 2: Valores Lógicos ---
  if (dayNum < 1 || dayNum > 31) errors.day = "Debe ser un dia valido";
  if (monthNum < 1 || monthNum > 12) errors.month = "Debe ser un mes valido";
  if (yearNum > new Date().getFullYear()) errors.year = "Debe ser un año valido";
  if (yearNum < 100) errors.year = "Debe ser un año valido"; // Evitar años como "25"

  // Si hay errores de formato, paramos aquí
  if (Object.keys(errors).length > 0) return errors;

  // --- Regla 3: Fecha Real (días del mes) ---
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  if (dayNum > daysInMonth) {
    errors.day = "Debe ser una fecha valida";
    // Para que el error aparezca en todos los campos si la fecha es inválida
    errors.month = " "; 
    errors.year = " ";
  }

  // --- Regla 4: Fecha en el Futuro ---
  const inputDate = new Date(yearNum, monthNum - 1, dayNum);
  const today = new Date();
  // Reseteamos la hora para comparar solo las fechas
  today.setHours(0, 0, 0, 0); 

  if (inputDate > today) {
    errors.year = "La fecha es mayor";
    errors.month = " ";
    errors.day = " ";
  }

  return errors;
};
