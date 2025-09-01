const modules = {
  "Estados de la materia": [
    {
      question: "¿Qué estado de la materia tiene volumen definido pero forma variable?",
      options: ["Sólido", "Líquido", "Gas", "Plasma"],
      answer: "Líquido",
      explanation: "Los líquidos se adaptan a la forma del recipiente, pero mantienen su volumen."
    },
    {
      question: "¿Cuál de los siguientes es un gas a temperatura ambiente?",
      options: ["Mercurio", "Helio", "Hierro", "Agua"],
      answer: "Helio",
      explanation: "El helio es un gas noble y se encuentra en estado gaseoso a temperatura ambiente."
    },
    {
      question: "¿Cuál de los siguientes NO es un estado de la materia?",
      options: ["a) Sólido" , "b) Líquido" , "c) Espeso" , "d) Gaseoso"],
      answer: "c) Espeso",
      explanation: "Espeso no es considerado un estado de la materia."
    },
  ],
  "Elementos y compuestos": [
    {
      question: "¿Cuál es el símbolo químico del oxígeno?",
      options: ["Ox", "O2", "O", "Og"],
      answer: "O",
      explanation: "El símbolo químico del oxígeno es 'O'. O₂ representa la molécula, no el elemento individual."
    },
    {
      question: "¿Cuál de los siguientes es un compuesto?",
      options: ["Hidrógeno", "Oxígeno", "Agua", "Helio"],
      answer: "Agua",
      explanation: "El agua (H₂O) es un compuesto formado por hidrógeno y oxígeno."
    }
  ],
  "Tabla periódica": [
    {
      question: "¿Qué tipo de elemento es el sodio (Na)?",
      options: ["Metal", "No metal", "Gas noble", "Metaloide"],
      answer: "Metal",
      explanation: "El sodio es un metal alcalino del grupo 1."
    },
    {
      question: "¿Cuál es el número atómico del carbono?",
      options: ["6", "12", "14", "8"],
      answer: "6",
      explanation: "El número atómico del carbono es 6, lo que indica que tiene 6 protones."
    }
  ]
};

let currentModule = null;
let currentQuestionIndex = 0;

const moduleSelector = document.getElementById('module-select');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');

function populateModules() {
  for (const mod in modules) {
    const option = document.createElement('option');
    option.value = mod;
    option.textContent = mod;
    moduleSelector.appendChild(option);
  }

  currentModule = modules[moduleSelector.value];
  currentQuestionIndex = 0;
  loadQuestion();
}

moduleSelector.onchange = () => {
  currentModule = modules[moduleSelector.value];
  currentQuestionIndex = 0;
  nextBtn.textContent = "Siguiente";
  loadQuestion();
};

function loadQuestion() {
  const q = currentModule[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  nextBtn.disabled = true;

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.onclick = () => selectAnswer(option);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(selected) {
  const q = currentModule[currentQuestionIndex];
  const correct = q.answer;

  if (selected === correct) {
    feedbackEl.textContent = `✅ ¡Correcto! ${q.explanation}`;
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Incorrecto. ${q.explanation}`;
    feedbackEl.style.color = "red";
  }

  Array.from(optionsEl.children).forEach(li => {
    li.onclick = null;
    li.style.cursor = "default";
    if (li.textContent === correct) {
      li.style.backgroundColor = "#c8f7c5";
    } else if (li.textContent === selected) {
      li.style.backgroundColor = "#f7c5c5";
    }
  });

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentModule.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 ¡Has completado este módulo!";
    optionsEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    nextBtn.disabled = true;
    nextBtn.textContent = "Fin";
  }
};

populateModules();
