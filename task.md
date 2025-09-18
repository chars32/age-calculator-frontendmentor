# Lista de Tareas: Calculadora de Edad

Esta lista de tareas se basa en el `plan.md` y nos ayuda a rastrear qué partes del desarrollo se han completado.

- [x] **Paso 1: Configuración del Entorno y Estructura del Proyecto**
  - [x] Inicializar el proyecto con Next.js, TypeScript y TailwindCSS.
  - [x] Definir la arquitectura de carpetas (`components`, `utils`, etc.).

- [x] **Paso 2: Maquetación y Estilos (Enfoque *Mobile-First*)**
  - [x] Estructurar el contenido con HTML semántico en `page.tsx`.
  - [x] Aplicar estilos con TailwindCSS para replicar el diseño visual.

- [ ] **Paso 3: Lógica y Manejo del Estado con React**
  - [ ] Crear estados para las entradas del usuario (día, mes, año).
  - [ ] Crear estado para el resultado del cálculo.
  - [ ] Crear estado para los errores de validación.
  - [ ] Vincular los inputs a los estados (`value` y `onChange`).
  - [ ] Crear la función `handleSubmit`.

- [ ] **Paso 4: Modularización y Abstracción de la Lógica**
  - [ ] Crear el componente reutilizable `DateInput.tsx`.
  - [ ] Crear el componente `ResultDisplay.tsx`.
  - [ ] Separar las funciones de validación en `src/utils/validation.ts`.
  - [ ] Separar la lógica de cálculo en `src/utils/ageCalculator.ts`.

- [ ] **Paso 5: Implementación de la Validación y el Cálculo**
  - [ ] Integrar la lógica de validación en `handleSubmit`.
  - [ ] Integrar la lógica de cálculo en `handleSubmit`.
  - [ ] Mostrar los resultados o errores en la interfaz.

- [ ] **Paso 6: Bonus - Animación de los Números**
  - [ ] Instalar y configurar una librería de animación (ej. Framer Motion).
  - [ ] Implementar la animación en el componente de resultados.
