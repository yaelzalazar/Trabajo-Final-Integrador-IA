import { useEffect, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import './App.css'

const featureCards = [
  {
    number: '01',
    title: 'Carreras con enfoque actual',
    description:
      'Programas alineados con el mundo digital, la gestion, la innovacion y la empleabilidad real.',
  },
  {
    number: '02',
    title: 'Ingreso claro y sin friccion',
    description:
      'La home orienta, explica y acompana antes de pedir credenciales. Primero informamos, despues guiamos.',
  },
  {
    number: '03',
    title: 'Diseno amigable',
    description:
      'Lectura simple, navegacion intuitiva y llamados a la accion visibles para que nadie se pierda.',
  },
]

const showcaseCards = [
  {
    title: 'Campus conectado',
    description: 'Aulas dinamicas, recursos online, biblioteca digital y soporte permanente.',
    accent: true,
  },
  {
    title: 'Trayecto guiado',
    description: 'Desde admision hasta materias, pagos y documentos, todo en un recorrido simple.',
  },
  {
    title: 'Asistencia inteligente',
    description: 'Un asistente IA preparado para responder consultas academicas y administrativas.',
  },
]

function BrandMark() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Escudo Universidad Bullwaare">
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe8a3" />
          <stop offset="100%" stopColor="#f28b50" />
        </linearGradient>
      </defs>
      <path
        d="M60 10L103 29V55C103 80 85 103 60 110C35 103 17 80 17 55V29L60 10Z"
        fill="#102542"
      />
      <path
        d="M60 22L92 36V56C92 74 79 90 60 96C41 90 28 74 28 56V36L60 22Z"
        fill="url(#brandGradient)"
      />
      <path d="M42 48H78V55C78 67 70 74 60 77C50 74 42 67 42 55V48Z" fill="#102542" />
      <path d="M35 44L60 33L85 44L60 55L35 44Z" fill="#fefbf3" />
    </svg>
  )
}

function decodeJwtPayload(token) {
  const payload = token.split('.')[1]

  if (!payload) {
    throw new Error('No se pudo leer la respuesta de Google.')
  }

  const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
  const decodedPayload = window.atob(normalizedPayload)
  const bytes = Uint8Array.from(decodedPayload, (char) => char.charCodeAt(0))

  return JSON.parse(new TextDecoder().decode(bytes))
}
//Funcion para CampusView
function CampusView({ authenticatedUser, onLogout }) {
  const isProfessorView = authenticatedUser?.proveedor === 'ADMIN' || authenticatedUser?.legajo === 'ADMIN'
  const fullName =
    authenticatedUser?.usuario ??
    `${authenticatedUser?.nombre ?? ''} ${authenticatedUser?.apellido ?? ''}`.trim() ??
    'Alumno Bullwaare'

  const activeCourses = [
    {
      id: 'ARQ-301',
      backendId: 1,
      name: 'Arquitectura de Software',
      professorId: 1,
      professor: 'Prof. Mariana Costa',
      schedule: 'Lunes y miercoles · 19:00 a 21:00',
      progress: '72%',
      nextClass: 'Hoy · Aula virtual 2',
    },
    {
      id: 'BD-214',
      backendId: 2,
      name: 'Bases de Datos II',
      professorId: 2,
      professor: 'Prof. Nicolas Ferreyra',
      schedule: 'Martes · 18:30 a 22:00',
      progress: '58%',
      nextClass: 'Manana · Laboratorio 4',
    },
    {
      id: 'IA-402',
      backendId: 3,
      name: 'Inteligencia Artificial',
      professorId: 3,
      professor: 'Prof. Sofia Benitez',
      schedule: 'Viernes · 19:00 a 22:00',
      progress: '81%',
      nextClass: 'Viernes · Aula hibrida 7',
    },
  ]
  const pendingSubjects = [
    'Seguridad Informatica',
    'Gestion de Proyectos',
    'Legislacion y Etica Profesional',
  ]
  const upcomingEvaluations = [
    {
      subject: 'Base de Datos II',
      type: 'Primer parcial',
      date: '22 de abril',
    },
    {
      subject: 'Arquitectura de Software',
      type: 'Entrega integradora',
      date: '28 de abril',
    },
  ]
  const [campusChatOpen, setCampusChatOpen] = useState(true)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [campusMessages, setCampusMessages] = useState([
    {
      id: 'campus-welcome',
      role: 'ai',
      text: 'Consulta tu historial, mesas, materias pendientes, pagos y mas.',
    },
  ])
  //materias
  const [campusInput, setCampusInput] = useState('')
  const [campusChatLoading, setCampusChatLoading] = useState(false)
  const chatOptions = [
    { label: 'Materias que curso', message: '¿Qué materias estoy cursando?' },
    { label: 'Materias que debo', message: '¿Qué materias debo?' },
    { label: 'Recursadas', message: '¿Estoy recursando alguna materia?' },
    { label: 'Alertas', message: '¿Tengo alertas?' },
    { label: 'Pagos', message: '¿Cómo están mis pagos?' },
  ]
  const courseContentById = {
    'ARQ-301': {
      title: 'Arquitectura de Software',
      subtitle: 'Patrones, diseño de sistemas y organización de soluciones escalables',
      theme: 'architecture',
      sections: [
          {
            id: 'inicio',
            title: 'Inicio',
            items: [
              { type: 'Recurso', title: 'Programa del curso' },
              { type: 'Libro', title: 'Cronograma del curso' },
              { type: 'Foro', title: 'Foro de presentación y bienvenida' },
              { type: 'Foro', title: 'Novedades y anuncios' },
              { type: 'Foro', title: 'Foro de dudas y consultas' },
            ],
          },
          {
            id: 'unidad-1',
            title: 'Unidad 1: Organización general del computador',
            items: [
            { type: 'Recurso', title: 'Unidad 1 - Componentes y arquitectura básica.pdf' },
            { type: 'Tarea', title: 'Actividad 1: Identificación de capas y módulos' },
            { type: 'Clase', title: '[Clase en vivo] Introducción a la arquitectura de software - Miércoles 17:00' },
          ],
        },
        {
          id: 'unidad-2',
          title: 'Unidad 2: Patrones, componentes y escalabilidad',
          items: [
            { type: 'Recurso', title: 'Unidad 2 - Patrones de diseño y documentación.docx' },
            { type: 'Tarea', title: 'Trabajo práctico: diseño de arquitectura por capas' },
            { type: 'Clase', title: '[Clase en vivo] Servicios, desacoplamiento y escalabilidad - Miércoles 17:00' },
          ],
        },
      ],
      },
    'BD-214': {
      title: 'Bases de Datos II',
      subtitle: 'Modelado relacional, consultas avanzadas y optimización de datos',
      theme: 'database',
      sections: [
        {
          id: 'inicio',
          title: 'Inicio',
          items: [
            { type: 'Recurso', title: 'Programa del curso' },
            { type: 'Libro', title: 'Calendario de entregas y parciales' },
            { type: 'Foro', title: 'Novedades y anuncios de la cursada' },
            { type: 'Foro', title: 'Foro de consultas sobre SQL y modelado' },
          ],
        },
        {
          id: 'unidad-1',
          title: 'Unidad 1: Diseño relacional y normalización',
          items: [
            { type: 'Recurso', title: 'Unidad 1 - Normalización y dependencias funcionales.pdf' },
            { type: 'Tarea', title: 'Actividad 1: Modelo relacional de una biblioteca' },
            { type: 'Clase', title: '[Clase en vivo] Formas normales y buenas prácticas - Martes 19:00' },
          ],
        },
        {
          id: 'unidad-2',
          title: 'Unidad 2: Consultas SQL avanzadas',
          items: [
            { type: 'Recurso', title: 'Unidad 2 - Joins, subconsultas y vistas.docx' },
            { type: 'Tarea', title: 'Trabajo práctico: consultas complejas sobre ventas' },
            { type: 'Clase', title: '[Clase en vivo] Optimización de consultas y uso de índices - Martes 19:00' },
          ],
        },
        {
          id: 'unidad-3',
          title: 'Unidad 3: Transacciones, seguridad y rendimiento',
          items: [
            { type: 'Recurso', title: 'Unidad 3 - Transacciones ACID y control de concurrencia.pdf' },
            { type: 'Tarea', title: 'Actividad integradora: auditoría y permisos en base de datos' },
            { type: 'Clase', title: '[Clase en vivo] Seguridad, respaldos y recuperación - Martes 19:00' },
          ],
        },
      ],
    },
    'IA-402': {
      title: 'Inteligencia Artificial',
      subtitle: 'Modelos predictivos, aprendizaje automático y aplicaciones inteligentes',
      theme: 'ai',
      sections: [
        {
          id: 'inicio',
          title: 'Inicio',
          items: [
            { type: 'Recurso', title: 'Programa del curso' },
            { type: 'Libro', title: 'Cronograma de prácticas y evaluaciones' },
            { type: 'Foro', title: 'Novedades de la materia y anuncios de clase' },
            { type: 'Foro', title: 'Foro de consultas sobre modelos y ejercicios' },
          ],
        },
        {
          id: 'unidad-1',
          title: 'Unidad 1: Fundamentos de aprendizaje automático',
          items: [
            { type: 'Recurso', title: 'Unidad 1 - Introducción a machine learning.pdf' },
            { type: 'Tarea', title: 'Actividad 1: clasificación supervisada con datasets simples' },
            { type: 'Clase', title: '[Clase en vivo] Conceptos base y tipos de aprendizaje - Viernes 19:00' },
          ],
        },
        {
          id: 'unidad-2',
          title: 'Unidad 2: Redes neuronales y entrenamiento de modelos',
          items: [
            { type: 'Recurso', title: 'Unidad 2 - Redes neuronales artificiales.docx' },
            { type: 'Tarea', title: 'Trabajo práctico: entrenamiento y ajuste de hiperparámetros' },
            { type: 'Clase', title: '[Clase en vivo] Backpropagation y evaluación de modelos - Viernes 19:00' },
          ],
        },
        {
          id: 'unidad-3',
          title: 'Unidad 3: IA aplicada a productos y procesos',
          items: [
            { type: 'Recurso', title: 'Unidad 3 - Casos de uso de IA en industria y servicios.pdf' },
            { type: 'Tarea', title: 'Actividad integradora: propuesta de solución inteligente' },
            { type: 'Clase', title: '[Clase en vivo] Ética, sesgos y despliegue de modelos - Viernes 19:00' },
          ],
        },
      ],
    },
  }
  const selectedCourse = courseContentById[selectedCourseId] ?? null
  const selectedCourseMeta = activeCourses.find((course) => course.id === selectedCourseId) ?? null
  const selectedCourseProfessor = selectedCourseMeta?.professor ?? 'Prof. Mariana Costa'
  const selectedCourseProfessorId = selectedCourseMeta?.professorId ?? null
  const selectedCourseBackendId = selectedCourseMeta?.backendId ?? null
  const [subjectMessages, setSubjectMessages] = useState([])
  const [subjectChatInput, setSubjectChatInput] = useState('')
  const [subjectChatLoading, setSubjectChatLoading] = useState(false)
  const [courseStudents, setCourseStudents] = useState([])
  const [courseStudentsLoading, setCourseStudentsLoading] = useState(false)
  const [courseStudentsError, setCourseStudentsError] = useState('')

  const getResourceAccent = (type) => {
    if (type === 'Tarea') return 'is-task'
    if (type === 'Clase') return 'is-live'
    if (type === 'Libro') return 'is-book'
    if (type === 'Foro') return 'is-forum'
    return 'is-resource'
  }

  useEffect(() => {
    if (!isProfessorView && authenticatedUser?.id) {
      window.localStorage.setItem('bullwaare-last-student-id', String(authenticatedUser.id))
    }
  }, [authenticatedUser?.id, isProfessorView])

  const normalizeSubjectMessages = (messages) => {
    const filteredMessages = messages.filter((message) => {
      if (!selectedCourseProfessorId) {
        return true
      }

      return message.profesorId === selectedCourseProfessorId
    })

    if (!filteredMessages.length) {
      return [
        {
          id: 'subject-empty',
          role: 'teacher',
          text: isProfessorView
            ? 'Todavía no hay consultas de alumnos para esta cátedra.'
            : `Todavía no hay mensajes enviados a la cátedra de ${selectedCourse?.title}.`,
        },
      ]
    }

    return filteredMessages.map((message) => ({
      id: message.id ?? `${message.emisor}-${message.fecha ?? Math.random()}`,
      role: message.emisor === 'PROFESOR' ? 'teacher' : 'student',
      text: message.contenido,
    }))
  }

  const loadSubjectMessages = async () => {
    if (!selectedCourseId) {
      return
    }

    const resolvedAlumnoId = isProfessorView
      ? window.localStorage.getItem('bullwaare-last-student-id')
      : authenticatedUser?.id

    if (!resolvedAlumnoId) {
      setSubjectMessages([
        {
          id: 'subject-no-student',
          role: 'teacher',
          text: isProfessorView
            ? 'Cuando un alumno envíe una consulta sobre esta materia, el historial aparecerá acá.'
            : 'Todavía no pude identificar tu usuario para cargar el historial de mensajes.',
        },
      ])
      return
    }

    setSubjectChatLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/mensajes/historial/${resolvedAlumnoId}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'No se pudo cargar el historial de mensajes de esta materia.')
      }

      const messages = await response.json()
      setSubjectMessages(normalizeSubjectMessages(Array.isArray(messages) ? messages : []))
    } catch (error) {
      setSubjectMessages([
        {
          id: 'subject-history-error',
          role: 'teacher',
          text: error instanceof Error ? error.message : 'Ocurrió un error al cargar el historial de la materia.',
        },
      ])
    } finally {
      setSubjectChatLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCourseId) {
      setSubjectChatInput('')
      loadSubjectMessages()
      return
    }

    setSubjectMessages([])
    setSubjectChatInput('')
  }, [selectedCourseId, authenticatedUser?.id, isProfessorView])

  useEffect(() => {
    const loadCourseStudents = async () => {
      if (!isProfessorView || !selectedCourseBackendId) {
        setCourseStudents([])
        setCourseStudentsError('')
        setCourseStudentsLoading(false)
        return
      }

      setCourseStudentsLoading(true)
      setCourseStudentsError('')

      try {
        const response = await fetch(`http://localhost:8080/materias/${selectedCourseBackendId}/alumnos`)

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || 'No se pudo cargar la lista de alumnos de esta materia.')
        }

        const students = await response.json()
        setCourseStudents(Array.isArray(students) ? students : [])
      } catch (error) {
        setCourseStudents([])
        setCourseStudentsError(
          error instanceof Error ? error.message : 'Ocurrió un error al cargar los alumnos de la materia.'
        )
      } finally {
        setCourseStudentsLoading(false)
      }
    }

    loadCourseStudents()
  }, [isProfessorView, selectedCourseBackendId])

  const handleSubjectMessageSubmit = async () => {
    const nextMessage = subjectChatInput.trim()
    const resolvedAlumnoId = isProfessorView
      ? window.localStorage.getItem('bullwaare-last-student-id')
      : authenticatedUser?.id

    if (!nextMessage || subjectChatLoading || !resolvedAlumnoId || !selectedCourseProfessorId) {
      return
    }

    setSubjectChatLoading(true)

    try {
      const response = await fetch('http://localhost:8080/mensajes/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alumnoId: Number(resolvedAlumnoId),
          profesorId: selectedCourseProfessorId,
          contenido: nextMessage,
          emisor: isProfessorView ? 'PROFESOR' : 'ALUMNO',
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'No se pudo enviar el mensaje a la cátedra.')
      }

      if (!isProfessorView && authenticatedUser?.id) {
        window.localStorage.setItem('bullwaare-last-student-id', String(authenticatedUser.id))
      }
      setSubjectChatInput('')
      await loadSubjectMessages()
    } catch (error) {
      setSubjectMessages((current) => [
        ...current,
        {
          id: `subject-send-error-${Date.now()}`,
          role: 'teacher',
          text: error instanceof Error ? error.message : 'Ocurrió un error al enviar tu consulta.',
        },
      ])
      setSubjectChatLoading(false)
    }
  }

  const handleCampusChatSubmit = async (messageOverride) => {
    const nextMessage = (messageOverride ?? campusInput).trim()

    if (!nextMessage || campusChatLoading) {
      return
    }

    if (!authenticatedUser?.legajo) {
      setCampusMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-campus-error`,
          role: 'ai',
          text: 'No pude identificar el legajo del alumno para consultar el campus.',
        },
      ])
      return
    }

    setCampusMessages((current) => [
      ...current,
      { id: `${Date.now()}-campus-user`, role: 'user', text: nextMessage },
    ])
    setCampusInput('')
    setCampusChatLoading(true)

    try {
      const [response] = await Promise.all([
        fetch('http://localhost:8080/chat-campus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mensaje: nextMessage,
            legajo: String(authenticatedUser.legajo),
          }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, 1100)),
      ])

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'No se pudo consultar el chat del campus.')
      }

      const data = await response.json()

      setCampusMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-campus-ai`,
          role: 'ai',
          text: data.respuesta || 'No recibi una respuesta valida desde el campus.',
        },
      ])
    } catch (error) {
      setCampusMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-campus-ai-error`,
          role: 'ai',
          text: error instanceof Error ? error.message : 'Ocurrio un error al consultar el campus.',
        },
      ])
    } finally {
      setCampusChatLoading(false)
    }
  }

  return (
    <div className="campus-page">
      <header className="campus-header">
        <div className="campus-brand">
          <span className="brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <div className="campus-brand-copy">
            <strong>Campus Bullwaare</strong>
            <span>{isProfessorView ? 'Espacio academico del profesor' : 'Espacio academico del alumno'}</span>
          </div>
        </div>

        <div className="campus-profile">
          <div className="profile-avatar" aria-hidden="true">
            {authenticatedUser?.nombre?.[0] ?? authenticatedUser?.usuario?.[0] ?? 'A'}
          </div>
          <div className="profile-copy">
            <strong>{fullName}</strong>
            <span>Legajo {authenticatedUser?.legajo}</span>
          </div>
          <button className="profile-logout" type="button" onClick={onLogout}>
            Salir
          </button>
        </div>
      </header>

      <main className="campus-main">
        {selectedCourse ? (
          <section className={`course-detail-view theme-${selectedCourse.theme ?? 'default'}`}>
            <div className="course-detail-hero">
              <div>
                <p className="eyebrow">Curso activo</p>
                <h1 className="course-detail-title">{selectedCourse.title}</h1>
                <p className="course-detail-subtitle">{selectedCourse.subtitle}</p>
                <button className="course-back-button" type="button" onClick={() => setSelectedCourseId(null)}>
                  Volver al campus
                </button>
              </div>
            </div>

            <div className="course-section-stack">
              {selectedCourse.sections.map((section) => (
                <section className="course-module" key={section.id}>
                  <header className="course-module-header">
                    <strong>{section.title}</strong>
                    <span>Disponible</span>
                  </header>

                  <div className="course-module-list">
                    {section.items.map((item) => (
                      <article className="course-module-item" key={`${section.id}-${item.title}`}>
                        <div className={`course-module-icon ${getResourceAccent(item.type)}`}>
                          <span>{item.type.slice(0, 1)}</span>
                        </div>
                        <div className="course-module-copy">
                          <small>{item.type}</small>
                          <strong>{item.title}</strong>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {isProfessorView ? (
              <section className="course-roster-card">
                <div className="course-roster-header">
                  <div>
                    <p className="eyebrow">Listado de cursada</p>
                    <h2>Alumnos inscriptos</h2>
                  </div>
                  <div className="course-roster-badge">
                    {courseStudentsLoading ? 'Cargando...' : `${courseStudents.length} alumno(s)`}
                  </div>
                </div>

                {courseStudentsError ? <div className="course-roster-empty">{courseStudentsError}</div> : null}

                {!courseStudentsError && !courseStudentsLoading && !courseStudents.length ? (
                  <div className="course-roster-empty">Todavía no hay alumnos asociados a esta materia.</div>
                ) : null}

                {courseStudents.length ? (
                  <div className="course-roster-list">
                    {courseStudents.map((student) => (
                      <article className="course-roster-item" key={student.id ?? `${student.nombre}-${student.apellido}`}>
                        <div className="course-roster-avatar" aria-hidden="true">
                          {student.nombre?.[0] ?? 'A'}
                        </div>
                        <div className="course-roster-copy">
                          <strong>{`${student.nombre ?? ''} ${student.apellido ?? ''}`.trim()}</strong>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}

            <section className="teacher-chat-preview">
              <div className="teacher-chat-header">
                <div>
                  <p className="eyebrow">Canal docente</p>
                  <h2>Chat con la cátedra</h2>
                  <span>{selectedCourseProfessor}</span>
                </div>
                <div className="teacher-chat-badge">{isProfessorView ? 'Solo lectura' : 'Mensajería activa'}</div>
              </div>

              <div className="teacher-chat-window">
                {subjectMessages.map((message) => (
                  <div className={`teacher-chat-message ${message.role}`} key={message.id}>
                    {message.text}
                  </div>
                ))}

                {subjectChatLoading ? (
                  <div className="teacher-chat-message teacher teacher-chat-loading" aria-label="Cargando historial o enviando mensaje">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : null}
              </div>

              <div className="teacher-chat-input">
                <input
                  type="text"
                  placeholder={
                    isProfessorView
                      ? 'Escribí tu respuesta para el alumno de esta cátedra...'
                      : 'Escribí tu consulta para la cátedra...'
                  }
                  value={subjectChatInput}
                  disabled={subjectChatLoading}
                  onChange={(event) => setSubjectChatInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      handleSubjectMessageSubmit()
                    }
                  }}
                />
                <button type="button" disabled={subjectChatLoading} onClick={handleSubjectMessageSubmit}>
                  Enviar
                </button>
              </div>
            </section>
          </section>
        ) : (
          <>
        <section className="campus-hero">
          <div className="campus-welcome">
            <p className="eyebrow">{isProfessorView ? 'Panel docente' : 'Bienvenido al campus'}</p>
            <h1 className="campus-title">{isProfessorView ? 'Profesor de la catedra' : fullName}</h1>
            <p>
              {isProfessorView
                ? 'Desde este espacio vas a poder acompañar cursadas, responder consultas y gestionar la experiencia academica de tus estudiantes.'
                : 'Tu ingreso con Google ya fue validado contra el backend. Desde aca vamos a construir la experiencia del alumno con materias, pagos, documentos y el chat IA.'}
            </p>
          </div>

          <div className="campus-summary-card">
            <strong>Acceso confirmado</strong>
            <span>Email: {authenticatedUser?.email}</span>
            <span>Legajo: {authenticatedUser?.legajo}</span>
          </div>
        </section>

        <section className="course-section">
          <div className="course-section-header">
            <div>
              <p className="eyebrow">{isProfessorView ? 'Materias asignadas' : 'Materias en cursada'}</p>
              <h2>{isProfessorView ? 'Materias que estas dando' : 'Tus materias activas'}</h2>
            </div>
            <div className="course-summary-pill">
              <strong>{activeCourses.length}</strong>
              <span>materias este cuatrimestre</span>
            </div>
          </div>

          {!isProfessorView ? (
            <div className="subject-overview-grid">
              <article className="subject-overview-card">
                <strong>{activeCourses.length}</strong>
                <span>En cursada</span>
              </article>
              <article className="subject-overview-card">
                <strong>{pendingSubjects.length}</strong>
                <span>Pendientes</span>
              </article>
              <article className="subject-overview-card">
                <strong>{upcomingEvaluations.length}</strong>
                <span>Próximas evaluaciones</span>
              </article>
            </div>
          ) : null}

          <div className="course-grid">
            {activeCourses.map((course) => (
              <article
                className="course-card"
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedCourseId(course.id)
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="course-card-top">
                  <span className="course-code">{course.id}</span>
                  <span className="course-progress">{course.progress}</span>
                </div>
                <h3>{course.name}</h3>
                <p>{course.professor}</p>
                <ul className="course-meta">
                  <li>{course.schedule}</li>
                  <li>Proxima clase: {course.nextClass}</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        {isProfessorView ? (
          <>
            <section className="subject-detail-grid">
              <article className="campus-card campus-card-wide">
                <h2>Seguimiento de cursos</h2>
                <p>Accede rápido al estado general de tus materias, contenidos activos y espacios de consulta con estudiantes.</p>

                <div className="subject-list-block">
                  <strong>Cátedras a cargo</strong>
                  <ul className="subject-chip-list">
                    {activeCourses.map((course) => (
                      <li key={course.id}>{course.name}</li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="campus-card campus-card-wide">
                <h2>Próximas actividades</h2>
                <div className="upcoming-evaluations">
                  <div className="evaluation-item">
                    <strong>Arquitectura de Software</strong>
                    <span>Revisión de trabajos prácticos</span>
                    <small>22 de abril</small>
                  </div>
                  <div className="evaluation-item">
                    <strong>Bases de Datos II</strong>
                    <span>Publicación de consignas del parcial</span>
                    <small>24 de abril</small>
                  </div>
                </div>
              </article>
            </section>

            <section className="campus-grid">
              <article className="campus-card">
                <h2>Mensajes</h2>
                <p>Gestiona consultas recibidas, responde dudas y acompaña el intercambio con tus estudiantes.</p>
              </article>
              <article className="campus-card">
                <h2>Materiales</h2>
                <p>Organiza recursos, guías, consignas y archivos para cada una de las materias que dictás.</p>
              </article>
              <article className="campus-card">
                <h2>Evaluaciones</h2>
                <p>Prepará entregas, parciales y devoluciones con una vista simple de seguimiento académico.</p>
              </article>
            </section>
          </>
        ) : (
          <>
            <section className="subject-detail-grid">
              <article className="campus-card campus-card-wide">
                <h2>Materias</h2>
                <p>Consulta tu historial academico, correlativas, pendientes y proximos examenes desde un solo lugar.</p>

                <div className="subject-list-block">
                  <strong>Materias pendientes</strong>
                  <ul className="subject-chip-list">
                    {pendingSubjects.map((subject) => (
                      <li key={subject}>{subject}</li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="campus-card campus-card-wide">
                <h2>Próximas evaluaciones</h2>
                <div className="upcoming-evaluations">
                  {upcomingEvaluations.map((evaluation) => (
                    <div className="evaluation-item" key={`${evaluation.subject}-${evaluation.date}`}>
                      <strong>{evaluation.subject}</strong>
                      <span>{evaluation.type}</span>
                      <small>{evaluation.date}</small>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="campus-grid">
              <article className="campus-card">
                <h2>Pagos</h2>
                <p>Visualiza cuotas, vencimientos, estado de cuenta y comprobantes asociados a tu perfil.</p>
              </article>
              <article className="campus-card">
                <h2>Mesas futuras</h2>
                <p>Consulta proximos llamados, fechas estimadas de examen y materias habilitadas para inscripcion.</p>
              </article>
              <article className="campus-card">
                <h2>Documentos</h2>
                <p>Descarga certificados, constancias academicas, comprobantes y archivos oficiales en PDF.</p>
              </article>
            </section>
          </>
        )}
          </>
        )}
      </main>

      {!selectedCourse && !isProfessorView ? <div className={`campus-chat-widget ${campusChatOpen ? 'is-open' : ''}`}>
        {campusChatOpen ? (
          <section className="campus-chat-panel" aria-label="Asistente virtual del campus">
            <header className="campus-chat-header">
              <div>
                <strong>Bullwaare Virtual</strong>
                <span>Asistente del campus</span>
              </div>
              <button className="campus-chat-toggle" type="button" onClick={() => setCampusChatOpen(false)} aria-label="Minimizar chat">
                ×
              </button>
            </header>

            <div className="campus-chat-body">
              <div className="campus-chat-messages">
                {campusMessages.map((message) => (
                  <div key={message.id} className={`campus-chat-bubble ${message.role}`}>
                    {message.text}
                  </div>
                ))}

                {campusChatLoading ? (
                  <div className="campus-chat-bubble ai campus-chat-typing" aria-label="Bullwaare está escribiendo">
                    <div className="campus-chat-typing-copy">
                      <strong>Bullwaare</strong>
                      <small>esta escribiendo...</small>
                    </div>
                    <div className="campus-chat-typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="campus-chat-options">
                {chatOptions.map((option) => (
                  <button
                    key={option.label}
                    className="campus-chat-option"
                    type="button"
                    disabled={campusChatLoading}
                    onClick={() => handleCampusChatSubmit(option.message)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <footer className="campus-chat-footer">
              <input
                type="text"
                placeholder="Escribi tu consulta..."
                value={campusInput}
                onChange={(event) => setCampusInput(event.target.value)}
                disabled={campusChatLoading}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleCampusChatSubmit()
                  }
                }}
              />
              <button
                className="campus-chat-send"
                type="button"
                disabled={campusChatLoading}
                onClick={() => handleCampusChatSubmit()}
              >
                Enviar
              </button>
            </footer>
          </section>
        ) : (
          <button className="campus-chat-fab" type="button" onClick={() => setCampusChatOpen(true)} aria-label="Abrir asistente virtual">
            Chat Bullwaare
          </button>
        )}
      </div> : null}
    </div>
  )
}

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(() => {
    const storedUser = window.localStorage.getItem('bullwaare-campus-user')

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser)
    } catch {
      window.localStorage.removeItem('bullwaare-campus-user')
      return null
    }
  })
  const [currentView, setCurrentView] = useState(() =>
    window.localStorage.getItem('bullwaare-campus-user') ? 'campus' : 'public'
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatEnabled, setChatEnabled] = useState(false)
  const [activeNav, setActiveNav] = useState('')
  const [loginOpen, setLoginOpen] = useState(false)
  const [loginMode, setLoginMode] = useState('student')
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false)
  const [googleAuthError, setGoogleAuthError] = useState('')
  const [googleAuthUser, setGoogleAuthUser] = useState(null)
  const [professorCredentials, setProfessorCredentials] = useState({
    username: '',
    password: '',
  })
  const [professorAuthLoading, setProfessorAuthLoading] = useState(false)
  const [professorAuthError, setProfessorAuthError] = useState('')
  const [admissionMessages, setAdmissionMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      text: 'Hola, soy el asistente de Bullwaare. Puedo ayudarte a conocer carreras, modalidad, becas y proceso de admisión.',
    },
  ])
  const [admissionInput, setAdmissionInput] = useState('')
  const [admissionLoading, setAdmissionLoading] = useState(false)
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [currentView])

  useEffect(() => {
    if (authenticatedUser) {
      window.localStorage.setItem('bullwaare-campus-user', JSON.stringify(authenticatedUser))
      return
    }

    window.localStorage.removeItem('bullwaare-campus-user')
  }, [authenticatedUser])

  const closeMenu = () => setMenuOpen(false)

  const animateScrollTo = (targetY) => {
    const startY = window.scrollY
    const distance = targetY - startY
    const duration = 650
    let startTime = null

    const easeInOutCubic = (progress) => {
      if (progress < 0.5) {
        return 4 * progress * progress * progress
      }

      return 1 - Math.pow(-2 * progress + 2, 3) / 2
    }

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      window.scrollTo({
        top: startY + distance * easedProgress,
        behavior: 'auto',
      })

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  const selectNav = (sectionId) => {
    setActiveNav(sectionId)
    closeMenu()

    window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId)
      const header = document.querySelector('.site-header')

      if (!section) {
        return
      }

      const headerOffset = header instanceof HTMLElement ? header.offsetHeight + 18 : 96
      const targetPosition = section.getBoundingClientRect().top + window.scrollY - headerOffset

      animateScrollTo(Math.max(targetPosition, 0))

      section.classList.remove('section-focus')

      window.setTimeout(() => {
        section.classList.add('section-focus')
        window.setTimeout(() => {
          section.classList.remove('section-focus')
        }, 1200)
      }, 240)
    })
  }

  const openChat = () => {
    setChatEnabled(true)
    selectNav('chat-ia')
  }

  const openLogin = () => {
    setLoginOpen(true)
    setLoginMode('student')
    setGoogleAuthError('')
    setGoogleAuthUser(null)
    setProfessorAuthError('')
    setProfessorAuthLoading(false)
    setProfessorCredentials({
      username: '',
      password: '',
    })
    closeMenu()
  }

  const closeLogin = () => {
    setLoginOpen(false)
    setGoogleAuthLoading(false)
    setLoginMode('student')
    setProfessorAuthError('')
    setProfessorAuthLoading(false)
  }

  const logoutCampus = () => {
    setAuthenticatedUser(null)
    setGoogleAuthUser(null)
    setActiveNav('')
    setCurrentView('public')
    setLoginOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoogleCampusLogin = async (googleProfile) => {
    setGoogleAuthLoading(true)
    setGoogleAuthError('')

    try {
      const response = await fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleProfile),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'No se pudo iniciar sesion con Google.')
      }

      const user = await response.json()
      setGoogleAuthUser(user)
      setAuthenticatedUser(user)
      setCurrentView('campus')
      setLoginOpen(false)
    } catch (error) {
      setGoogleAuthError(error instanceof Error ? error.message : 'Ocurrio un error inesperado al conectar con el campus.')
    } finally {
      setGoogleAuthLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('Google no devolvio la credencial esperada.')
      }

      const payload = decodeJwtPayload(credentialResponse.credential)

      await handleGoogleCampusLogin({
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
      })
    } catch (error) {
      setGoogleAuthError(error instanceof Error ? error.message : 'No se pudo procesar el acceso con Google.')
    }
  }

  const handleGoogleError = () => {
    setGoogleAuthError('Google no pudo completar la autenticacion. Revisa tu configuracion e intenta nuevamente.')
  }

  const openProfessorAccess = () => {
    setLoginMode('professor')
    setGoogleAuthError('')
    setGoogleAuthUser(null)
    setProfessorAuthError('')
  }

  const openStudentAccess = () => {
    setLoginMode('student')
    setProfessorAuthError('')
    setProfessorAuthLoading(false)
  }

  const handleProfessorCredentialChange = (field, value) => {
    setProfessorCredentials((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleProfessorSubmit = async (event) => {
    event.preventDefault()
    setProfessorAuthError('')

    if (!professorCredentials.username.trim() || !professorCredentials.password.trim()) {
      setProfessorAuthError('Completá usuario y contraseña para ingresar como profesor.')
      return
    }

    setProfessorAuthLoading(true)

    try {
      const response = await fetch('http://localhost:8080/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: professorCredentials.username.trim(),
          password: professorCredentials.password,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          errorText && errorText.trim().startsWith('{')
            ? 'Credenciales incorrectas.'
            : errorText || 'No se pudo iniciar sesión como profesor.'
        )
      }

      const user = await response.json()
      setAuthenticatedUser(user)
      setGoogleAuthUser(null)
      setCurrentView('campus')
      setLoginOpen(false)
    } catch (error) {
      setProfessorAuthError(error instanceof Error ? error.message : 'Ocurrió un error al ingresar como profesor.')
    } finally {
      setProfessorAuthLoading(false)
    }
  }

  const fetchCareers = async () => {
    const response = await fetch('http://localhost:8080/carreras')

    if (!response.ok) {
      throw new Error('No pude consultar las carreras en este momento.')
    }

    return response.json()
  }

  const fetchCareerSubjects = async (careerId) => {
    const response = await fetch(`http://localhost:8080/carreras/${careerId}/materias`)

    if (!response.ok) {
      throw new Error('No pude consultar las materias de esa carrera.')
    }

    return response.json()
  }

  const fetchAdmissionChatReply = async (message) => {
    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensaje: message,
      }),
    })

    if (!response.ok) {
      throw new Error('No pude consultar el asistente de admisiones en este momento.')
    }

    return response.json()
  }

  const findCareerByQuery = (careers, normalizedText) => {
    const normalizedWords = normalizedText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 2)

    return careers.find((career) => {
      const normalizedCareerName = career.nombre
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

      return normalizedWords.some((word) => normalizedCareerName.includes(word))
    })
  }

  const resolveAdmissionReply = async (text) => {
    const normalizedText = text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?.,]/g, '')

    if (!normalizedText) {
      return 'Contame qué te gustaría saber sobre carreras, materias o duración y te oriento.'
    }

    const careers = await fetchCareers()

    const asksForLongestCareer =
      (normalizedText.includes('carrera') && normalizedText.includes('dura mas')) ||
      (normalizedText.includes('carrera') && normalizedText.includes('mas larga')) ||
      (normalizedText.includes('carrera') && normalizedText.includes('mayor duracion')) ||
      (normalizedText.includes('cual dura mas')) ||
      (normalizedText.includes('que carrera dura mas'))

    if (asksForLongestCareer) {
      const longestCareer = careers.reduce((currentLongest, career) =>
        career.duracionAnios > currentLongest.duracionAnios ? career : currentLongest
      )

      return `${longestCareer.nombre} es una de las carreras más extensas, con ${longestCareer.duracionAnios} años y ${longestCareer.cantidadMaterias} materias.`
    }

    if (
      normalizedText.includes('que materias tiene') ||
      normalizedText.includes('materias de') ||
      normalizedText.includes('materias tiene')
    ) {
      const matchedCareer = findCareerByQuery(careers, normalizedText)

      if (!matchedCareer) {
        return 'No pude identificar la carrera en tu consulta. Probá con un nombre como “Ingeniería en Sistemas”, “Ciencia de Datos” o “Licenciatura en Informática”.'
      }

      const subjects = await fetchCareerSubjects(matchedCareer.id)
      const visibleSubjects = subjects.slice(0, 6).map((subject) => `- ${subject.nombre} (${subject.codigo})`)

      return `${matchedCareer.nombre}\n\nAlgunas materias de esta carrera son:\n${visibleSubjects.join('\n')}\n\nTotal registradas: ${subjects.length} materias.`
    }

    if (normalizedText.includes('que carrera tiene')) {
      const matchedCareer = findCareerByQuery(careers, normalizedText)

      if (!matchedCareer) {
        return 'No encontré una carrera asociada a esa búsqueda. Si querés, consultame por nombres como Programación, Ciencia de Datos o Ingeniería en Sistemas.'
      }

      return `${matchedCareer.nombre}\n\nDuración: ${matchedCareer.duracionAnios} años\nCantidad de materias: ${matchedCareer.cantidadMaterias}`
    }

    if (normalizedText.includes('carreras') || normalizedText.includes('que opciones hay')) {
      const visibleCareers = careers.slice(0, 6)
      const names = visibleCareers.map((career) => `- ${career.nombre} (${career.duracionAnios} años)`)

      return `Estas son algunas carreras disponibles:\n\n${names.join('\n')}`
    }

    const chatReply = await fetchAdmissionChatReply(text)

    if (chatReply?.respuesta) {
      return chatReply.respuesta
    }

    return 'Puedo ayudarte con carreras disponibles, materias por carrera, duración, inscripción, requisitos y costos. Probá con otra pregunta.'
  }

  const handleAdmissionSubmit = async () => {
    const trimmedInput = admissionInput.trim()

    if (!trimmedInput || admissionLoading) {
      return
    }

    setChatEnabled(true)
    setActiveNav('chat-ia')
    setAdmissionMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: 'user', text: trimmedInput },
    ])
    setAdmissionInput('')
    setAdmissionLoading(true)

    try {
      const [reply] = await Promise.all([
        resolveAdmissionReply(trimmedInput),
        new Promise((resolve) => window.setTimeout(resolve, 1200)),
      ])

      setAdmissionMessages((current) => [
        ...current,
        { id: `${Date.now()}-ai`, role: 'ai', text: reply },
      ])
    } catch (error) {
      setAdmissionMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-ai-error`,
          role: 'ai',
          text: error instanceof Error ? error.message : 'Ocurrió un error al consultar admisiones.',
        },
      ])
    } finally {
      setAdmissionLoading(false)
    }
  }

  if (currentView === 'campus' && authenticatedUser) {
    return <CampusView authenticatedUser={authenticatedUser} onLogout={logoutCampus} />
  }

  return (
    <>
      <div className="page-shell">
        <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Inicio Universidad Bullwaare" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">
            <BrandMark />
          </span>
          <span className="brand-text">
            <strong>Universidad Bullwaare</strong>
            <small>Formacion para el mundo que viene</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((current) => !current)}
        >
          Menu
        </button>

        <div className="header-actions">
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} id="main-nav">
            <button className={`nav-cta ${activeNav === 'chat-ia' ? 'is-active' : ''}`} type="button" onClick={openChat}>
              Quiero estudiar
            </button>
            <a
              href="#propuesta"
              className={activeNav === 'propuesta' ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault()
                selectNav('propuesta')
              }}
            >
              Propuesta
            </a>
            <a
              href="#campus"
              className={activeNav === 'campus' ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault()
                selectNav('campus')
              }}
            >
              Portal
            </a>
            <a
              href="#experiencia"
              className={activeNav === 'experiencia' ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault()
                selectNav('experiencia')
              }}
            >
              Experiencia
            </a>
            <a
              href="#portal"
              className={activeNav === 'portal' ? 'is-active' : ''}
              onClick={(event) => {
                event.preventDefault()
                selectNav('portal')
              }}
            >
              Campus
            </a>
          </nav>
        </div>
        </header>

        <main>
          <section className="hero" id="inicio">
          <div className="hero-copy reveal" data-reveal>
            <p className="eyebrow">Innovacion academica con mirada humana</p>
            <h1>La universidad donde tu futuro empieza con una experiencia simple, cercana y potente.</h1>
            <p className="hero-text">
              En Bullwaare combinamos formacion universitaria, tecnologia y acompanamiento real para que estudiar se
              sienta claro desde el primer dia.
            </p>

            <ul className="hero-metrics" aria-label="Datos destacados de la universidad">
              <li>
                <strong>+40</strong>
                <span>programas y trayectos</span>
              </li>
              <li>
                <strong>92%</strong>
                <span>alumnos con seguimiento personalizado</span>
              </li>
              <li>
                <strong>24/7</strong>
                <span>campus y asistencia digital</span>
              </li>
            </ul>
          </div>

          <div className="hero-visual reveal" data-reveal>
            <div className="floating-card glass">
              <span className="card-kicker">Asistente academico IA</span>
              <h2>Tu universidad, mas facil de entender.</h2>
              <div className="chat-demo">
                <div className="chat-row user">Que materias me faltan?</div>
                <div className="chat-row bot">Te muestro pendientes, correlativas y fechas clave en segundos.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-grid" id="propuesta">
          <div className="section-heading reveal" data-reveal>
            <p className="eyebrow">Propuesta Bullwaare</p>
            <h2>Una portada pensada para quienes todavia estan decidiendo.</h2>
          </div>

          <div className="feature-grid">
            {featureCards.map((card) => (
              <article className="feature-card reveal" data-reveal key={card.number}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`chat-section ${chatEnabled ? 'is-active' : ''}`} id="chat-ia">
          <div className="section-heading reveal" data-reveal>
            <p className="eyebrow">Chat IA Bullwaare</p>
            <h2>Un primer espacio para que futuros alumnos consulten y se orienten.</h2>
          </div>

          <div className="chat-shell reveal" data-reveal>
            <div className="chat-shell-header">
              <div>
                <strong>Asistente de admisiones</strong>
                <span>{chatEnabled ? 'Chat habilitado' : 'Activalo desde "Quiero estudiar"'}</span>
              </div>
              <span className={`chat-status ${chatEnabled ? 'is-on' : ''}`}>{chatEnabled ? 'En linea' : 'En espera'}</span>
            </div>

            <div className="chat-shell-body">
              {admissionMessages.map((message) => (
                <div key={message.id} className="chat-message-group">
                  <div className={`chat-message ${message.role === 'ai' ? 'ai' : 'user'}`}>{message.text}</div>
                </div>
              ))}
              <div className="chat-placeholder chat-reference">
                Para interactuar con el chat, preguntá por ejemplo: “¿Qué carreras tienen?”, “¿Qué materias tiene Ingeniería?” o “¿Qué carrera dura más?”.
              </div>
              {admissionLoading ? (
                <div className="chat-message ai typing-indicator" aria-label="El asistente está escribiendo">
                  <div className="typing-copy">
                    <strong>Bullwaare</strong>
                    <small>está escribiendo...</small>
                  </div>
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="chat-input-row">
              <input
                type="text"
                placeholder='Escribi tu consulta sobre admisiones...'
                value={admissionInput}
                onChange={(event) => setAdmissionInput(event.target.value)}
                onFocus={() => setChatEnabled(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    handleAdmissionSubmit()
                  }
                }}
              />
              <button className="button button-primary" type="button" onClick={handleAdmissionSubmit}>
                Enviar
              </button>
            </div>
          </div>
        </section>

        <section className="campus-showcase" id="campus">
          <div className="showcase-copy reveal" data-reveal>
            <p className="eyebrow">Vida universitaria</p>
            <h2>Una experiencia que mezcla campus, comunidad y herramientas digitales.</h2>
            <p>
              La pagina principal no solo vende una carrera: transmite confianza. Por eso Bullwaare muestra desde el
              inicio como se estudia, como se acompana y como se accede al ecosistema del alumno.
            </p>
          </div>

          <div className="showcase-panels">
            {showcaseCards.map((card) => (
              <article
                className={`showcase-card reveal ${card.accent ? 'accent-card' : ''}`}
                data-reveal
                key={card.title}
              >
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-strip" id="experiencia">
          <div className="strip-card reveal" data-reveal>
            <h2>Una experiencia universitaria pensada para acompanarte en cada etapa.</h2>
            <ul>
              <li>Orientacion clara para futuros alumnos desde el primer contacto con la universidad.</li>
              <li>Acceso simple al portal academico para gestionar materias, pagos y documentos.</li>
              <li>Acompanamiento digital con herramientas pensadas para una experiencia mas cercana y agil.</li>
              <li>Propuesta educativa conectada con innovacion, comunidad y crecimiento profesional.</li>
            </ul>
          </div>
        </section>

        <section className="portal-section" id="portal">
          <div className="portal-copy reveal" data-reveal>
            <p className="eyebrow">Portal del alumno</p>
            <h2>Cuando el estudiante ya tiene cuenta, entra desde aca.</h2>
            <p>
              La home publica convive con el acceso al sistema. Asi la web sirve tanto para atraer nuevos alumnos como
              para acompanar a quienes ya cursan en Bullwaare.
            </p>
          </div>

          <div className="portal-card reveal" data-reveal>
            <div className="portal-card-header">
              <strong>Acceso rapido</strong>
              <span>Portal Inteligente Universitario</span>
            </div>
            <div className="portal-actions">
                <button className="button button-primary" type="button" onClick={openLogin}>
                  Ingresar al campus
                </button>
              </div>
            </div>
          </section>

        <section className="cta-banner reveal" data-reveal id="admisiones">
          <div>
            <p className="eyebrow">Admisiones Bullwaare</p>
            <h2>Elegi una universidad que se sienta actual desde su primera pantalla.</h2>
          </div>
        </section>
        </main>
      </div>

      {loginOpen ? (
        <div className="login-overlay" role="dialog" aria-modal="true" aria-labelledby="login-title" onClick={closeLogin}>
          <div className="login-modal" onClick={(event) => event.stopPropagation()}>
            <button className="login-close" type="button" aria-label="Cerrar login" onClick={closeLogin}>
              ×
            </button>

            <div className="login-copy">
              <p className="eyebrow">Portal Bullwaare</p>
              <h2 id="login-title">Ingresar al campus</h2>
              <p>
                {loginMode === 'professor'
                  ? 'Acceso para profesores con usuario y contraseña.'
                  : 'El acceso de alumnos se realiza con autenticación de Google.'}
              </p>
            </div>

            <div className="login-form">
              {loginMode === 'student' ? (
                <>
                  {googleClientId ? (
                    <div className="google-login-shell">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap={false}
                        theme="outline"
                        text="continue_with"
                        shape="pill"
                        size="large"
                        width="100%"
                      />
                      {googleAuthLoading ? <div className="login-helper">Conectando Google con el campus...</div> : null}
                    </div>
                  ) : (
                    <div className="login-feedback error">
                      <strong>Falta configurar Google</strong>
                      <span>
                        Crea un archivo <code>.env</code> con <code>VITE_GOOGLE_CLIENT_ID=tu_client_id</code> para habilitar el acceso real.
                      </span>
                    </div>
                  )}

                  <button className="login-switch-button" type="button" onClick={openProfessorAccess}>
                    Acceso profesor
                  </button>

                  {googleAuthError ? <div className="login-feedback error">{googleAuthError}</div> : null}

                  {googleAuthUser ? (
                    <div className="login-feedback success">
                      <strong>Ingreso simulado correctamente</strong>
                      <span>
                        Alumno: {googleAuthUser.usuario} · Legajo: {googleAuthUser.legajo}
                      </span>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="login-helper">
                    Credenciales de prueba:
                    {' '}
                    <code>admin</code>
                    {' / '}
                    <code>123456</code>
                  </div>

                  <form className="professor-login-form" onSubmit={handleProfessorSubmit}>
                    <label className="login-field">
                      <span>Usuario</span>
                      <input
                        type="text"
                        value={professorCredentials.username}
                        disabled={professorAuthLoading}
                        onChange={(event) => handleProfessorCredentialChange('username', event.target.value)}
                        placeholder="Ingresá tu usuario"
                      />
                    </label>

                    <label className="login-field">
                      <span>Contraseña</span>
                      <input
                        type="password"
                        value={professorCredentials.password}
                        disabled={professorAuthLoading}
                        onChange={(event) => handleProfessorCredentialChange('password', event.target.value)}
                        placeholder="Ingresá tu contraseña"
                      />
                    </label>

                    <button className="button button-primary professor-submit" type="submit" disabled={professorAuthLoading}>
                      {professorAuthLoading ? 'Ingresando...' : 'Ingresar como profesor'}
                    </button>
                  </form>

                  <button className="login-switch-link" type="button" onClick={openStudentAccess}>
                    Volver al acceso con Google
                  </button>

                  {professorAuthError ? <div className="login-feedback error">{professorAuthError}</div> : null}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
