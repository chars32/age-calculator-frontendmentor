interface Age {
  years: number;
  months: number;
  days: number;
}

export const calculateAge = (birthDate: Date): Age => {
  const today = new Date();
  
  // Asegurarnos de que la hora no afecte el cálculo
  today.setHours(0, 0, 0, 0);
  const birthDateWithoutTime = new Date(birthDate);
  birthDateWithoutTime.setHours(0, 0, 0, 0);

  let years = today.getFullYear() - birthDateWithoutTime.getFullYear();
  let months = today.getMonth() - birthDateWithoutTime.getMonth();
  let days = today.getDate() - birthDateWithoutTime.getDate();

  // --- Ajuste de "Préstamos" ---

  // Si los días son negativos, pedimos prestado al mes anterior
  if (days < 0) {
    months--; // Reducimos un mes
    // Sumamos los días del mes anterior al nacimiento
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Si los meses son negativos, pedimos prestado al año anterior
  if (months < 0) {
    years--; // Reducimos un año
    months += 12; // Sumamos 12 meses
  }

  return { years, months, days };
};
