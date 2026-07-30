(function () {
  "use strict";

  const config = window.JBELLE_CONFIG;
  const storageKey = "jbelleOrderDraft";
  const quizKey = "jbelleQuizAnswers";

  const state = {
    selectedStyle: "",
    quizStep: 0,
    answers: [],
    lastFocusedElement: null
  };

  function getStyle(styleId) {
    return config.styles[styleId] || null;
  }

  function readDraft() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey)) || {};
    } catch (_error) {
      return {};
    }
  }

  function saveTemporarySelection() {
    const previous = readDraft();
    const form = document.getElementById("order-form");
    const draft = {
      ...previous,
      style: state.selectedStyle || previous.style || "",
      name: form ? form.elements.name.value.trim() : previous.name || "",
      city: form ? form.elements.city.value.trim() : previous.city || "",
      payment: form ? form.elements.payment.value : previous.payment || ""
    };
    sessionStorage.setItem(storageKey, JSON.stringify(draft));
    sessionStorage.setItem(quizKey, JSON.stringify(state.answers));
  }

  function restoreTemporarySelection() {
    const draft = readDraft();
    try {
      const savedAnswers = JSON.parse(sessionStorage.getItem(quizKey));
      if (Array.isArray(savedAnswers)) state.answers = savedAnswers;
    } catch (_error) {
      state.answers = [];
    }

    if (draft.style && getStyle(draft.style)) {
      selectStyle(draft.style, false);
    }

    const name = document.getElementById("order-name");
    const city = document.getElementById("order-city");
    const payment = document.getElementById("order-payment");
    if (name) name.value = draft.name || "";
    if (city) city.value = draft.city || "";
    if (payment) payment.value = draft.payment || "";
  }

  function selectStyle(styleId, shouldSave = true) {
    if (!getStyle(styleId)) return;
    state.selectedStyle = styleId;

    document.querySelectorAll("[data-style-card]").forEach((card) => {
      const selected = card.dataset.styleCard === styleId;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", String(selected));
      const selectButton = card.querySelector(".select-style");
      if (selectButton) {
        const style = getStyle(card.dataset.styleCard);
        selectButton.textContent = selected ? "Estilo seleccionado" : `Elegir ${style.name}`;
      }
    });

    document.querySelectorAll(".order-trigger[data-style='']").forEach((button) => {
      button.dataset.activeStyle = styleId;
    });

    const orderStyle = document.getElementById("order-style");
    if (orderStyle) orderStyle.value = styleId;
    if (shouldSave) saveTemporarySelection();
  }

  function calculateRecommendation(answers) {
    const scores = { natural: 0, intermedio: 0, volumen: 0 };

    answers.forEach((answer, index) => {
      const question = config.quiz[index];
      const option = question && question.options[answer];
      if (!option) return;
      Object.entries(option.scores).forEach(([styleId, value]) => {
        scores[styleId] += value;
      });
    });

    if (answers[0] === 0 && answers[1] === 0) return "natural";
    if (answers[0] === 1 && answers[1] === 3) return "intermedio";
    if (answers[0] === 2 && answers[1] === 2) return "volumen";

    return Object.entries(scores).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      const tiePriority = { intermedio: 3, natural: 2, volumen: 1 };
      return tiePriority[b[0]] - tiePriority[a[0]];
    })[0][0];
  }

  function renderQuiz() {
    const quizContent = document.getElementById("quiz-content");
    const question = config.quiz[state.quizStep];
    const label = document.getElementById("quiz-progress-label");
    const bar = document.getElementById("quiz-progress-bar");
    if (!quizContent || !question) return;

    label.textContent = `${state.quizStep + 1} de ${config.quiz.length}`;
    bar.style.width = `${((state.quizStep + 1) / config.quiz.length) * 100}%`;

    quizContent.innerHTML = `
      <h3 class="quiz-question">${question.question}</h3>
      <div class="quiz-options">
        ${question.options
          .map(
            (option, index) =>
              `<button class="quiz-option" type="button" data-answer="${index}">${option.label}</button>`
          )
          .join("")}
      </div>
      ${state.quizStep > 0 ? '<button class="quiz-back" type="button">Volver a la pregunta anterior</button>' : ""}
    `;

    quizContent.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        state.answers[state.quizStep] = Number(button.dataset.answer);
        state.answers = state.answers.slice(0, state.quizStep + 1);
        saveTemporarySelection();

        if (state.quizStep < config.quiz.length - 1) {
          state.quizStep += 1;
          renderQuiz();
        } else {
          showRecommendation(calculateRecommendation(state.answers));
        }
      });
    });

    const back = quizContent.querySelector(".quiz-back");
    if (back) {
      back.addEventListener("click", () => {
        state.quizStep -= 1;
        renderQuiz();
      });
    }
  }

  function showRecommendation(styleId) {
    const style = getStyle(styleId);
    const quizCard = document.getElementById("quiz-card");
    const result = document.getElementById("recommendation");
    if (!style || !result) return;

    selectStyle(styleId);
    quizCard.hidden = true;
    result.hidden = false;
    result.innerHTML = `
      <div class="recommendation-image recommendation-image-${styleId}">
        <img src="${style.image}" data-fallback="${style.fallbackImage}" alt="Estilo ${style.name} ${style.length}" width="1536" height="1024" />
      </div>
      <div class="recommendation-copy">
        <p class="eyebrow">Según tus respuestas</p>
        <h3>Tu estilo ideal es ${style.name}<span>${style.length}</span></h3>
        <p>${style.description}</p>
        <div class="recommendation-meta">
          <span><small>Intensidad</small><strong>${style.intensity}</strong></span>
          <span><small>Precio</small><strong>${config.currency} ${config.price}</strong></span>
        </div>
        <div class="recommendation-actions">
          <button class="button button-primary order-trigger" data-style="${styleId}">Pedir este estilo</button>
          <button class="button button-secondary" id="compare-styles">Comparar otros estilos</button>
          <button class="quiz-back" type="button" id="restart-quiz">Repetir el test</button>
        </div>
      </div>
    `;

    attachImageFallbacks(result);
    result.querySelector(".order-trigger").addEventListener("click", (event) => {
      openOrderModal(event.currentTarget.dataset.style);
    });
    result.querySelector("#compare-styles").addEventListener("click", () => {
      document.getElementById("estilos").scrollIntoView({ behavior: "smooth" });
    });
    result.querySelector("#restart-quiz").addEventListener("click", () => {
      state.quizStep = 0;
      state.answers = [];
      sessionStorage.removeItem(quizKey);
      result.hidden = true;
      quizCard.hidden = false;
      renderQuiz();
    });
  }

  function openOrderModal(styleId) {
    const requestedStyle = styleId || state.selectedStyle || readDraft().style || "unsure";
    if (getStyle(requestedStyle)) selectStyle(requestedStyle);

    const modal = document.getElementById("order-modal");
    const select = document.getElementById("order-style");
    state.lastFocusedElement = document.activeElement;
    select.value = getStyle(requestedStyle) ? requestedStyle : "unsure";
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    window.setTimeout(() => document.getElementById("order-name").focus(), 40);
  }

  function closeOrderModal() {
    const modal = document.getElementById("order-modal");
    if (modal.hidden) return;
    saveTemporarySelection();
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (state.lastFocusedElement) state.lastFocusedElement.focus();
  }

  function validateOrderForm() {
    const name = document.getElementById("order-name");
    const city = document.getElementById("order-city");
    const payment = document.getElementById("order-payment");
    const errors = {
      name: name.value.trim().length < 2 ? "Escribe tu nombre." : "",
      city: city.value.trim().length < 2 ? "Escribe tu ciudad." : "",
      payment: payment.value ? "" : "Selecciona un método de pago."
    };

    [name, city, payment].forEach((field) => {
      const message = errors[field.name];
      field.setAttribute("aria-invalid", String(Boolean(message)));
      document.getElementById(`${field.name}-error`).textContent = message;
    });

    const firstInvalid = [name, city, payment].find((field) => field.getAttribute("aria-invalid") === "true");
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function buildWhatsAppMessage(orderData) {
    const style = getStyle(orderData.style);
    const styleName = style ? `${style.name} ${style.length}` : "Aún no estoy segura";
    const length = style ? style.length : "Por confirmar";
    const helpText = orderData.help
      ? "\nTambién quisiera que me ayuden a confirmar si este estilo es el más adecuado para mí.\n"
      : "";

    return `Hola, mi nombre es ${orderData.name}.

Quisiera hacer un pedido de pestañas Press-On J. Belle Cosmetics.

Estilo seleccionado: ${styleName}
Largo: ${length}
Ciudad: ${orderData.city}
Método de pago: ${orderData.payment}

Precio del kit: ${config.currency} ${config.price}
${config.shippingText}, ${config.shippingException.toLowerCase()}.
${helpText}
Quedo pendiente para confirmar disponibilidad y entrega.`;
  }

  function openWhatsApp(orderData) {
    const message = buildWhatsAppMessage(orderData);
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    document.getElementById("form-status").textContent = "Abriendo WhatsApp con tu pedido…";
    saveTemporarySelection();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function attachImageFallbacks(root = document) {
    root.querySelectorAll("img").forEach((image) => {
      if (image.dataset.fallbackBound) return;
      image.dataset.fallbackBound = "true";
      image.addEventListener("error", () => {
        const fallback = image.dataset.fallback;
        if (fallback && image.src !== new URL(fallback, document.baseURI).href) {
          image.src = fallback;
          image.dataset.fallback = "";
          return;
        }
        const holder = document.createElement("div");
        holder.className = "image-fallback";
        holder.innerHTML = `<strong>${image.alt || "Imagen J. Belle"}</strong>`;
        const picture = image.closest("picture");
        (picture || image).replaceWith(holder);
      });
    });
  }

  function renderSocialLinks() {
    const container = document.getElementById("social-links");
    if (!container) return;
    const initials = { instagram: "IG", whatsapp: "WA", facebook: "FB", tiktok: "TT" };
    container.innerHTML = Object.entries(config.social)
      .filter(([, item]) => item.url)
      .map(
        ([id, item]) => `
          <a class="social-link" href="${item.url}" target="_blank" rel="noopener noreferrer me" aria-label="Abrir ${item.label} de J. Belle Cosmetics">
            <span>${initials[id] || "JB"}</span>
            <span><strong>${item.label}</strong><small>${item.handle}</small></span>
            <span aria-hidden="true">↗</span>
          </a>`
      )
      .join("");
  }

  function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
  }

  function setupAccordions() {
    document.querySelectorAll(".accordion details").forEach((detail) => {
      const summary = detail.querySelector("summary");
      summary.setAttribute("aria-expanded", String(detail.open));
      detail.addEventListener("toggle", () => {
        summary.setAttribute("aria-expanded", String(detail.open));
      });
    });
  }

  function setupModalKeyboard() {
    document.addEventListener("keydown", (event) => {
      const modal = document.getElementById("order-modal");
      if (modal.hidden) return;
      if (event.key === "Escape") closeOrderModal();
      if (event.key !== "Tab") return;

      const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), [href]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function bindEvents() {
    document.querySelectorAll(".select-style").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        selectStyle(button.dataset.style);
      });
    });

    document.querySelectorAll("[data-style-card]").forEach((card) => {
      const choose = () => selectStyle(card.dataset.styleCard);
      card.addEventListener("click", (event) => {
        if (!event.target.closest(".order-trigger")) choose();
      });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      });
    });

    document.querySelectorAll(".order-trigger").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const styleId = button.dataset.style || button.dataset.activeStyle || state.selectedStyle;
        openOrderModal(styleId);
      });
    });

    document.querySelectorAll("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", closeOrderModal);
    });

    document.getElementById("order-form").addEventListener("input", saveTemporarySelection);
    document.getElementById("order-style").addEventListener("change", (event) => {
      if (getStyle(event.target.value)) selectStyle(event.target.value);
    });
    document.getElementById("order-form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateOrderForm()) {
        document.getElementById("form-status").textContent = "Revisa los campos marcados para continuar.";
        return;
      }
      const form = event.currentTarget;
      openWhatsApp({
        name: form.elements.name.value.trim(),
        city: form.elements.city.value.trim(),
        style: form.elements.style.value,
        payment: form.elements.payment.value,
        help: form.elements.help.checked
      });
    });
  }

  function init() {
    // Punto reservado para analítica futura. No se carga ningún tracker actualmente.
    document.getElementById("current-year").textContent = new Date().getFullYear();
    restoreTemporarySelection();
    renderQuiz();
    renderSocialLinks();
    attachImageFallbacks();
    setupRevealAnimations();
    setupAccordions();
    setupModalKeyboard();
    bindEvents();
  }

  window.selectStyle = selectStyle;
  window.calculateRecommendation = calculateRecommendation;
  window.showRecommendation = showRecommendation;
  window.openOrderModal = openOrderModal;
  window.validateOrderForm = validateOrderForm;
  window.buildWhatsAppMessage = buildWhatsAppMessage;
  window.openWhatsApp = openWhatsApp;
  window.saveTemporarySelection = saveTemporarySelection;
  window.restoreTemporarySelection = restoreTemporarySelection;

  document.addEventListener("DOMContentLoaded", init);
})();
