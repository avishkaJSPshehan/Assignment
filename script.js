// Quiz App - Vanilla JS
// Handles: video autoplay/unmute, page transitions with loader, fetch questions, quiz flow, scoring

(function () {
  // Fallback questions used only when running from file:// where fetch is blocked
  const defaultQuestions = [
    {
      question:
        "01).බ්ලූම්ගේ වර්ගීකරණයේ ප්‍රජානන ක්ෂේත්‍රයේ අවම මට්ටමේ චින්තන කුසලතාව කුමක්ද?",
      options: ["විශ්ලේෂණය", "අවබෝධය", "භාවිතය", "දැනුම"],
      answer: "දැනුම",
    },
    {
      question:
        "02).යම් සිද්ධාන්තයක් හෝ සංකල්පයක් පිළිබඳ තමන්ගේම වචන වලින් පැහැදිලි කිරීමට සිසුවෙකුට හැකි නම්, බ්ලූම්ගේ වර්ගීකරණයට අනුව ඔහු/ඇය සිටින ප්‍රජානන මට්ටම කුමක්ද?",
      options: ["භාවිතය", "අවබෝධය", "ඇගයීම", "දැනුම"],
      answer: "අවබෝධය",
    },
    {
      question:
        "03).ජලයේ තාපාංකය අංශක 100^C බවට වූ දැනුම භාවිතා කර, වෙනස් උසක (මුහුදු මට්ටමට වඩා) පිහිටි ස්ථානයකදී ජලය උතුරන උෂ්ණත්වය ගැන නිගමනයකට එළඹීම බ්ලූම්ගේ වර්ගීකරණයේ කුමන මට්ටමට අයත් වන්නේද?",
      options: ["විශ්ලේෂණය", "භාවිතය", "ඇගයීම", "දැනුම"],
      answer: "භාවිතය",
    },
    {
      question:
        "04).දේශනයක හෝ ලිපියක අඩංගු තොරතුරු කොටස් වලට වෙන් කර, එම කොටස් එකිනෙකට සම්බන්ධ වන ආකාරය සහ සමස්තය කෙරෙහි ඒවායේ බලපෑම හඳුනාගැනීමට සිසුවෙකුට හැකි වීම කුමන ප්‍රජානන කුසලතාවක් නිරූපණය කරයිද?",
      options: ["සංස්ලේෂණය", "ඇගයීම", "විශ්ලේෂණය", "අවබෝධය"],
      answer: "විශ්ලේෂණය",
    },
    {
      question:
        "05). යම් තොරතුරු කට්ටලයක් හෝ දත්ත සමුදායක් පිළිබඳව, නිශ්චිත නිර්ණායක (criteria) සහ ප්‍රමිතීන් (standards) මත පදනම්ව විවේචනාත්මක තීන්දුවක් ගැනීම බ්ලූම්ගේ වර්ගීකරණයට අනුව කුමන ප්‍රජානන මට්ටමට අයත් වන්නේද?",
      options: ["දැනුම", "භාවිතය", "ඇගයීම", "අවබෝධය"],
      answer: "ඇගයීම",
    },
    {
      question:
        "06).ගුරුවරයෙකු විසින් පෙන්වන ලද සිතියමක ඇති විවිධ සංකේත (උදා: මාර්ග, ගංගා, වනාන්තර) සිසුවෙකු විසින් අර්ථකථනය කර ඒවා නියෝජනය කරන දේ පැහැදිලි කිරීම බ්ලූම්ගේ කුමන ප්‍රජානන මට්ටම නිරූපණය කරයිද?",
      options: ["දැනුම", "අවබෝධය", "භාවිතය", "විශ්ලේෂණය"],
      answer: "අවබෝධය",
    },
    {
      question:
        "07).සිසුවෙකුට a^2 + 2ab + b^2 යන වීජ ගණිතමය සූත්‍රය උගන්වා ඇත. 101^2 හි අගය පහසුවෙන් ගණනය කිරීම සඳහා මෙම සූත්‍රය යොදාගැනීමට සිසුවෙකුට හැකි වීම, බ්ලූම්ගේ වර්ගීකරණයේ කුමන මට්ටමට අයත් වන්නේද?",
      options: ["විශ්ලේෂණය", "ඇගයීම", "භාවිතය", "සංස්ලේෂණය"],
      answer: "භාවිතය",
    },
    {
      question:
        "08).දේශගුණික විපර්යාස පිළිබඳ වාර්තාවක් කියවන සිසුවෙකුට, එහි සඳහන් ප්‍රධාන කරුණු සහ ඊට සහාය දක්වන අනුශාසනීය සාක්ෂි අතර වෙනස පැහැදිලිව හඳුනාගැනීමට හැකි වීමෙන් මනිනු ලබන ප්‍රජානන කුසලතාව කුමක්ද?",
      options: ["අවබෝධය", "ඇගයීම", "විශ්ලේෂණය", "නිර්මාණය කිරීම"],
      answer: "විශ්ලේෂණය",
    },
    {
      question:
        "09).විසඳුම් කිහිපයක් සලකා බැලීමෙන් පසු, සිසුවෙකු විසින් 'වඩාත් කාර්යක්ෂම සහ ප්‍රායෝගික විසඳුම මෙයයි' යනුවෙන් තර්කානුකූලව හේතු දක්වමින් තීරණයකට එළඹීම බ්ලූම්ගේ කුමන ප්‍රජානන මට්ටමට අයත් වන්නේද?",
      options: ["භාවිතය", "විශ්ලේෂණය", "අවබෝධය", "ඇගයීම"],
      answer: "ඇගයීම",
    },
    {
      question:
        "10).'වාෂ්පීකරණය' (Evaporation) යන්නට නිදසුන් කිහිපයක් ලබා දෙමින්, එම සංසිද්ධිය සරලව විස්තර කිරීමට සිසුවෙකුට හැකි වීම කුමන ප්‍රජානන කුසලතාවක් නිරූපණය කරයිද?",
      options: [
        "අයදුම් කිරීම (Applying)",
        "විශ්ලේෂණය (Analyzing)",
        "අවබෝධය",
        "ඇගයීම",
      ],
      answer: "අවබෝධය",
    },
  ];

  const views = {
    home: document.getElementById("home"),
    quiz: document.getElementById("quiz"),
    result: document.getElementById("result"),
  };
  const loaderEl = document.getElementById("loader");
  const videoEl = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");
  const pauseResumeBtn = document.getElementById("pauseResumeBtn");
  const skipBtn = document.getElementById("skipBtn");

  const progressEl = document.getElementById("progress");
  const questionTextEl = document.getElementById("questionText");
  const optionsEl = document.getElementById("options");
  const scoreTextEl = document.getElementById("scoreText");
  const goHomeBtn = document.getElementById("goHomeBtn");
  const timerEl = document.getElementById("timer");

  let questions = [];
  let currentIndex = 0;
  let correctCount = 0;
  let timerId = null;
  let timeLeft = 10; // seconds per question
  let quizStarted = false;

  function showLoader(show) {
    if (show) {
      loaderEl.classList.remove("hidden");
    } else {
      loaderEl.classList.add("hidden");
    }
  }

  function showView(target) {
    // Add leave animation to any active view
    Object.values(views).forEach((v) => {
      if (v.classList.contains("view-active")) {
        v.classList.remove("view-active");
        v.classList.add("view-leave");
        // Clear leave class after animation ends
        setTimeout(() => v.classList.remove("view-leave"), 260);
      }
    });
    // Activate target
    views[target].classList.add("view-active");
  }

  async function fetchQuestions() {
    try {
      const response = await fetch("questions.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load questions");
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid questions format");
      return data;
    } catch (err) {
      // If opened via file:// protocol, browsers often block fetch() to local files
      if (window.location.protocol === "file:") {
        err.isFileProtocol = true;
      }
      throw err;
    }
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    progressEl.textContent = `Question ${currentIndex + 1} of ${
      questions.length
    }`;
    questionTextEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";
      btn.textContent = opt;
      btn.setAttribute("role", "listitem");
      btn.addEventListener("click", () => handleAnswer(opt));
      optionsEl.appendChild(btn);
    });

    startTimer(10);
  }

  function handleAnswer(selected) {
    stopTimer();
    const q = questions[currentIndex];
    if (String(selected) === String(q.answer)) {
      correctCount += 1;
    }
    currentIndex += 1;

    // Small delay to give tap feedback
    setTimeout(nextStep, 120);
  }

  function startTimer(seconds) {
    timeLeft = seconds;
    updateTimerDisplay();
    stopTimer();
    timerId = setInterval(() => {
      timeLeft -= 1;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        stopTimer();
        // timeout counts as wrong, advance
        currentIndex += 1;
        setTimeout(nextStep, 80);
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function updateTimerDisplay() {
    if (!timerEl) return;
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    timerEl.textContent = `${mm}:${ss}`;
  }

  function nextStep() {
    if (currentIndex >= questions.length) {
      // Done -> show results
      scoreTextEl.textContent = `Your score: ${correctCount}/${questions.length}`;
      showView("result");
      return;
    }
    renderQuestion();
  }

  function resetQuizState() {
    currentIndex = 0;
    correctCount = 0;
  }

  function goHome() {
    resetQuizState();
    // Show loader briefly for smoothness
    showLoader(true);
    setTimeout(() => {
      showLoader(false);
      showView("home");
      // Rewind and play video
      try {
        videoEl.currentTime = 0;
      } catch {}
      // On many browsers, autoplay requires muted
      videoEl.muted = true;
      videoEl.play().catch(() => {});
    }, 400);
  }

  async function startQuizFlow() {
    if (quizStarted) return;
    quizStarted = true;
    showLoader(true);
    try {
      questions = await fetchQuestions();
      resetQuizState();
      renderQuestion();
      showView("quiz");
    } catch (e) {
      if (e && e.isFileProtocol) {
        // Use built-in fallback so the quiz still works when opened from file://
        console.warn(
          "Running from file:// — using fallback questions. Start a local server for fetch() to work."
        );
        questions = defaultQuestions;
        resetQuizState();
        renderQuestion();
        showView("quiz");
      } else {
        // Inline error message if a different error occurs (e.g., path/HTTP issue)
        questionTextEl.textContent =
          "Failed to load quiz. Please run via a local server and ensure questions.json exists.";
        optionsEl.innerHTML = "";
        showView("quiz");
        console.error(e);
      }
    } finally {
      // keep loader minimum visible for transition polish
      setTimeout(() => showLoader(false), 350);
    }
  }

  // Video events
  if (videoEl) {
    // Try to play immediately (muted for autoplay policy)
    videoEl.muted = true;
    videoEl.play().catch(() => {
      // Some browsers stop autoplay; user can unmute/play manually
    });

    videoEl.addEventListener("ended", () => {
      startQuizFlow();
    });
  }

  // Unmute toggle to allow user to enable audio if they wish
  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      videoEl.muted = !videoEl.muted;
      unmuteBtn.textContent = videoEl.muted ? "Unmute" : "Mute";
      // ensure playback continues
      videoEl.play().catch(() => {});
    });
  }

  if (pauseResumeBtn) {
    pauseResumeBtn.addEventListener("click", () => {
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
        pauseResumeBtn.textContent = "Pause";
      } else {
        videoEl.pause();
        pauseResumeBtn.textContent = "Resume";
      }
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      try {
        const jump = 30;
        const target = Math.min(
          (videoEl.currentTime || 0) + jump,
          videoEl.duration || Infinity
        );
        videoEl.currentTime = target;
        // keep playing
        videoEl.play().catch(() => {});
      } catch {}
    });
  }

  // Result button
  if (goHomeBtn) {
    goHomeBtn.addEventListener("click", goHome);
  }
})();
