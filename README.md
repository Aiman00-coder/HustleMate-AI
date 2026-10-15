
# HustleMate AI 🚀

**Your AI-powered side-hustle assistant — built with HTML, CSS, JavaScript, and a locally running open-weight AI model.**

HustleMate AI helps freelancers, creators, and small-business owners handle everyday business tasks from one simple dashboard. It can help draft marketing content, improve product listings, prepare client proposals, and estimate a starting price for a service.

This project explores the **Side Hustle** theme by making practical AI assistance more accessible, customizable, and privacy-conscious.

## ✨ Features

- **Content Writer** — Generate marketing content and social media posts.
- **Product Listing Assistant** — Create persuasive product descriptions.
- **Pricing Assistant** — Estimate prices using costs, time, and desired margin.
- **Proposal Generator** — Draft proposals for potential clients.
- **Local AI Settings** — Configure the Ollama server URL and model.
- **Copy Generated Text** — Copy results for use in your workflow.
- **Responsive Dashboard** — A clean interface for different screen sizes.

> AI-powered features require a compatible local Ollama setup. The pricing calculator may work without a running AI model.

## 🧰 Tech Stack

- HTML5 — Website structure
- CSS3 — Styling and responsive layout
- JavaScript — Interactions, calculations, and API requests
- Ollama — Runs an open-weight language model locally

No frontend framework is required.

## 📁 Project Structure

```text
HustleMate-AI/
├── index.html
├── style.css
├── script.js
└── README.md
```

Keep all four files in the same directory.

## ⚙️ Installation and Setup

### 1. Get the Project

Download the project files or clone your repository:

```bash
git clone <repository-url>
cd HustleMate-AI
```

Replace `<repository-url>` with your actual Git repository URL.

### 2. Open the Website

Open `index.html` in your browser.

For development, you can use the **Live Server** extension in Visual Studio Code.

### 3. Install Ollama

Download Ollama from:

https://ollama.com/

Install it and open a terminal.

Download the example model:

```bash
ollama pull qwen2.5:3b
```

Run the model:

```bash
ollama run qwen2.5:3b
```

Keep Ollama running while using the AI features.

### 4. Configure the AI

Open HustleMate AI's AI Settings and enter:

**Model name:**

```text
qwen2.5:3b
```

**Ollama API URL:**

```text
http://localhost:11434
```

The website can send generation requests to the Ollama `/api/generate` endpoint.

If the browser blocks requests, run the website through a local development server and configure Ollama's allowed origins for your local website address.

> Never expose the Ollama API publicly without understanding and securing the risks.

## 🧑‍💻 How to Use

1. Open the HustleMate AI dashboard.
2. Select a tool from the navigation menu.
3. Enter the information requested.
4. Generate content or calculate a suggested price.
5. Review and edit the output before using it.
6. Copy the result into your business workflow.

For AI-powered features, confirm that Ollama is running and the selected model is installed.

## 🌱 Why Open-Weight AI?

HustleMate AI demonstrates how open-weight models can make AI features more accessible to independent workers and small businesses.

### Benefits

- **Privacy-conscious:** A local setup can keep prompts on your own machine.
- **Cost control:** Run a compatible model locally without paying per request to a hosted AI API, although hardware and electricity still have costs.
- **Flexibility:** Developers can experiment with different supported models.
- **Customization:** Prompts and workflows can be adapted to different business needs.
- **Open innovation:** Developers can inspect, improve, and share the application code.

Open-weight does not automatically mean unrestricted use or complete privacy. Check the model license and verify where your requests are sent.

## 🔐 Privacy and Limitations

- Verify your local configuration before entering sensitive information.
- Avoid entering passwords, payment details, or confidential client data.
- AI-generated content may contain mistakes. Review it before publishing or sending it to clients.
- Pricing calculations are estimates, not financial advice or guaranteed market rates.
- The project is a frontend prototype and does not include user accounts, a database, payment processing, or a hosted backend by default.
- Browser permissions and cross-origin settings can affect connections to Ollama.

## 🛠️ Troubleshooting

### AI Is Not Responding

- Make sure Ollama is installed and running.
- Check that the configured model has been downloaded.
- Verify the API URL and model name.
- Check your browser's developer console for network or CORS errors.

### Model Not Found

List your downloaded models:

```bash
ollama list
```

Download the desired model if necessary:

```bash
ollama pull qwen2.5:3b
```

Ensure the model name in the website matches the installed model.

### Website Styling or Buttons Are Not Working

- Confirm `style.css` and `script.js` are in the same folder as `index.html`.
- Check that the filenames match the references in your HTML.
- Try running the project through a local development server.

### Copy Button Is Not Working

Try running the site through a local web server and allow clipboard access in your browser.

## 🤝 Contributing

Contributions are welcome!

You can contribute by:

- Improving the responsive design and accessibility.
- Adding useful tools for freelancers and small businesses.
- Improving prompts and error handling.
- Supporting additional Ollama-compatible models.
- Adding tests and documentation.
- Reporting bugs or proposing enhancements through issues and pull requests.

Before submitting a contribution, test the affected feature and update documentation when necessary.

## 🗺️ Future Improvements

- Save and organize generated drafts.
- Add invoice descriptions and marketing campaign planning.
- Improve input validation and error messages.
- Add model connection status indicators.
- Introduce automated tests and accessibility improvements.

## 📄 License

No project license is specified yet. Before publishing or accepting contributions, choose an open-source license and add it in a `LICENSE` file.

Also review the license of any AI model you use.

---

**Built for the Side Hustle theme: practical AI tools for people building something of their own.**
