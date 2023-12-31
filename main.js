document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const colorForm = document.getElementById("colorForm");
    const colorInputsContainer = document.getElementById("colorInputs");
    const addColorButton = document.getElementById("addColor");
  
    // Initial color input
    addColorInput();
  
    // Audio context and oscillator setup
    let audioContext;
    let oscillator;
  
    function initializeAudioContext() {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = 1000; // Adjust the frequency as needed
      oscillator.start();
    }
  
    function playBeep() {
      oscillator.connect(audioContext.destination);
      setTimeout(() => oscillator.disconnect(), 100);
    }
  
    function getColorInputs() {
      return Array.from(document.querySelectorAll(".color-input")).map(
        (input) => input.value
      );
    }
  
    function changeBackgroundColor(colors, currentIndex) {
      document.body.style.backgroundColor = colors[currentIndex];
      playBeep();
    }
  
    function hideColorForm() {
      colorForm.style.display = "none";
    }
  
    function startColorChange() {
      const colors = getColorInputs();
      const intervalInput = colorForm.elements.interval.value;
  
      hideColorForm();
  
      let currentIndex = 0;
      document.body.style.backgroundColor = colors[currentIndex];
  
      const intervalId = setInterval(function () {
        currentIndex = (currentIndex + 1) % colors.length;
        changeBackgroundColor(colors, currentIndex);
      }, intervalInput * 1000);
    }
  
    function addColorInput() {
      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.name = "colorSequence";
      colorInput.className = "color-input";
      colorInputsContainer.appendChild(colorInput);
  
      const colorBox = document.createElement("div");
      colorBox.className = "color-box";
      colorBox.style.backgroundColor = "#ffffff"; // Initial background color
      colorInputsContainer.appendChild(colorBox);
  
      const colorInputLabel = document.createElement("label");
      colorInputLabel.textContent = "Color:";
      colorInputLabel.setAttribute("for", colorInput.id);
  
      // Generate a unique ID for each color input
      const colorInputId = "colorInput_" + Date.now();
      colorInput.id = colorInputId;
      colorInputLabel.setAttribute("for", colorInputId);
  
      colorInput.addEventListener("input", function () {
        colorBox.style.backgroundColor = colorInput.value;
      });
  
      colorInputsContainer.appendChild(colorInputLabel);
    }
  
    // Event listeners
    addColorButton.addEventListener("click", addColorInput);
    startButton.addEventListener("click", function (event) {
      event.preventDefault();
      initializeAudioContext();
      startColorChange();
    });
  });