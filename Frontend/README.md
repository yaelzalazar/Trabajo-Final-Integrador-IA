# Frontend – Campus IA

## Descripción del proyecto

El frontend de **Campus IA** es la interfaz de usuario del sistema de gestión universitaria inteligente. Permite a los usuarios interactuar con el backend a través de una experiencia simple e intuitiva.

El sistema ofrece:

- Autenticación de usuarios (Google y administrador)
- Visualización de materias y estado académico
- Consulta de pagos y alertas
- Interacción mediante un chat inteligente
- Comunicación entre alumno y profesor

El frontend consume una API REST desarrollada en Spring Boot.

---

## Tecnologías utilizadas

- React (o el framework que estés usando)
- JavaScript / HTML / CSS
- Consumo de API REST (fetch / axios)

---

## Instrucciones de ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd frontend
2. Instalar dependencias
npm install
3. Configurar variables (si aplica)

Ejemplo:

VITE_API_URL=http://localhost:8080
4. Ejecutar el proyecto
npm run dev
5. Acceder a la aplicación

Abrir en el navegador:

http://localhost:5173
Funcionalidades principales
Login de usuario
Consulta de materias
Visualización de estado académico
Consulta de pagos
Chat interactivo
Panel de profesor (visualización de alumnos por materia)
Uso de IA

La inteligencia artificial fue utilizada durante el desarrollo del frontend para mejorar la implementación y la toma de decisiones.

Generación de código

Se utilizaron prompts para crear componentes y lógica de interfaz.

Ejemplo:

Crear un componente en React que consuma un endpoint REST y muestre una lista de materias con su estado.
Resolución de errores

La IA ayudó a resolver problemas como:

Manejo de estados en React
Errores en llamadas a la API
Problemas de renderizado

Ejemplo:

Tengo un error al consumir una API en React con fetch, ¿cómo manejo correctamente la respuesta y los errores?
Decisiones técnicas

Se utilizaron prompts para definir la estructura del frontend.

Ejemplo:

¿Cómo organizar un frontend en React para consumir múltiples endpoints y manejar estado global?
