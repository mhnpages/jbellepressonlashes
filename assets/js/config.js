window.JBELLE_CONFIG = {
  whatsappNumber: "50495248254",
  whatsappDisplay: "+504 9524-8254",

  price: 790,
  currency: "L",

  shippingText: "Envío gratis en Honduras",
  shippingException: "Excepto Islas de la Bahía",

  styles: {
    natural: {
      id: "natural",
      name: "Natural",
      length: "11 mm",
      image: "assets/images/natural.webp",
      fallbackImage: "assets/images/natural.png",
      intensity: "Suave",
      usage: "Uso diario",
      description:
        "Un efecto delicado y ligero que realza tu mirada sin sentirse exagerado. Ideal para primeras aplicaciones y looks cotidianos."
    },

    intermedio: {
      id: "intermedio",
      name: "Intermedio",
      length: "12 mm",
      image: "assets/images/intermedio.webp",
      fallbackImage: "assets/images/intermedio.png",
      intensity: "Medio",
      usage: "Versátil",
      description:
        "El equilibrio ideal entre naturalidad, largo y definición. Se nota con elegancia y funciona del día a la noche."
    },

    volumen: {
      id: "volumen",
      name: "Volumen",
      length: "14 mm",
      image: "assets/images/volumen.webp",
      fallbackImage: "assets/images/volumen.png",
      intensity: "Alto",
      usage: "Eventos",
      description:
        "Mayor intensidad y presencia para una mirada más impactante. Ideal para eventos, fotografías y noches especiales."
    }
  },

  paymentMethods: [
    "Link de pago anticipado",
    "Transferencia anticipada",
    "Pago al recibir en efectivo"
  ],

  quiz: [
    {
      id: "look",
      question: "¿Cómo te gusta que se vean tus pestañas?",
      options: [
        { label: "Muy naturales", scores: { natural: 3 } },
        { label: "Que se noten, pero elegantes", scores: { intermedio: 3, natural: 1 } },
        { label: "Con volumen e impacto", scores: { volumen: 3 } }
      ]
    },
    {
      id: "occasion",
      question: "¿Para qué las usarías principalmente?",
      options: [
        { label: "Uso diario", scores: { natural: 3 } },
        { label: "Trabajo o reuniones", scores: { intermedio: 3, natural: 1 } },
        { label: "Salidas y eventos", scores: { volumen: 3, intermedio: 1 } },
        { label: "Quiero una opción versátil", scores: { intermedio: 3 } }
      ]
    },
    {
      id: "naturalLashes",
      question: "¿Cómo son tus pestañas naturales?",
      options: [
        { label: "Muy cortas o finas", scores: { natural: 3 } },
        { label: "Medianas", scores: { intermedio: 3 } },
        { label: "Largas o abundantes", scores: { volumen: 3 } },
        { label: "No estoy segura", scores: { intermedio: 1, natural: 1 } }
      ]
    }
  ],

  social: {
    instagram: {
      label: "Instagram",
      handle: "@j.bellecosmetics",
      url: "https://www.instagram.com/j.bellecosmetics/"
    },
    whatsapp: {
      label: "WhatsApp",
      handle: "+504 9524-8254",
      url: "https://wa.me/50495248254"
    },
    // Agrega una URL para mostrar estas redes en la sección social.
    facebook: { label: "Facebook", handle: "J. Belle Cosmetics", url: "" },
    tiktok: { label: "TikTok", handle: "@j.bellecosmetics", url: "" }
  }
};
