window.JBELLE_CONFIG = {
  whatsappNumber: "50495248254",
  whatsappDisplay: "+504 9524-8254",

  price: 790,
  currency: "L",

  shippingText: "Envío gratis en Honduras",
  shippingException: "Excepto Islas de la Bahía",
  // La cuenta comienza una sola vez por visitante y se conserva al recargar la página.
  promoShippingDurationSeconds: 29740,

  styles: {
    natural: {
      id: "natural",
      name: "Súper Natural",
      length: "11 mm",
      image: "assets/images/style-detail-super-natural-v2.webp",
      resultViewBox: "33 90 846 846",
      resultImageWidth: 1536,
      resultImageHeight: 1024,
      fallbackImage: "assets/images/estilo-super-natural-11.png",
      intensity: "Muy suave",
      usage: "Uso diario",
      description:
        "El efecto más delicado del kit: ligero, discreto y perfecto para primeras aplicaciones o looks cotidianos."
    },

    naturalvolumen: {
      id: "naturalvolumen",
      name: "Natural con volumen",
      length: "11 mm",
      image: "assets/images/style-detail-natural-volumen-v2.webp",
      resultViewBox: "33 90 846 846",
      resultImageWidth: 1536,
      resultImageHeight: 1024,
      fallbackImage: "assets/images/estilo-natural-volumen-11.png",
      intensity: "Suave",
      usage: "Diario definido",
      description:
        "Mantiene un largo natural y suma definición para abrir la mirada sin perder suavidad."
    },

    intermedio: {
      id: "intermedio",
      name: "Intermedio",
      length: "12 mm",
      image: "assets/images/style-detail-intermedio-v2.webp",
      resultViewBox: "33 90 846 846",
      resultImageWidth: 1536,
      resultImageHeight: 1024,
      fallbackImage: "assets/images/estilo-intermedio-12.png",
      intensity: "Medio",
      usage: "Versátil",
      description:
        "El equilibrio ideal entre naturalidad, largo y definición. Se nota con elegancia y funciona del día a la noche."
    },

    volumen: {
      id: "volumen",
      name: "Volumen",
      length: "14 mm",
      image: "assets/images/style-detail-volumen-v2.webp",
      resultViewBox: "33 90 846 846",
      resultImageWidth: 1536,
      resultImageHeight: 1024,
      fallbackImage: "assets/images/estilo-volumen-14.png",
      intensity: "Alto",
      usage: "Eventos",
      description:
        "Mayor intensidad y presencia para una mirada más impactante. Ideal para eventos, fotografías y noches especiales."
    },

    anime: {
      id: "anime",
      name: "Anime",
      length: "12 mm",
      image: "assets/images/estilo-anime-12.webp",
      resultViewBox: "836 0 836 941",
      resultImageWidth: 1672,
      resultImageHeight: 941,
      fallbackImage: "assets/images/estilo-anime-12.png",
      intensity: "Definido",
      usage: "Tendencia",
      description:
        "Puntas marcadas y espaciadas para una mirada moderna, expresiva y con inspiración anime."
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
        { label: "Súper naturales", scores: { natural: 4 } },
        { label: "Naturales, pero más definidas", scores: { naturalvolumen: 4, natural: 1 } },
        { label: "Elegantes y visibles", scores: { intermedio: 4, naturalvolumen: 1 } },
        { label: "Con volumen e impacto", scores: { volumen: 4 } },
        { label: "Con puntas marcadas estilo anime", scores: { anime: 4 } }
      ]
    },
    {
      id: "occasion",
      question: "¿Para qué las usarías principalmente?",
      options: [
        { label: "Uso diario", scores: { natural: 3, naturalvolumen: 2 } },
        { label: "Trabajo o reuniones", scores: { naturalvolumen: 3, intermedio: 2 } },
        { label: "Salidas y eventos", scores: { volumen: 3, anime: 2, intermedio: 1 } },
        { label: "Quiero una opción versátil", scores: { intermedio: 3, naturalvolumen: 1 } }
      ]
    },
    {
      id: "naturalLashes",
      question: "¿Cómo son tus pestañas naturales?",
      options: [
        { label: "Muy cortas o finas", scores: { natural: 3, naturalvolumen: 1 } },
        { label: "Medianas", scores: { intermedio: 3, naturalvolumen: 2 } },
        { label: "Largas o abundantes", scores: { volumen: 3, anime: 2 } },
        { label: "No estoy segura", scores: { intermedio: 2, natural: 1 } }
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
