import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Skills": "Skills",
      "About Me": "About Me",
      "I am a highly qualified full stack developer, with skills in the main web and mobile development technologies, using agile development methodologies.": "I am a highly qualified full stack developer, with skills in the main web and mobile development technologies, using agile development methodologies.",
      "Contact": "Contact",
      "Projects": "Projects",
      "All": "All",
      "Name": "Name",
      "Email address": "Email address",
      "Message": "Message",
      "Your name": "Your name",
      "someone@something.com": "someone@something.com",
      "Your message...": "Your message...",
      "Submit": "Submit",
      "Success! I will contact you soon.": "Success! I will contact you soon.",
      "You must provide a valid formspree url in src/config.js": "You must provide a valid formspree url in src/config.js",
      "Oops, you do not have any GitHub projects yet...": "Oops, you do not have any GitHub projects yet...",
      "View on GitHub ": "View on GitHub",
      "All Projects": "All Projects"
    }
  },
  pt: {
    translation: {
      "Skills": "Habilidades",
      "About Me": "Sobre Mim",
      "I am a highly qualified full stack developer, with skills in the main web and mobile development technologies, using agile development methodologies.": "Sou um desenvolvedor full stack altamente qualificado, com habilidades nas principais tecnologias de desenvolvimento web e móvel, usando metodologias de desenvolvimento ágeis.",
      "Contact": "Contato",
      "Projects": "Projetos",
      "All": "Todos os",
      "Name": "Nome",
      "Email address": "Endereço de email",
      "Message": "Mensagem",
      "Your name": "Seu nome",
      "someone@something.com": "nome@email.com",
      "Your message...": "Sua mensagem...",
      "Submit": "Enviar",
      "Success! I will contact you soon.": "Sucesso! Entrarei em contato em breve.",
      "You must provide a valid formspree url in src/config.js": "Você deve fornecer uma URL válida do formspree em src/config.js",
      "Oops, you do not have any GitHub projects yet...": "Ops, você ainda não tem nenhum projeto no GitHub...",
      "View on GitHub ": "Ver no GitHub",
      "All Projects": "Todos os projetos"
    }
  },
  es: {
    translation: {
      "Skills": "Habilidades",
      "About Me": "Sobre Mí",
      "I am a highly qualified full stack developer, with skills in the main web and mobile development technologies, using agile development methodologies.": "Soy un desarrollador full stack altamente calificado, con habilidades en las principales tecnologías de desarrollo web y móvil, utilizando metodologías de desarrollo ágil.",
      "Contact": "Contacto",
      "Projects": "Proyectos",
      "All": "Todos los",
      "Name": "Nombre",
      "Email address": "Dirección de correo electrónico",
      "Message": "Mensaje",
      "Your name": "Tu nombre",
      "someone@something.com": "nombre@email.com",
      "Your message...": "Tu mensaje...",
      "Submit": "Enviar",
      "Success! I will contact you soon.": "¡Éxito! Me pondré en contacto contigo pronto.",
      "You must provide a valid formspree url in src/config.js": "Debe proporcionar una URL válida de formspree en src/config.js",
      "Oops, you do not have any GitHub projects yet...": "Vaya, aún no tienes ningún proyecto en GitHub...",
      "View on GitHub ": "Ver en GitHub",
      "All Projects": "Todos los proyectos"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // idioma padrão
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;