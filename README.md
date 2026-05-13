# Trabajo-Final-Integrador-IA
Proyecto Final Integrador - Zalazar Yael / Ceccardi Andrés

1. Pre-desarrollo (Definición del producto con IA)

Idea del producto: El proyecto consiste en el desarrollo de Campus IA, un sistema de gestión universitaria inteligente que centraliza en una sola plataforma:

Información académica (materias, carreras)
Estado del alumno (cursando, pendientes, aprobadas)
Sistema de pagos con alertas automáticas
Comunicación alumno-profesor
Un chat interactivo que responde preguntas del usuario

El objetivo es crear un campus virtual moderno, donde el usuario pueda consultar su información de manera rápida, clara e intuitiva.

Identidad de marca

Nombre: Campus IA
Descripción: Campus IA es una plataforma universitaria digital que integra gestión académica, pagos y comunicación, utilizando un sistema de interacción basado en chat para mejorar la experiencia del usuario.

Público objetivo
Primario:
Estudiantes universitarios
Usuarios digitales que requieren acceso rápido a información académica
Secundario:
Profesores
Administradores académicos
Propuesta de valor

Campus IA permite a los usuarios:

Consultar su estado académico mediante un sistema de chat
Recibir alertas automáticas sobre pagos y vencimientos
Gestionar su información en un único lugar
Comunicarse con profesores de forma directa

A diferencia de los sistemas tradicionales, Campus IA propone una experiencia interactiva y centrada en el usuario, basada en lógica inteligente.

Uso de IA
Prompt inicial
Quiero crear un sistema universitario con login, materias, pagos y un chat inteligente. ¿Cómo debería estructurarlo?
Iteración 2 (mejorada)
Diseñá un sistema universitario con backend en Java Spring Boot que incluya:
- autenticación
- gestión de alumnos
- materias
- pagos
- chat
Separalo en controller, service y repository y sugerí endpoints REST.
Iteración 3 (final)
Diseñá un campus virtual completo con:
- roles (alumno/profesor)
- chat inteligente
- sistema de pagos con alertas
- base de datos relacional
y explicá la arquitectura del backend.
Resultado del uso de IA

El uso de inteligencia artificial permitió:

Definir la arquitectura del sistema
Organizar el proyecto en módulos
Diseñar endpoints REST
Integrar funcionalidades clave como chat, pagos y alertas
Tomar decisiones técnicas durante el desarrollo

2. Desarrollo (Construcción del producto)
Backend implementado

Se desarrolló un backend funcional utilizando Java con Spring Boot, siguiendo una arquitectura en capas:

Controller: manejo de requests
Service: lógica de negocio
Repository: acceso a datos
API REST

Se implementaron múltiples endpoints REST para cubrir las funcionalidades del sistema.

Autenticación
POST /auth/google
POST /auth/admin

Permiten el ingreso de usuarios:

Alumnos mediante Google
Profesores mediante credenciales
Gestión académica
GET /carreras
GET /carreras/{id}/materias
GET /materias/{id}/alumnos
GET /alumnos/{id}/materias

Permiten consultar:

Carreras disponibles
Materias por carrera
Alumnos inscriptos en una materia
Materias asociadas a un alumno
Chat
POST /chat
POST /chat-campus

Permiten procesar consultas del usuario e interpretar preguntas en lenguaje natural.

Pagos
POST /alumnos/pagar/{id}

Permite simular el pago de una cuota.

Mensajería
POST /mensajes/enviar
GET /mensajes/{alumnoId}

Permite enviar mensajes y consultar el historial entre alumno y profesor.

Manejo de datos

Se utilizó PostgreSQL como base de datos relacional.

Tablas principales:

alumnos
carreras
materias
inscripciones
pagos
mensajes

El sistema maneja información persistente como:

Estado académico del alumno
Inscripciones a materias
Historial de pagos
Conversaciones entre usuarios
Frontend (opcional)

Se desarrolló una interfaz básica (en proceso) para consumir la API.

Funcionalidades previstas:

Login de usuario
Visualización de materias
Consulta de pagos
Interacción con el chat
Uso de IA

La inteligencia artificial fue utilizada durante el desarrollo en distintas etapas.

Generación de código

Se utilizaron prompts para generar estructuras iniciales de código.

Ejemplo:

Crea un endpoint en Spring Boot para obtener las materias de un alumno desde una base de datos.

Esto permitió acelerar la creación de controladores, servicios y repositorios.

Resolución de errores

La IA fue utilizada para identificar y resolver errores como:

Problemas con valores null en base de datos
Errores de Hibernate
Problemas en la construcción de URLs
Lógica incorrecta en controladores

Ejemplo:

Tengo un error de constraint en PostgreSQL por un campo null en DNI. ¿Cómo lo soluciono?
Decisiones técnicas

Se utilizaron prompts para tomar decisiones sobre arquitectura y diseño.

Ejemplo:

¿Cómo estructurar un proyecto Spring Boot separando Controller, Service y Repository?

Resultado:

Mejor organización del código
Separación clara de responsabilidades
Mayor mantenibilidad del sistema
