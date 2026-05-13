# Frontend – Campus IA

Sistema de gestión universitaria inteligente con asistente IA integrado.

## Descripción del proyecto

**Campus IA** es la interfaz de usuario del sistema de gestión universitaria inteligente. Proporciona una experiencia simple e intuitiva para que estudiantes y profesores interactúen con el backend a través de una API REST desarrollada en Spring Boot.

### Características principales

- **Autenticación** - Login con Google e integración con administrador
- **Gestión académica** - Visualización de materias y estado académico
- **Gestión de pagos** - Consulta de pagos y alertas
- **Chat inteligente** - Interacción mediante IA
- **Panel de profesor** - Visualización de alumnos por materia

---

## Tecnologías utilizadas

| Tecnología | Descripción |
|-----------|------------|
| **React** | Framework UI |
| **Vite** | Build tool |
| **JavaScript** | Lenguaje base |
| **CSS** | Estilos |
| **Fetch/Axios** | Consumo de API REST |
| **Spring Boot** | Backend (API) |

---

## Requisitos previos

- **Node.js** v16 o superior
- **npm** v8 o superior
- Acceso a la API REST del backend (Spring Boot)

---

## Instrucciones de ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Acceder a la aplicación

Abrir en el navegador:

```
http://localhost:5173
```

---

## Estructura del proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── App.jsx          # Componente principal
├── App.css          # Estilos globales
├── main.jsx         # Punto de entrada
└── index.css        # Estilos base
```

---

## Uso de IA en el desarrollo

Durante el desarrollo de este frontend se utilizó inteligencia artificial para:

### Generación de código
- Creación de componentes React reutilizables
- Lógica de consumo de endpoints REST
- Manejo de estados con hooks

### Resolución de problemas
- Debugging de errores en llamadas a API
- Optimización de rendimiento
- Solución de problemas de renderizado en React

### Decisiones técnicas
- Definición de estructura del frontend
- Patrones de organización de código
- Mejores prácticas en consumo de APIs

---

## Scripts disponibles

```bash
npm run dev      # Ejecutar servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build
```

---

## API Backend

El frontend consume una API REST. Asegurate de que el backend esté corriendo en:
```
http://localhost:8080
```

Para más información sobre los endpoints, consulta la documentación del backend.

---

## Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo licencia MIT.

---

## Contacto

Para preguntas o sugerencias, por favor abre un issue o contacta al equipo de desarrollo.
