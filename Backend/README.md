# Backend - Campus IA

## Descripcion del proyecto

Backend de **Campus IA**, una API REST para un sistema de gestion universitaria desarrollada con Java y Spring Boot. El proyecto centraliza datos academicos y administrativos que pueden ser consumidos por un frontend.

El sistema permite:

- Autenticar usuarios con Google y con un acceso administrativo basico.
- Consultar alumnos, carreras, materias e inscripciones.
- Consultar mesas de examen.
- Consultar pagos, deudas y vencimientos.
- Marcar cuotas como pagadas.
- Enviar y consultar mensajes asociados a alumnos.
- Responder consultas mediante dos endpoints de chat: uno informativo general y otro vinculado a datos del alumno.

La logica de chat visible en los controladores actuales se basa principalmente en reglas de texto. El proyecto tambien incluye un `OpenAIService` preparado para clasificar intenciones con la API de OpenAI mediante la variable `OPENAI_API_KEY`.

## Tecnologias utilizadas

- Java 21
- Spring Boot 4.0.5
- Spring Web MVC
- Spring Data JPA
- Spring Validation
- PostgreSQL
- Maven / Maven Wrapper
- Lombok
- Spring Cloud Netflix Eureka Client, incluido como dependencia y deshabilitado por defecto en la configuracion local

## Requisitos

- JDK 21.
- PostgreSQL.
- Maven instalado o el wrapper incluido en el repositorio.
- Opcional: `OPENAI_API_KEY`, solo si se usa la funcionalidad conectada al `OpenAIService`.

## Instrucciones de ejecucion

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

### 2. Crear la base de datos

Crear una base de datos en PostgreSQL:

```sql
CREATE DATABASE universidad_db;
```

Este repositorio no incluye scripts SQL ni migraciones. La configuracion actual usa `spring.jpa.hibernate.ddl-auto=none`, por lo que la aplicacion espera que las tablas ya existan en la base de datos.

### 3. Configurar `application.properties`

Archivo:

```text
src/main/resources/application.properties
```

Ejemplo de configuracion local:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/universidad_db
spring.datasource.username=postgres
spring.datasource.password=TU_PASSWORD
eureka.client.enabled=false

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

openai.api.key=${OPENAI_API_KEY:}
server.port=8080
```

No se recomienda versionar credenciales reales. Usar valores locales o variables de entorno segun corresponda.

### 4. Configurar OpenAI, opcional

Si se va a usar `OpenAIService`, definir la variable de entorno antes de iniciar la aplicacion.

PowerShell:

```powershell
$env:OPENAI_API_KEY="TU_API_KEY"
```

Bash:

```bash
export OPENAI_API_KEY="TU_API_KEY"
```

Si esa funcionalidad no se utiliza, puede dejarse sin valor.

### 5. Ejecutar el backend

En Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

En Linux o macOS:

```bash
./mvnw spring-boot:run
```

Con Maven instalado globalmente:

```bash
mvn spring-boot:run
```

La API queda disponible en:

```text
http://localhost:8080
```

Algunos controladores tienen CORS habilitado para:

```text
http://localhost:5173
http://127.0.0.1:5173
```

## Endpoints principales

### Autenticacion

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `POST` | `/auth/google` | Login o registro a partir de datos de Google. |
| `POST` | `/auth/admin` | Login administrativo basico. |

Ejemplo para `/auth/admin`:

```json
{
  "usuario": "admin",
  "password": "123456"
}
```

Nota: esas credenciales estan definidas directamente en `AuthController` y deberian externalizarse antes de usar el proyecto en un entorno real.

### Alumnos

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `GET` | `/alumnos` | Lista todos los alumnos. |
| `GET` | `/alumnos/{id}/materias` | Devuelve las materias asociadas a un alumno. |
| `GET` | `/alumnos/{id}/materias-pendientes` | Devuelve inscripciones pendientes de un alumno. |
| `GET` | `/alumnos/{legajo}/pagos` | Devuelve pagos pendientes o la cuota actual segun el legajo. |

### Carreras y materias

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `GET` | `/carreras` | Lista todas las carreras. |
| `GET` | `/carreras/{id}/materias` | Lista materias de una carrera. |
| `GET` | `/materias/{id}/alumnos` | Lista alumnos asociados a una materia. |

### Mesas de examen

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `GET` | `/mesas` | Lista todas las mesas. |
| `GET` | `/mesas/proximas` | Lista mesas con fecha posterior al dia actual. |
| `GET` | `/mesas/proximas/materia/{id}` | Lista mesas proximas de una materia. |
| `GET` | `/mesas/proximas/buscar?materia={nombre}` | Busca mesas proximas por nombre de materia. |

### Pagos

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `POST` | `/pagos/pagar/{id}` | Marca un pago como pagado y registra la fecha de pago. |

### Mensajeria

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `POST` | `/mensajes/enviar` | Guarda un mensaje. |
| `GET` | `/mensajes/historial/{alumnoId}` | Devuelve mensajes asociados a un alumno. |

Ejemplo para `/mensajes/enviar`:

```json
{
  "alumnoId": 1,
  "profesorId": 2,
  "contenido": "Hola, tengo una consulta sobre la materia.",
  "emisor": "alumno"
}
```

### Chat

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `POST` | `/chat` | Responde consultas generales sobre inscripcion, costos, modalidad, ubicacion, infraestructura y salida laboral. |
| `POST` | `/chat-campus` | Responde consultas del alumno segun su legajo, por ejemplo materias cursando, pendientes, pagos y alertas. |

Ejemplo para `/chat`:

```json
{
  "mensaje": "Cuando abren las inscripciones?"
}
```

Ejemplo para `/chat-campus`:

```json
{
  "legajo": "123456",
  "mensaje": "Que materias estoy cursando?"
}
```

## Estructura del proyecto

```text
src/main/java/com/universidad/backend
|-- controller   # Endpoints REST
|-- dto          # Objetos de transferencia de datos
|-- model        # Entidades JPA
|-- repository   # Repositorios Spring Data JPA
`-- service      # Logica de negocio y servicios auxiliares
```

## Uso de IA

La inteligencia artificial se uso como apoyo durante el desarrollo y la documentacion del backend. Su uso estuvo orientado a acelerar tareas repetitivas, proponer estructuras iniciales, resolver errores y mejorar la redaccion tecnica. Las respuestas generadas fueron revisadas y ajustadas contra el codigo del proyecto.

Usos principales:

- Generacion inicial de controladores, servicios, repositorios y DTOs.
- Asistencia para consultas con Spring Data JPA y PostgreSQL.
- Identificacion de errores de persistencia, valores nulos y configuracion.
- Propuestas de organizacion por capas: `controller`, `service`, `repository`, `model` y `dto`.
- Redaccion y correccion del README.

Prompts documentados:

```text
Crear un endpoint en Spring Boot que obtenga las materias de un alumno desde una base de datos utilizando JPA.
```

```text
Tengo un error en PostgreSQL: null value in column 'dni' violates not-null constraint. Como lo soluciono?
```

```text
Como estructurar un proyecto Spring Boot separando Controller, Service y Repository?
```

```text
Necesito mejorar el README.md para que incluya descripcion del proyecto, instrucciones de ejecucion y explicacion del uso de IA con prompts incluidos.
```

Resultado del uso de IA:

- Se redujo el tiempo de armado inicial del backend.
- Se obtuvieron ejemplos para resolver problemas concretos de Spring Boot, Hibernate y PostgreSQL.
- Se mejoro la organizacion de la documentacion.
- Se corrigieron endpoints y configuraciones del README comparandolos con el codigo real.

## Notas importantes

- El endpoint correcto para pagar una cuota es `/pagos/pagar/{id}`.
- El historial de mensajes se consulta en `/mensajes/historial/{alumnoId}`.
- La configuracion actual no crea tablas automaticamente porque `ddl-auto` esta en `none`.
- El servicio de actualizacion de pagos vencidos se ejecuta periodicamente gracias a `@EnableScheduling` y `@Scheduled`.
