export const languages = ['en', 'es'] as const;

export const defaultLang = 'en';

export const ui = {
  en: {
    home: {
      title: 'Esteban Mayoral Poncelas - Full-Stack Software Developer - Portfolio'
    },
    navbar: {
      langs: {
        en: 'English',
        es: 'Español'
      }
    },
    header: {
      job_title: 'Full-Stack Developer',
      about_me: 'About me',
      about_me_description: `Full-Stack Developer with experience in designing, developing, and maintaining applications.`,
      years_exp: 'Years of experience',
      from: 'Madrid, Spain'
    },
    technologies: {
      title: 'Technologies',
      description: 'Some of the technologies I work with'
    },
    experience: {
      title: 'Experience',
      description: 'Companies I work/worked during my career',
      link_text: 'Visit',
      present: 'Present'
    },
    articles: {
      title: 'Articles',
      description: 'Latest articles I posted on my personal blog'
    },
    contact: {
      title: `Let's Talk!`,
      description: "Get in touch with me to start your project, answer your questions or just say hello. I am here to listen to you and help you in everything you need. Leave me a message and I'll get back to you as soon as possible",
      form: {
        name: 'Name',
        email_placeholder: 'your@email.com',
        subject: 'Subject',
        message: 'Your message',
        send: 'Send message',
        invalid_value: 'Field required'
      },
      toast: {
        error_title: 'Unexpected error',
        error_content: 'An unexpected error ocurred when trying to send your message, try again, if the error persist contact me via email or other of the alternatives provided in the header of this website',
        success_title: 'Message sent',
        success_content: `Your message has been sent I'll reply you as soon as I can 🙂`
      }
    }
  },
  es: {
    home: {
      title: 'Esteban Mayoral Poncelas - Desarrollador de Software - Full-Stack  - Portfolio'
    },
    navbar: {
      langs: {
        en: 'English',
        es: 'Español'
      }
    },
    header: {
      job_title: 'Desarrollador Full-Stack',
      about_me: 'Acerca de mi',
      about_me_description: `Desarrollador Full-Stack con amplia experiencia en concepción, creación y mantenimiento de aplicaciones web.`,
      years_exp: 'Años de experiencia',
      from: 'Madrid, España'
    },
    technologies: {
      title: 'Tecnologias',
      description: 'Algunas de las tecnologias con las que trabajo'
    },
    experience: {
      title: 'Experiencia',
      description: 'Compañias con las que he trabajado/trabajo durante mi carrera profesional',
      link_text: 'Visita',
      present: 'Actualidad'
    },
    articles: {
      title: 'Articulos',
      description: 'Ultimos articulos publicados en  mi blog personal'
    },
    contact: {
      title: `¡Hablemos!`,
      description: "Ponte en contacto conmigo para iniciar tu proyecto, resolver tus dudas o simplemente saludar.",
      form: {
        name: 'Nombre',
        email_placeholder: 'tu@email.com',
        subject: 'Asunto',
        message: 'Tu mensaje',
        send: 'Enviar mensaje'
      },
      toast: {
        error_title: 'Unexpected error',
        error_content: 'An unexpected error ocurred when trying to send your message, try again, if the error persist contact me via email or other of the alternatives provided in the header of this website',
        success_title: 'Mensaje enviado',
        success_content: 'Tu mensaje ha sido enviado te respondere lo mas rapido posible 🙂'
      }
    }
  }
} as const;