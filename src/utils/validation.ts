interface DateInput {
  day: string;
  month: string;
  year: string;
}

interface Errors {
  day?: string;
  month?: string;
  year?: string;
}

export const validateDate = (date: DateInput): Errors => {
  const errors: Errors = {};

  // Lógica de validación irá aquí en el futuro.
  // Por ejemplo:
  // if (!date.day) {
  //   errors.day = "This field is required";
  // }
  
  return errors;
};
