# Campus IA - Trabajo Final Integrador

**Proyecto Final Integrador - Zalazar Yael / Ceccardi Andrés**

Sistema de gestión universitaria inteligente con asistente IA integrado.

---

## Tabla de contenidos

- [Pre-desarrollo](#pre-desarrollo)
- [Desarrollo](#desarrollo)
- [Post-desarrollo](#post-desarrollo)
- [Conclusiones](#conclusiones)

---

## Pre-desarrollo

### Definición del producto con IA

#### Idea del producto

**Campus IA** es un sistema de gestión universitaria inteligente que centraliza en una sola plataforma:

- **Información académica** - Materias y carreras
- **Estado del alumno** - Cursando, pendientes, aprobadas
- **Sistema de pagos** - Con alertas automáticas
- **Comunicación alumno-profesor** - Directa y eficiente
- **Chat interactivo** - Responde preguntas del usuario

El objetivo es crear un campus virtual moderno donde el usuario pueda consultar su información de manera rápida, clara e intuitiva.

---

### Identidad de marca

**Nombre:** Campus IA

**Descripción:** Plataforma universitaria digital que integra gestión académica, pagos y comunicación, utilizando un sistema de interacción basado en chat para mejorar la experiencia del usuario.

---

### Público objetivo

#### Primario
- Estudiantes universitarios
- Usuarios digitales que requieren acceso rápido a información académica

#### Secundario
- Profesores
- Administradores académicos

---

### Propuesta de valor

**Campus IA permite a los usuarios:**

Consultar su estado académico mediante un sistema de chat
Recibir alertas automáticas sobre pagos y vencimientos
Gestionar su información en un único lugar
Comunicarse con profesores de forma directa

A diferencia de los sistemas tradicionales, Campus IA propone una experiencia interactiva y centrada en el usuario, basada en lógica inteligente.

---

### Uso de IA en pre-desarrollo

#### Prompt inicial
```
Quiero crear un sistema universitario con login, materias, pagos y un chat inteligente. 
¿Cómo debería estructurarlo?
```

#### Iteración 2 (mejorada)
```
Diseñá un sistema universitario con backend en Java Spring Boot que incluya:
- Autenticación
- Gestión de alumnos
- Materias
- Pagos
- Chat

Separalo en controller, service y repository y sugerí endpoints REST.
```

#### Iteración 3 (final)
```
Diseñá un campus virtual completo con:
- Roles (alumno/profesor)
- Chat inteligente
- Sistema de pagos con alertas
- Base de datos relacional
- Explicá la arquitectura del backend
```

#### Resultado del uso de IA

Definición clara de la arquitectura del sistema
Organización del proyecto en módulos
Diseño de endpoints REST
Integración de funcionalidades clave (chat, pagos, alertas)
Decisiones técnicas acertadas durante el desarrollo

---

## Desarrollo

### Backend implementado

Se desarrolló un backend funcional utilizando **Java con Spring Boot**, siguiendo una arquitectura en capas:

```
┌─────────────────────────────────────────┐
│         API REST (Frontend)             │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         CONTROLLER LAYER                │
│  (Manejo de requests HTTP)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         SERVICE LAYER                   │
│  (Lógica de negocio)                    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         REPOSITORY LAYER                │
│  (Acceso a datos)                       │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         DATABASE (PostgreSQL)           │
└─────────────────────────────────────────┘
```

---

### Endpoints REST implementados

#### Autenticación
```http
POST /auth/google      # Login con Google para alumnos
POST /auth/admin       # Login con credenciales para profesores
```

#### Gestión académica
```http
GET  /carreras                      # Obtener todas las carreras
GET  /carreras/{id}/materias        # Obtener materias de una carrera
GET  /materias/{id}/alumnos         # Obtener alumnos inscritos en una materia
GET  /alumnos/{id}/materias         # Obtener materias de un alumno
```

#### Chat
```http
POST /chat              # Procesar consultas del usuario
POST /chat-campus       # Interpretar preguntas en lenguaje natural
```

#### Pagos
```http
POST /alumnos/pagar/{id}   # Simular el pago de una cuota
```

#### Mensajería
```http
POST /mensajes/enviar           # Enviar mensaje entre usuario y profesor
GET  /mensajes/{alumnoId}       # Consultar historial de mensajes
```

---

### Manejo de datos

**Base de datos:** PostgreSQL (Relacional)

**Tablas principales:**
- `alumnos` - Información de estudiantes
- `carreras` - Carreras disponibles
- `materias` - Asignaturas
- `inscripciones` - Relación alumno-materia
- `pagos` - Historial de pagos
- `mensajes` - Conversaciones alumno-profesor

**Datos persistentes:**
- Estado académico del alumno
- Inscripciones a materias
- Historial de pagos
- Conversaciones entre usuarios

---

### Frontend

Se desarrolló una interfaz para consumir la API (en proceso).

**Funcionalidades previstas:**
- Login de usuario
- Visualización de materias
- Consulta de pagos
- Interacción con el chat

**Stack tecnológico:**
- React + Vite
- JavaScript / HTML / CSS
- Consumo de API REST (Fetch/Axios)

---

### Uso de IA en desarrollo

#### Generación de código

**Prompt ejemplo:**
```
Crea un endpoint en Spring Boot para obtener las materias de un alumno 
desde una base de datos.
```

**Resultado:** Aceleración en la creación de:
- Controladores
- Servicios
- Repositorios
- Métodos CRUD

#### Resolución de errores

**Problemas identificados y resueltos:**
- Valores null en base de datos
- Errores de Hibernate
- Problemas en construcción de URLs
- Lógica incorrecta en controladores

**Prompt ejemplo:**
```
Tengo un error de constraint en PostgreSQL por un campo null en DNI. 
¿Cómo lo soluciono?
```

#### Decisiones técnicas

**Prompt ejemplo:**
```
¿Cómo estructurar un proyecto Spring Boot separando Controller, Service y Repository?
```

**Beneficios obtenidos:**
- Mejor organización del código
- Separación clara de responsabilidades
- Mayor mantenibilidad del sistema

---

## Post-desarrollo

### Gestión de tickets

Sistema básico de gestión de tickets para simular la etapa posterior al lanzamiento.

**Tipos de tickets:**
- Bug - Errores del sistema
- Mejora - Nuevas funcionalidades
- Consulta - Dudas de los usuarios

**Campos incluidos:**
- Tipo
- Descripción
- Prioridad (Alta, Media, Baja)
- Estado (Abierto, En progreso, Resuelto)

---

### Tickets simulados

| ID | Tipo | Descripción | Prioridad | Estado |
|:--:|:-----|:-----------|:-------:|:------:|
| 1 | Bug | Error al registrar pago de una cuota | Alta | Abierto |
| 2 | Mejora | Agregar notificaciones automáticas al sistema | Media | En progreso |
| 3 | Consulta | Usuario no visualiza sus materias correctamente | Baja | Resuelto |
| 4 | Bug | El chat no responde correctamente a ciertas preguntas | Alta | Resuelto |
| 5 | Mejora | Integración futura con sistema de pagos real | Media | Pendiente |

---

### Métricas de seguimiento

#### 1. Cantidad de errores

Mide la estabilidad del sistema.

- **Total de bugs detectados:** 2
- **Bugs críticos (alta prioridad):** 2

#### 2. Tiempo de resolución

Evalúa la eficiencia en la resolución de problemas.

- **Ticket 3:** Resuelto en corto plazo
- **Ticket 4:** Requiere análisis → resolución media

#### 3. Uso del sistema

Analiza la interacción de usuarios con el sistema.

- Consultas al chat
- Uso de endpoints académicos
- Acceso a información de pagos

---

### Uso de IA en post-desarrollo

#### Análisis de tickets

**Prompt utilizado:**
```
Analizá estos tickets de soporte y decime cuáles son los problemas más 
frecuentes y qué mejoras debería priorizar.
```

#### Resultado del análisis

A partir del análisis se identificó:

**Problemas más críticos:**
- Errores relacionados con pagos
- Funcionamiento incorrecto del chat

**Mejoras a priorizar:**
- Notificaciones automáticas
- Integración con sistemas de pago reales

**Acciones necesarias:**
- Mejorar la robustez del sistema en validaciones
- Optimizar respuestas del chat

---

## Conclusiones

### Logros principales

- Arquitectura robusta - Backend bien estructurado en capas
- API REST completa - Endpoints para todas las funcionalidades
- Base de datos relacional - PostgreSQL con tablas bien diseñadas
- Frontend en desarrollo - Interfaz intuitiva para usuarios
- Sistema de tickets - Gestión post-lanzamiento
- Métricas de seguimiento - Análisis de estabilidad y uso

### Rol de la IA en el proyecto

La inteligencia artificial fue fundamental en todas las etapas:

1. **Pre-desarrollo:** Definición clara de la arquitectura y funcionalidades
2. **Desarrollo:** Generación de código, resolución de errores, decisiones técnicas
3. **Post-desarrollo:** Análisis de tickets y priorización de mejoras

### Aprendizajes clave

- La IA es una herramienta potente para acelerar el desarrollo
- Una buena arquitectura desde el inicio facilita el mantenimiento
- Los análisis post-desarrollo son críticos para mejoras futuras
- La colaboración entre desarrolladores e IA genera mejores resultados

---

## Estructura del repositorio

```
Campus-IA/
├── backend/              # API REST (Spring Boot)
├── frontend/             # Interfaz de usuario (React + Vite)
├── database/             # Scripts y esquemas SQL
├── README.md             # Documentación frontend
├── README-GENERAL.md     # Este archivo
└── docs/                 # Documentación adicional
```

---

## Enlaces útiles

- Documentación Frontend (README.md)
- Endpoints API (#-endpoints-rest-implementados)
- Tablas Base de Datos (#-manejo-de-datos)

---

## Contacto

Para consultas o sugerencias sobre este proyecto:

- Zalazar Yael
- Ceccardi Andrés

---

<div align="center">

**Trabajo Final Integrador - Año 2026**

*Campus IA - Transformando la experiencia universitaria*

</div>
