// function trash() {
//   //trash sorting function
//   var organic = [
//     "Fruit skin",
//     "Vegetable peel",
//     "Food leftovers",
//     "Tea bags",
//     "Fish bones",
//     "Meats",
//     "Leaves",
//     "Flowers",
//   ];
//   var inorganic = [
//     "Paper",
//     "Plastic bag",
//     "Bottle",
//     "Masks",
//     "Cardboard",
//     "Straw",
//     "Plastic cup",
//     "Rubber bands",
//     "Tissues",
//   ];
//   var metal = ["Can", "Aluminium", "Steel", "Battery", "Wire"];
//   var userValue = document.getElementById("userInput").value.trim(); // Trim whitespace
//   var li = document.createElement("li");

//   if (userValue === "") {
//     alert("Must Fill Text");
//     return; // Stop execution if the input is empty
//   }

//   if (organic.includes(userValue)) {
//     document
//       .getElementById("organicUl")
//       .appendChild(li)
//       .setAttribute("class", "organic-trash-item");
//     li.innerHTML = userValue;
//   } else if (inorganic.includes(userValue)) {
//     document
//       .getElementById("inorganicUl")
//       .appendChild(li)
//       .setAttribute("class", "inorganic-trash-item");
//     li.innerHTML = userValue;
//   } else if (metal.includes(userValue)) {
//     document
//       .getElementById("metalUl")
//       .appendChild(li)
//       .setAttribute("class", "metal-trash-item");
//     li.innerHTML = userValue;
//   } else {
//     alert("Trash type not recognized");
//   }

//   document.getElementById("userInput").value = ""; // Clear the input box after processing
// }

// Initialize free text classification pipeline in browser
let textClassifier = null;
async function initTextAI() {
  if (window.transformers) {
    try {
      textClassifier = await window.transformers.pipeline(
        "zero-shot-classification",
        "Xenova/mobilebert-uncased-mnli",
      );
    } catch (e) {
      console.log("Text AI loading in background...");
    }
  }
}
initTextAI();

async function trash() {
  var rawInput = document.getElementById("userInput").value.trim();
  if (rawInput === "") {
    alert("Must Fill Text");
    return;
  }

  // Convert user input to lowercase for case-insensitive matching
  var input = rawInput.toLowerCase();
  var li = document.createElement("li");

  // Keyword rules (matches partial words regardless of uppercase/lowercase)
  var organicKeywords = [
    "fruit",
    "vegetable",
    "peel",
    "leftover",
    "food",
    "tea",
    "bone",
    "meat",
    "leaf",
    "leaves",
    "flower",
    "apple",
    "banana",
  ];
  var metalKeywords = [
    "can",
    "aluminium",
    "aluminum",
    "steel",
    "battery",
    "wire",
    "iron",
    "copper",
    "foil",
    "metal",
  ];
  var inorganicKeywords = [
    "paper",
    "plastic",
    "bottle",
    "mask",
    "cardboard",
    "straw",
    "cup",
    "rubber",
    "tissue",
    "wrapper",
    "bag",
    "box",
  ];

  // 1. Check direct keyword matches first
  if (organicKeywords.some((k) => input.includes(k))) {
    document
      .getElementById("organicUl")
      .appendChild(li)
      .setAttribute("class", "organic-trash-item");
    li.innerHTML = rawInput;
    document.getElementById("userInput").value = "";
    return;
  }

  if (metalKeywords.some((k) => input.includes(k))) {
    document
      .getElementById("metalUl")
      .appendChild(li)
      .setAttribute("class", "metal-trash-item");
    li.innerHTML = rawInput;
    document.getElementById("userInput").value = "";
    return;
  }

  if (inorganicKeywords.some((k) => input.includes(k))) {
    document
      .getElementById("inorganicUl")
      .appendChild(li)
      .setAttribute("class", "inorganic-trash-item");
    li.innerHTML = rawInput;
    document.getElementById("userInput").value = "";
    return;
  }

  // 2. Fallback to browser AI if the item wasn't in keyword list
  if (textClassifier) {
    try {
      const candidateLabels = [
        "organic waste",
        "inorganic waste",
        "metal waste",
      ];
      const output = await textClassifier(rawInput, candidateLabels);
      const topLabel = output.labels[0];

      if (topLabel === "organic waste") {
        document
          .getElementById("organicUl")
          .appendChild(li)
          .setAttribute("class", "organic-trash-item");
        li.innerHTML = rawInput + " (AI)";
      } else if (topLabel === "metal waste") {
        document
          .getElementById("metalUl")
          .appendChild(li)
          .setAttribute("class", "metal-trash-item");
        li.innerHTML = rawInput + " (AI)";
      } else {
        document
          .getElementById("inorganicUl")
          .appendChild(li)
          .setAttribute("class", "inorganic-trash-item");
        li.innerHTML = rawInput + " (AI)";
      }
      document.getElementById("userInput").value = "";
      return;
    } catch (err) {
      console.error(err);
    }
  }

  alert("Trash type not recognized");
  document.getElementById("userInput").value = "";
}

var slides = document.querySelectorAll(".slide");
var buttons = document.querySelectorAll(".slider-btn");
let currentSlide = 1;

var manualNav = function (manual) {
  slides.forEach(function (slide) {
    slide.classList.remove("active");

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[manual].classList.add("active");
  buttons[manual].classList.add("active");
};

buttons.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    manualNav(i);
    currentSlide = i;
  });
});

var repeat = function (activeClass) {
  let active = document.getElementsByClassName("active");

  let i = 1;
  var repeater = function () {
    setTimeout(function () {
      [...active].forEach(function (activeSlide) {
        activeSlide.classList.remove("active");
      });

      slides[i].classList.add("active");
      buttons[i].classList.add("active");
      i++;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
};
repeat();

function changeImageOrganic(element) {
  element.setAttribute("src", "assets/tempat sampah organik.png");
}
function changeImageBackOrganic(element) {
  element.setAttribute("src", "assets/tempat sampah organik 1.png");
}
function changeImageInorganic(element) {
  element.setAttribute("src", "assets/tempat sampah inorganik 1.png");
}
function changeImageBackInorganic(element) {
  element.setAttribute("src", "assets/tempat sampah inorganik.png");
}
function changeImageMetal(element) {
  element.setAttribute("src", "assets/tempat sampah metal 1.png");
}
function changeImageBackMetal(element) {
  element.setAttribute("src", "assets/tempat sampah metal.png");
}
function changeImage(element) {
  element.setAttribute("src", "assets/gunung sampah 1.jpg");
}
function changeImageBack(element) {
  element.setAttribute("src", "assets/gunung sampah.jpg");
}

var btnSubmit = document.querySelector(".submit");
var modal = document.querySelector(".modal-container");

if (btnSubmit) {
  btnSubmit.addEventListener("click", function () {
    modal.classList.add("show");

    const next = document.querySelector(".next");
    next.setAttribute(
      "value",
      "https://smart-trash-separator-amira.netlify.app/contact.html",
    );
  });
}

window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    var windowHeight = window.innerHeight;
    var revealTop = reveal.getBoundingClientRect().top;
    var revealPoint = 40;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  });
}

// --- AI IMAGE CLASSIFIER INTEGRATION ---
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/Ad5_u6KKw/";

let model, maxPredictions;
const imageSelector = document.getElementById("imageSelector");
const uploadedImage = document.getElementById("uploadedImage");
const classifyBtn = document.getElementById("classifyBtn");
const resultText = document.getElementById("resultText");

// 1. Load the custom Teachable Machine model on startup
async function loadModel() {
  if (!resultText) return;
  resultText.innerText = "Loading Custom AI model...";
  try {
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    resultText.innerText = "Custom model loaded! Please upload an image.";
    classifyBtn.disabled = false;
  } catch (error) {
    resultText.innerText = "Failed to load custom model.";
    console.error(error);
  }
}

loadModel();

// 2. Handle image selection and preview
if (imageSelector) {
  imageSelector.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedImage.src = e.target.result;
        uploadedImage.onload = function () {
          classifyBtn.disabled = false;
          resultText.innerText = "Image loaded. Click 'Classify Trash'.";
        };
      };
      reader.readAsDataURL(file);
    }
  });
}

// 3. Map custom class predictions and append an image thumbnail to the correct bin box
function sortCustomPrediction(predictions) {
  let bestPrediction = predictions[0];
  for (let i = 1; i < predictions.length; i++) {
    if (predictions[i].probability > bestPrediction.probability) {
      bestPrediction = predictions[i];
    }
  }

  const className = bestPrediction.className.toLowerCase();
  const confidence = (bestPrediction.probability * 100).toFixed(1);

  // Create list item and image thumbnail element
  var li = document.createElement("li");
  var trashImg = document.createElement("img");

  trashImg.src = uploadedImage.src;
  trashImg.alt = bestPrediction.className;
  trashImg.style.width = "80px";
  trashImg.style.height = "80px";
  trashImg.style.objectFit = "cover";
  trashImg.style.borderRadius = "8px";
  trashImg.style.margin = "5px 0";

  li.appendChild(trashImg);

  // Route based on your Teachable Machine class names
  if (className === "organic") {
    document
      .getElementById("organicUl")
      .appendChild(li)
      .setAttribute("class", "organic-trash-item");
    resultText.innerHTML = `Detected: <strong>${bestPrediction.className}</strong> (${confidence}%) &rarr; Sorted to <span style="color: green;">Organic Trash Bin</span>`;
  } else if (className === "metal") {
    document
      .getElementById("metalUl")
      .appendChild(li)
      .setAttribute("class", "metal-trash-item");
    resultText.innerHTML = `Detected: <strong>${bestPrediction.className}</strong> (${confidence}%) &rarr; Sorted to <span style="color: blue;">Metal Trash Bin</span>`;
  } else {
    // This handles "inorganic" or any other category safely
    document
      .getElementById("inorganicUl")
      .appendChild(li)
      .setAttribute("class", "inorganic-trash-item");
    resultText.innerHTML = `Detected: <strong>${bestPrediction.className}</strong> (${confidence}%) &rarr; Sorted to <span style="color: darkorange;">Inorganic Trash Bin</span>`;
  }
}

// 4. Trigger classification when button is clicked
if (classifyBtn) {
  classifyBtn.addEventListener("click", async () => {
    if (!model) {
      alert("Model is still loading, please wait...");
      return;
    }
    resultText.innerText = "Classifying image...";

    try {
      const predictions = await model.predict(uploadedImage);
      if (predictions && predictions.length > 0) {
        sortCustomPrediction(predictions);
      } else {
        resultText.innerText = "Could not classify the image.";
      }
    } catch (error) {
      resultText.innerText = "Error during classification.";
      console.error(error);
    }
  });
}
