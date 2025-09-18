# Plan de Desarrollo: Calculadora de Edad

Este plan está diseñado para construir la aplicación de manera incremental, comenzando con una base sólida y añadiendo complejidad progresivamente. El objetivo es atacar el problema de forma estructurada, garantizando que el código sea limpio, mantenible y escalable.

---

## Paso 1: Configuración del Entorno y Estructura del Proyecto 🏗️

Antes de escribir una sola línea de la interfaz, es crucial tener un proyecto bien organizado.

1.  **Inicializar el Proyecto:**
    * Utiliza el comando oficial para crear un nuevo proyecto Next.js con TypeScript y TailwindCSS ya configurados.
    * Durante la instalación, `create-next-app` te preguntará si quieres usar TypeScript, ESLint y Tailwind CSS. Asegúrate de seleccionar afirmativamente todas estas opciones. El uso del `App Router` es la recomendación actual.
    
    ```bash
    npx create-next-app@latest mi-calculadora-de-edad --typescript --tailwind --eslint
    ```

2.  **Definir la Arquitectura de Carpetas:**
    * Dentro de la carpeta `src` (si decidiste usarla durante la instalación), crea una estructura clara para organizar tus archivos. Esto hará que tu proyecto sea más fácil de navegar y mantener.

    ```
    src/
    ├── app/                # Rutas y páginas de Next.js (aquí vivirá tu página principal)
    │   └── page.tsx        # El componente principal de tu calculadora
    ├── components/         # Componentes reutilizables de la UI
    │   ├── ui/             # Componentes genéricos (Botón, Input, etc.)
    │   └── calculator/     # Componentes específicos de la calculadora
    ├── hooks/              # Hooks personalizados (ej. useAgeCalculator)
    ├── utils/              # Funciones de ayuda (ej. cálculos, validaciones)
    └── styles/             # Archivos de CSS global (si es necesario)
        └── globals.css
    ```

---

## Paso 2: Maquetación y Estilos (Enfoque *Mobile-First*) 📱

Ahora nos enfocamos en la parte visual, traduciendo el diseño de la imagen a código HTML semántico y estilos con TailwindCSS.

1.  **HTML Semántico:**
    * En tu archivo `page.tsx`, estructura el contenido usando etiquetas HTML5 semánticas.
    * `<main>`: Para el contenedor principal de la calculadora.
    * `<form>`: Para agrupar los campos de entrada y el botón.
    * `<label>` y `<input>`: Para cada campo (Día, Mes, Año). Usa el atributo `for` en el `label` para asociarlo con el `id` del `input` por accesibilidad.
    * `<button type="submit">`: Para el botón que inicia el cálculo.
    * `<section>` o `<div>`: Para mostrar los resultados.

2.  **Estilado con TailwindCSS (*Mobile-First*):**
    * **Primero, el móvil:** Diseña la interfaz para que se vea bien en una pantalla pequeña. Todos los elementos probablemente estarán en una sola columna vertical.
    * **Clases de Tailwind:** Aplica las clases de utilidad de Tailwind directamente en tu JSX para definir el espaciado, colores, tipografía y bordes.
    * **Responsividad:** Usa los prefijos responsivos de Tailwind (como `md:`, `lg:`) para ajustar el layout en pantallas más grandes. Por ejemplo, `flex-col md:flex-row` cambiaría la dirección de un contenedor de columna a fila en pantallas medianas y superiores.
    * **Estados Interactivos:** Implementa los estados `hover` y `focus` usando las variantes de Tailwind (`hover:bg-blue-600`, `focus:ring-2`). Esto es clave para que los elementos interactivos se sientan responsivos al usuario.

---

## Paso 3: Lógica y Manejo del Estado con React 🧠

Con la interfaz visual lista, es hora de darle vida.

1.  **Manejo de Estado (`useState`):**
    * **Entradas del usuario:** Crea un estado para almacenar los valores de los campos de día, mes y año. Puedes usar un solo objeto o estados separados.
        ```typescript
        const [date, setDate] = useState({ day: '', month: '', year: '' });
        ```
    * **Resultado del cálculo:** Crea un estado para guardar la edad calculada. Inicialízalo como nulo o con valores en cero.
        ```typescript
        const [age, setAge] = useState<{ years: number, months: number, days: number } | null>(null);
        ```
    * **Errores de validación:** Crea un estado para manejar los mensajes de error de cada campo.
        ```typescript
        const [errors, setErrors] = useState({ day: '', month: '', year: '' });
        ```

2.  **Flujo de Datos:**
    * **Capturar la entrada:** Vincula los `input` a sus respectivos estados usando las propiedades `value` y `onChange`. Cada vez que el usuario escriba, el estado se actualizará.
    * **Manejar el envío:** Crea una función `handleSubmit` que se ejecute cuando el formulario sea enviado (al hacer clic en el botón). Previene el comportamiento por defecto del formulario con `event.preventDefault()`.

---

## Paso 4: Modularización y Abstracción de la Lógica 🧩

Para mantener el componente principal (`page.tsx`) limpio, vamos a separar la lógica compleja en funciones y componentes más pequeños.

1.  **Crear Componentes Reutilizables:**
    * **`DateInput.tsx`**: Crea un componente en `src/components/calculator/`. Este componente recibirá props como `label`, `value`, `onChange`, `placeholder` y `error`. Esto te permite reutilizar el mismo componente para el día, el mes y el año, en lugar de repetir el código.
    * **`ResultDisplay.tsx`**: Un componente que recibe `years`, `months` y `days` como props y los muestra formateados.

2.  **Separar la Lógica de Negocio:**
    * **Funciones de Validación:** Crea un archivo `src/utils/validation.ts`. Dentro, exporta una función como `validateDate(day, month, year)` que retorne un objeto de errores.
    * **Funciones de Cálculo:** Crea un archivo `src/utils/ageCalculator.ts`. Dentro, exporta una función `calculateAge(birthDate)` que reciba una fecha y devuelva un objeto `{ years, months, days }`.

---

## Paso 5: Implementación de la Validación y el Cálculo ⚙️

Ahora integramos la lógica que creamos en el paso anterior dentro de la función `handleSubmit`.

1.  **Flujo de Validación en `handleSubmit`:**
    * Llama a tu función `validateDate` con los valores actuales del estado.
    * **Si hay errores:** Actualiza el estado de `errors` con los mensajes recibidos. La interfaz se volverá a renderizar y mostrará los errores debajo de los campos correspondientes. No continúes con el cálculo.
    * **Si no hay errores:** Limpia cualquier error previo (`setErrors({})`) y procede al cálculo.

2.  **Flujo de Cálculo en `handleSubmit`:**
    * Crea un objeto `Date` a partir de los datos del usuario.
    * Llama a tu función `calculateAge` pasándole esa fecha.
    * Toma el resultado y actualiza el estado de `age` con `setAge()`. La interfaz se renderizará de nuevo para mostrar los resultados.

    **Lógica clave para el cálculo (a implementar en `ageCalculator.ts`):**
    * Obtén la fecha actual.
    * Resta los años, meses y días.
    * Maneja los "préstamos": si el día de nacimiento es mayor que el día actual, resta un mes y suma los días de ese mes prestado al día actual antes de hacer la resta. Haz lo mismo para los meses y años.

---

## Paso 6: Bonus - Animación de los Números ✨

Para el toque final, vamos a implementar la animación.

1.  **Elegir una Librería:** Una librería como **Framer Motion** o **React Spring** es ideal para esto, ya que se integra muy bien con React. Framer Motion suele ser más sencilla para empezar.

2.  **Implementación conceptual:**
    * Instala la librería (`npm install framer-motion`).
    * En tu componente `ResultDisplay.tsx`, en lugar de mostrar el número directamente, usarás un componente de la librería.
    * Cuando el estado `age` se actualice con un nuevo valor, la librería se encargará de animar el número desde su valor anterior (o desde 0) hasta el nuevo valor, creando un efecto de "contador" suave.

¡Mucho éxito en tu proyecto!