/* ============================================================================
   Legacy by LeadPrime — quiz.js
   Quiz de 4 preguntas + contacto -> ruteo a 1 de 4 rutas.
   El servidor RECALCULA la ruta (autoridad); este cálculo cliente es solo para
   pintar la pantalla de resultado de inmediato y como fallback si el POST falla.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Router (misma lógica que backend/src/routing.mjs) ---------- */
  function creditIsQualified(b) { return b === "650_699" || b === "700_mas"; }
  function capitalIsQualified(b) { return b === "20_50k" || b === "50k_mas"; }
  function computeRoute(a) {
    var credit = creditIsQualified(a.credit_band);
    var capital = capitalIsQualified(a.capital_band);
    var route;
    if (credit && capital) route = "EXPRESS";
    else if (credit) route = "TRES_VIAS";
    else if (capital) route = "CAPITAL_FIRST";
    else route = "ESCALERA";
    return route;
  }

  /* ---------- Copy exacto por ruta (BRIEF 1.5) ---------- */
  var ROUTE_COPY = {
    EXPRESS: {
      title: "Express",
      body: "Tu perfil califica para evaluación inmediata. Con tu crédito y tu capital, tu primer proyecto puede financiarse hasta el 90% de la compra y el 100% de la remodelación. Agenda tu llamada de evaluación — los detalles del programa y la inversión se presentan ahí. Sujeto a aprobación.",
      booking: true
    },
    TRES_VIAS: {
      title: "Tres Vías",
      body: "Tu crédito abre la puerta. Estructuramos tu entrada por 3 vías: hasta 90% de la compra, 100% de la remodelación, y una estrategia de crédito para resolver el enganche. Agenda tu llamada de evaluación — los detalles del programa y la inversión se presentan ahí. Sujeto a aprobación.",
      booking: true
    },
    CAPITAL_FIRST: {
      title: "Capital First",
      body: "Tu capital es tu llave. Estructuramos tu primer proyecto con financiamiento basado en la propiedad — no en tu historial — mientras reparamos tu crédito en paralelo. Tu segundo proyecto entra con términos premium. Agenda tu llamada de evaluación. Sujeto a aprobación.",
      booking: true
    },
    ESCALERA: {
      title: "Escalera",
      body: "Hoy empieza tu escalera. Con el plan correcto, en 6 a 12 meses construyes el crédito y el capital para tu primer proyecto — y tu negocio crece en el camino. Revisa tu correo: te enviamos el plan completo y cómo empezar hoy con LeadPrime.",
      booking: false
    }
  };

  /* ---------- Elementos ---------- */
  var form = document.getElementById("quizForm");
  if (!form) return;
  var steps = Array.prototype.slice.call(form.querySelectorAll(".quiz__step"));
  var bar = document.getElementById("quizBar");
  var backBtn = document.getElementById("quizBack");
  var nextBtn = document.getElementById("quizNext");
  var errorEl = document.getElementById("quizError");
  var resultEl = document.getElementById("result");
  var resultBadge = document.getElementById("resultBadge");
  var resultTitle = document.getElementById("resultTitle");
  var resultBody = document.getElementById("resultBody");
  var resultCta = document.getElementById("resultCta");
  var bookingEmbed = document.getElementById("bookingEmbed");

  var ENDPOINT = form.getAttribute("data-endpoint") || "/api/public/legacy-quiz";
  var BOOKING_URL = (form.getAttribute("data-booking-url") || "").trim();

  var current = 0;
  var total = steps.length;

  function showStep(i) {
    steps.forEach(function (s, idx) { s.classList.toggle("is-active", idx === i); });
    bar.style.width = ((i + 1) / total) * 100 + "%";
    backBtn.hidden = i === 0;
    nextBtn.textContent = i === total - 1 ? "Descubre mi ruta →" : "Siguiente →";
    errorEl.textContent = "";
  }

  function stepIsValid(i) {
    var step = steps[i];
    var radios = step.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      var name = radios[0].name;
      return !!form.querySelector('input[name="' + name + '"]:checked');
    }
    // Paso de contacto: validar inputs required
    var inputs = step.querySelectorAll("input[required]");
    for (var k = 0; k < inputs.length; k++) {
      if (!inputs[k].value.trim() || !inputs[k].checkValidity()) {
        inputs[k].focus();
        return false;
      }
    }
    return true;
  }

  function next() {
    if (!stepIsValid(current)) {
      errorEl.textContent = current === total - 1
        ? "Completa tus datos para ver tu ruta."
        : "Selecciona una opción para continuar.";
      return;
    }
    if (current < total - 1) {
      current++;
      showStep(current);
      scrollQuizIntoView();
    } else {
      submit();
    }
  }

  function back() {
    if (current > 0) { current--; showStep(current); scrollQuizIntoView(); }
  }

  function scrollQuizIntoView() {
    var top = form.getBoundingClientRect().top + window.pageYOffset - 90;
    if (window.pageYOffset > top) window.scrollTo({ top: top, behavior: "smooth" });
  }

  function collect() {
    var fd = new FormData(form);
    return {
      name: (fd.get("name") || "").toString().trim(),
      phone: (fd.get("phone") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      city: (fd.get("city") || "").toString().trim(),
      trade: (fd.get("trade") || "").toString().trim(),
      credit_band: fd.get("credit_band"),
      capital_band: fd.get("capital_band"),
      business_age: fd.get("business_age"),
      crew_propia: fd.get("crew_propia") === "true",
      company_website: (fd.get("company_website") || "").toString(),
      utm_source: getUTM("utm_source"),
      utm_medium: getUTM("utm_medium"),
      utm_campaign: getUTM("utm_campaign")
    };
  }

  function getUTM(key) {
    try {
      var v = new URLSearchParams(window.location.search).get(key);
      return v ? v.slice(0, 120) : undefined;
    } catch (e) { return undefined; }
  }

  function submit() {
    var payload = collect();
    var clientRoute = computeRoute(payload);
    nextBtn.disabled = true;
    nextBtn.textContent = "Enviando…";
    errorEl.textContent = "";

    var done = false;
    function finish(route, bookingAvailable) {
      if (done) return;
      done = true;
      renderResult(route, bookingAvailable);
    }

    // Timeout defensivo: si el backend no responde, mostramos la ruta calculada
    // en cliente (fallback), sin bloquear al usuario.
    var timer = setTimeout(function () { finish(clientRoute, false); }, 8000);

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
      .then(function (data) {
        clearTimeout(timer);
        var route = (data && data.route) || clientRoute;
        var booking = !!(data && data.booking_available);
        finish(route, booking);
      })
      .catch(function (err) {
        clearTimeout(timer);
        // Fallback: la captura pudo fallar (red/CORS/endpoint no desplegado aún),
        // pero el usuario ve su ruta igual. El lead se recupera por otros medios.
        console.warn("[legacy-quiz] POST falló, usando ruta cliente:", err);
        finish(clientRoute, false);
      });
  }

  function renderResult(route, bookingAvailable) {
    var copy = ROUTE_COPY[route] || ROUTE_COPY.ESCALERA;
    resultBadge.textContent = "Tu ruta";
    resultTitle.textContent = copy.title;
    resultBody.textContent = copy.body;
    resultCta.innerHTML = "";
    bookingEmbed.innerHTML = "";

    if (route === "ESCALERA") {
      // No agenda: recibe su plan + invitación al ecosistema.
      var a = document.createElement("a");
      a.className = "btn btn--gold btn--lg";
      a.href = "https://leadprime.chyrris.com";
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Empieza hoy con LeadPrime →";
      resultCta.appendChild(a);
    } else {
      // Rutas calificadas: agendamiento si hay booking; si no, fallback <24h.
      if (bookingAvailable && BOOKING_URL) {
        var book = document.createElement("a");
        book.className = "btn btn--gold btn--lg";
        book.href = BOOKING_URL;
        book.target = "_blank";
        book.rel = "noopener";
        book.textContent = "Agenda tu llamada de evaluación →";
        resultCta.appendChild(book);
      } else {
        var note = document.createElement("p");
        note.style.cssText = "color:var(--cream);font-weight:500;margin:0;";
        note.textContent = "Recibimos tus datos. Te contactamos en menos de 24 horas para agendar tu llamada de evaluación.";
        resultCta.appendChild(note);
      }
      var approval = document.createElement("span");
      approval.className = "result__approval";
      approval.textContent = "Sujeto a aprobación.";
      resultCta.appendChild(approval);
    }

    form.style.display = "none";
    resultEl.classList.add("is-active");
    scrollQuizIntoView();
  }

  /* Avanzar automáticamente al elegir una opción de radio (UX ágil) */
  form.addEventListener("change", function (e) {
    if (e.target && e.target.type === "radio" && current < total - 1) {
      errorEl.textContent = "";
      setTimeout(function () { next(); }, 220);
    }
  });

  nextBtn.addEventListener("click", next);
  backBtn.addEventListener("click", back);
  form.addEventListener("submit", function (e) { e.preventDefault(); next(); });
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target && e.target.tagName === "INPUT" && e.target.type !== "radio") {
      e.preventDefault(); next();
    }
  });

  showStep(0);

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.pageYOffset > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
