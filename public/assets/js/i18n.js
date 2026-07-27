(function () {
  "use strict";

  var copy = {
    en: {
      "nav.how": "How it works",
      "nav.example": "Example",
      "nav.trust": "Who supports you",
      "cta.route": "Find your path",
      "cta.routeArrow": "Find your path →",
      "cta.check": "See if I qualify →",
      "cta.learn": "See how it works ↓",
      "hero.eyebrow": "For contractors who know how to execute",
      "hero.title": "Stop building wealth for others. <em class=\"gilt\">Start building your own.</em>",
      "hero.sub": "Legacy helps you analyze, finance and execute your own investment project using the experience and crew you already have.",
      "hero.legal": "Free evaluation · 4 questions · Under 2 minutes",
      "stat.purchase": "Up to 90% of the purchase*",
      "stat.rehab": "Up to 100% of the renovation*",
      "stat.crew": "Your crew",
      "stat.advantage": "Your advantage in the project",
      "stat.terms": "*Third-party financing is subject to evaluation, terms and approval. Owl Funding structures the transaction; it is not the lender.",
      "clarity.one": "Find a property with potential.",
      "clarity.two": "We review the numbers before you make an offer.",
      "clarity.three": "Your crew executes and you choose the exit.",
      "how.eyebrow": "It is this clear",
      "how.title": "You do what you already know. <em>Legacy connects the rest.</em>",
      "how.step1.title": "We analyze",
      "how.step1.body": "Property, renovation cost, timeline, contingency and exit value. If the numbers do not work, you do not move forward.",
      "how.step2.title": "We structure",
      "how.step2.body": "Owl Funding prepares the transaction and presents it to third-party lenders. Every approval depends on the applicant and the property.",
      "how.step3.title": "You execute",
      "how.step3.body": "Your company completes the renovation. When finished, you sell for profit or evaluate refinancing to hold the property.",
      "how.cta": "Do you have a crew and experience?",
      "adv.eyebrow": "Your real advantage",
      "adv.title": "Others pay to execute. <em class=\"gilt\">You already know how.</em>",
      "adv.body": "You know the work, the timeline and your team. That control can protect the margin others lose to subcontracting, delays and scope changes.",
      "adv.calloutLabel": "The difference",
      "adv.callout": "Your company may bill for the renovation and participate in the project's outcome. These are two income opportunities, with real risk and no guaranteed profit.",
      "example.eyebrow": "An easy-to-read example",
      "example.title": "One property. <em>Three important numbers.</em>",
      "example.lead": "Illustrative expected scenario. This is not a promise or projection of your results.",
      "example.concept": "Conceptual editorial image",
      "example.buy": "Purchase",
      "example.rehab": "Renovation",
      "example.sale": "Estimated sale",
      "example.projectProfit": "Estimated project profit",
      "example.crewMargin": "Estimated company margin",
      "example.total": "Illustrative total before taxes",
      "example.details": "See costs included in this example",
      "example.closing": "Closing costs and points",
      "example.interest": "Estimated interest, 6 months",
      "example.holding": "Insurance, taxes and utilities",
      "example.selling": "Selling costs",
      "example.contingency": "Contingency",
      "example.investment": "Estimated total investment",
      "example.disclaimer": "Costs, terms, timelines and values vary by property and market. Crew margin is company revenue, not guaranteed additional profit. Each transaction is analyzed individually.",
      "trust.eyebrow": "You are not figuring it out alone",
      "trust.title": "Three pieces. <em class=\"gilt\">One process.</em>",
      "trust.you.label": "You",
      "trust.you.title": "Experience and execution",
      "trust.you.body": "You know construction and lead the renovation with your team.",
      "trust.owl.title": "Financial structure",
      "trust.owl.body": "Prepares and presents the transaction. It is not the lender and does not decide approval.",
      "trust.lp.title": "Tracking and system",
      "trust.lp.body": "Organizes the process, communication and progress of each opportunity.",
      "trust.mockup": "Illustrative mockup · Sample data",
      "fit.eyebrow": "Before you apply",
      "fit.title": "Legacy works best if <em>you already know construction.</em>",
      "fit.one": "You have real construction experience.",
      "fit.two": "You have your own crew or can lead one.",
      "fit.three": "You have 650+ credit or available capital.",
      "fit.four": "You understand that investing involves risk and work.",
      "fit.notTitle": "This is not fast money.",
      "fit.notBody": "Financing and profits are not guaranteed. The membership, applicant and every property go through evaluation.",
      "quiz.eyebrow": "Your next step",
      "quiz.title": "Find out if you are ready <em class=\"gilt\">to move forward.</em>",
      "quiz.lead": "Answer 4 questions. If you are not ready yet, we will also show you what you need to strengthen.",
      "quiz.q1count": "Question 1 of 4",
      "quiz.q1": "How long has your construction business been operating?",
      "quiz.age3": "3 years or more",
      "quiz.age1": "1–3 years",
      "quiz.ageLess": "Less than 1 year",
      "quiz.ageNone": "I do not have a business yet",
      "quiz.q2count": "Question 2 of 4",
      "quiz.q2": "Do you complete renovations with your own crew?",
      "quiz.crewYes": "Yes, I have my own crew",
      "quiz.crewNo": "No / I work with subcontractors",
      "quiz.q3count": "Question 3 of 4",
      "quiz.q3": "How much capital do you have available to start?",
      "quiz.cap50": "$50,000 or more",
      "quiz.capLess": "Less than $20,000",
      "quiz.capNone": "None right now",
      "quiz.q4count": "Question 4 of 4",
      "quiz.q4": "What is your credit range?",
      "quiz.credit700": "700 or higher",
      "quiz.creditLess": "Below 600",
      "quiz.creditUnknown": "I am not sure",
      "quiz.last": "Final step · Your information",
      "quiz.contact": "Where should we send your path?",
      "form.name": "Full name",
      "form.namePlaceholder": "Your name",
      "form.phone": "Phone",
      "form.emailPlaceholder": "you@email.com",
      "form.city": "City",
      "form.cityPlaceholder": "City, State",
      "form.trade": "Trade / specialty",
      "form.tradePlaceholder": "Example: general, framing, roofing…",
      "form.consent": "We use your information to evaluate your path and contact you about Legacy. By submitting, you agree to receive calls, texts or emails related to the program.",
      "whatsapp": "Questions? Message us on WhatsApp",
      "faq.eyebrow": "What matters before you decide",
      "faq.title": "Direct questions",
      "faq.costQ": "How much does it cost?",
      "faq.costA": "The membership has a monthly investment and a defined term. You receive every detail in writing before signing. Loan and third-party costs are separate.",
      "faq.guaranteeQ": "Is financing guaranteed?",
      "faq.guaranteeA": "No. The lender evaluates the applicant and each property. Owl Funding prepares the transaction but does not make the final decision.",
      "faq.riskQ": "What risk do I have?",
      "faq.riskA": "Sale value, costs and timelines can change. Interest and holding costs continue if the project is delayed. That is why we analyze scenarios before moving forward.",
      "faq.exitQ": "Do I have to sell the property?",
      "faq.exitA": "Not necessarily. You may sell or evaluate refinancing to hold and rent, when the numbers and approval allow it.",
      "risk.title": "Risk notice",
      "risk.body": "Real estate investing involves financial risk. Examples are illustrative and do not guarantee results. Legacy is a membership program subject to evaluation and approval.",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.meta": "Membership program · Subject to approval<br />Financing structured by Owl Funding · 2026"
    }
  };

  var original = {};
  var lang = "es";

  function remember(el, attribute, key) {
    var id = key + "::" + attribute;
    if (original[id] === undefined) {
      original[id] = attribute === "html" ? el.innerHTML : attribute === "placeholder" ? el.placeholder : el.textContent;
    }
    return original[id];
  }

  function translateStatic(nextLang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el, index) {
      var key = el.getAttribute("data-i18n");
      var fallback = remember(el, "text", key + ":" + index);
      el.textContent = nextLang === "en" && copy.en[key] ? copy.en[key] : fallback;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el, index) {
      var key = el.getAttribute("data-i18n-html");
      var fallback = remember(el, "html", key + ":" + index);
      el.innerHTML = nextLang === "en" && copy.en[key] ? copy.en[key] : fallback;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el, index) {
      var key = el.getAttribute("data-i18n-placeholder");
      var fallback = remember(el, "placeholder", key + ":" + index);
      el.placeholder = nextLang === "en" && copy.en[key] ? copy.en[key] : fallback;
    });
  }

  var routeCopy = {
    es: {
      Express: "Tu perfil está listo para una evaluación inmediata. El solicitante, el capital y la propiedad siguen sujetos a revisión y aprobación del prestamista.",
      "Tres Vías": "Tu crédito abre una posible ruta. Evaluamos la compra, la remodelación y el capital de entrada. Todo financiamiento está sujeto a aprobación.",
      "Capital First": "Tu capital disponible abre una posible ruta mientras fortaleces tu perfil de crédito. Sujeto a evaluación de la propiedad y del prestamista.",
      Escalera: "Tu primer paso es fortalecer crédito y capital antes de presentar una operación. Te mostraremos por dónde comenzar."
    },
    en: {
      Express: "Your profile is ready for immediate evaluation. The applicant, capital and property remain subject to lender review and approval.",
      "Tres Vías": "Your credit creates a possible path. We evaluate the purchase, renovation and the capital needed to enter. All financing is subject to approval.",
      "Capital First": "Your available capital creates a possible path while you strengthen your credit profile. Subject to property and lender evaluation.",
      Escalera: "Your first step is strengthening credit and capital before presenting a transaction. We will show you where to begin."
    }
  };

  function setText(el, value) {
    if (el && el.textContent !== value) el.textContent = value;
  }

  function translateRuntime() {
    var next = document.getElementById("quizNext");
    var back = document.getElementById("quizBack");
    var active = document.querySelector(".quiz__step.is-active");
    if (next) {
      var isLast = active && active.getAttribute("data-step") === "4";
      setText(next, lang === "en" ? (isLast ? "Show my path →" : "Next →") : (isLast ? "Descubre mi ruta →" : "Siguiente →"));
    }
    setText(back, lang === "en" ? "← Back" : "← Atrás");

    var result = document.getElementById("result");
    var title = document.getElementById("resultTitle");
    var badge = document.getElementById("resultBadge");
    var body = document.getElementById("resultBody");
    if (result && result.classList.contains("is-active") && title && body) {
      if (!result.dataset.esBody) result.dataset.esBody = body.textContent;
      setText(badge, lang === "en" ? "Your path" : "Tu ruta");
      setText(body, routeCopy[lang][title.textContent] || result.dataset.esBody);
      var note = result.querySelector(".result__note");
      if (note) setText(note, lang === "en"
        ? "We received your information. We will contact you within 24 hours to schedule your evaluation call."
        : "Recibimos tus datos. Te contactamos en menos de 24 horas para agendar tu llamada de evaluación.");
      var approval = result.querySelector(".result__approval");
      if (approval) setText(approval, lang === "en" ? "Subject to approval." : "Sujeto a aprobación.");
      var action = result.querySelector(".result__cta a");
      if (action) {
        var isLeadPrime = action.href.indexOf("leadprime.chyrris.com") !== -1;
        setText(action, lang === "en"
          ? (isLeadPrime ? "Start today with LeadPrime →" : "Schedule your evaluation call →")
          : (isLeadPrime ? "Empieza hoy con LeadPrime →" : "Agenda tu llamada de evaluación →"));
      }
    }

    var error = document.getElementById("quizError");
    if (error && error.textContent) {
      var contactError = error.textContent.indexOf("datos") !== -1 || error.textContent.indexOf("information") !== -1;
      setText(error, lang === "en"
        ? (contactError ? "Complete your information to see your path." : "Select an option to continue.")
        : (contactError ? "Completa tus datos para ver tu ruta." : "Selecciona una opción para continuar."));
    }
  }

  function setLanguage(nextLang) {
    lang = nextLang === "en" ? "en" : "es";
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    translateStatic(lang);
    translateRuntime();
    window.dispatchEvent(new CustomEvent("legacy:language", { detail: { language: lang } }));
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () { setLanguage(button.getAttribute("data-lang")); });
  });

  var quiz = document.getElementById("quizForm");
  var result = document.getElementById("result");
  if (quiz) new MutationObserver(translateRuntime).observe(quiz, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
  if (result) new MutationObserver(translateRuntime).observe(result, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

  setLanguage("es");
})();
