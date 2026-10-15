
// HustleMate AI
// Uses a local Ollama model for text generation.

const $ = id => document.getElementById(id);

const pageTitles = {
  dashboard: "Dashboard",
  content: "Content Writer",
  product: "Product Listings",
  pricing: "Pricing Assistant",
  proposal: "Proposals",
  settings: "AI Settings"
};

// Navigation
function openPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active-page", page.id === id);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.page === id);
  });

  $("page-title").textContent = pageTitles[id] || "Dashboard";
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.go));
});

document.querySelectorAll("[data-open]").forEach(card => {
  card.addEventListener("click", () => openPage(card.dataset.open));
});

// Local AI settings
const defaults = {
  endpoint: "http://localhost:11434/api/generate",
  model: "qwen2.5:3b"
};

let settings = { ...defaults };

try {
  settings = {
    ...defaults,
    ...JSON.parse(localStorage.getItem("hustlemate-settings") || "{}")
  };
} catch {
  settings = { ...defaults };
}

$("model-endpoint").value = settings.endpoint;
$("model-name").value = settings.model;

function saveSettings() {
  const endpoint = $("model-endpoint").value.trim();
  const model = $("model-name").value.trim();

  if (!endpoint || !model) {
    throw new Error("Enter both the endpoint and model name.");
  }

  const url = new URL(endpoint);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Use a valid HTTP or HTTPS endpoint.");
  }

  settings = { endpoint, model };
  localStorage.setItem("hustlemate-settings", JSON.stringify(settings));
}

$("save-settings").addEventListener("click", () => {
  try {
    saveSettings();
    $("settings-status").textContent = "Settings saved in this browser.";
  } catch (error) {
    $("settings-status").textContent = error.message;
  }
});

// Send a prompt to the local open-weight model.
async function generateWithAI(prompt) {
  saveSettings();

  const response = await fetch(settings.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: settings.model,
      prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error("Model request failed. Check Ollama and its settings.");
  }

  const data = await response.json();

  if (!data.response) {
    throw new Error("The model returned no text.");
  }

  return data.response.trim();
}

function businessPrompt(task, details) {
  return `You are HustleMate AI, a helpful assistant for freelancers.
Task: ${task}
Use only the supplied facts. Do not invent claims, features, or promises.
Write a clear, practical draft that the user can edit.

Details:
${details}`;
}

async function runAI(buttonId, resultId, outputId, prompt) {
  const button = $(buttonId);
  const previous = button.textContent;

  try {
    button.disabled = true;
    button.textContent = "Generating...";

    const result = await generateWithAI(prompt);

    $(outputId).textContent = result;
    $(resultId).classList.remove("hidden");
  } catch (error) {
    alert(
      error.message +
      "\n\nOpen AI Settings and check your local model connection."
    );
  } finally {
    button.disabled = false;
    button.textContent = previous;
  }
}

// Content Writer
$("generate-content").addEventListener("click", () => {
  const business = $("content-business").value.trim();
  const details = $("content-details").value.trim();

  if (!business || !details) {
    alert("Enter your business name and promotion details.");
    return;
  }

  const platform = $("content-platform").value;
  const tone = $("content-tone").value;

  const prompt = businessPrompt(
    `Write a promotional post for ${platform}. Tone: ${tone}. Include a suitable call to action.`,
    `Business: ${business}\nDetails: ${details}\nPlatform: ${platform}\nTone: ${tone}`
  );

  runAI("generate-content", "content-result", "content-output", prompt);
});

// Product Listing Generator
$("generate-product").addEventListener("click", () => {
  const name = $("product-name").value.trim();
  const audience = $("product-audience").value.trim();
  const features = $("product-features").value.trim();
  const price = $("product-price").value.trim();

  if (!name || !audience || !features) {
    alert("Complete the product name, audience, and features.");
    return;
  }

  if (price && (!Number.isFinite(Number(price)) || Number(price) < 0)) {
    alert("Enter a valid non-negative price.");
    return;
  }

  const prompt = businessPrompt(
    "Create an online product listing with a headline, description, key features, and call to action. Never invent product claims.",
    `Product: ${name}\nAudience: ${audience}\nVerified features: ${features}\nPrice: ${price ? "₹" + price : "Not provided"}`
  );

  runAI("generate-product", "product-result", "product-output", prompt);
});

// Pricing Calculator — deterministic calculation, not AI.
$("calculate-price").addEventListener("click", () => {
  const project = $("project-name").value.trim();
  const rate = Number($("hourly-rate").value);
  const hours = Number($("project-hours").value);
  const costs = Number($("project-costs").value);
  const markup = Number($("profit-margin").value);

  if (!project) {
    alert("Enter the project name.");
    return;
  }

  if (
    $("hourly-rate").value === "" ||
    $("project-hours").value === "" ||
    $("project-costs").value === "" ||
    $("profit-margin").value === ""
  ) {
    alert("Complete all pricing fields.");
    return;
  }

  if (
    ![rate, hours, costs, markup].every(Number.isFinite) ||
    rate <= 0 || hours <= 0 || costs < 0 || markup < 0
  ) {
    alert("Enter valid positive rates/hours and non-negative costs/markup.");
    return;
  }

  const labor = rate * hours;
  const base = labor + costs;
  const markupAmount = base * markup / 100;
  const quote = base + markupAmount;

  const money = value => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);

  $("price-output").textContent = money(quote);
  $("pricing-breakdown").textContent =
    `Project: ${project}\n` +
    `Labor: ${money(labor)}\n` +
    `Additional expenses: ${money(costs)}\n` +
    `Base cost: ${money(base)}\n` +
    `Markup (${markup}%): ${money(markupAmount)}\n` +
    `Suggested quote: ${money(quote)}`;

  $("pricing-result").classList.remove("hidden");
});

// Proposal Generator
$("generate-proposal").addEventListener("click", () => {
  const client = $("client-name").value.trim();
  const service = $("service-name").value.trim();
  const scope = $("proposal-scope").value.trim();
  const budget = $("proposal-budget").value.trim();
  const timeline = $("proposal-timeline").value.trim();

  if (![client, service, scope, budget, timeline].every(Boolean)) {
    alert("Complete all proposal fields.");
    return;
  }

  if (!Number.isFinite(Number(budget)) || Number(budget) < 0) {
    alert("Enter a valid budget.");
    return;
  }

  const prompt = businessPrompt(
    "Write a professional project proposal. Include overview, deliverables, timeline, budget, next steps, and terms the client must confirm. Do not invent terms.",
    `Client: ${client}\nService: ${service}\nScope: ${scope}\nBudget: ₹${budget}\nTimeline: ${timeline}`
  );

  runAI("generate-proposal", "proposal-result", "proposal-output", prompt);
});

// Copy generated drafts
document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const text = $(button.dataset.copy).textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied!";
      setTimeout(() => button.textContent = "Copy text", 1500);
    } catch {
      alert("Copy failed. Select the output text and copy it manually.");
    }
  });
});

// Test the local model connection
$("test-connection").addEventListener("click", async () => {
  try {
    const reply = await generateWithAI(
      "Reply with exactly: HustleMate connection successful."
    );
    $("settings-status").textContent = "Model response: " + reply;
  } catch (error) {
    $("settings-status").textContent =
      error.message +
      " Check that Ollama is running and browser CORS allows this page.";
  }
});
