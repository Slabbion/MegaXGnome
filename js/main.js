/* =======================================================
   🌐 SLABBION DASHBOARD - MAIN.JS
   Organized & commented JavaScript logic for all agents
========================================================= */

/* ============================
   🔷 HEX: News Scanner
============================= */
const sampleNews = [
  { title: "AI Beats Humans in New Math Challenge", category: "Tech" },
  { title: "Markets Surge as Inflation Slows", category: "Finance" },
  { title: "New Protests Erupt in Major City", category: "World" },
  { title: "Quantum Breakthrough May Revolutionize Computing", category: "Science" },
  { title: "Cybersecurity Threat Level Raised Globally", category: "Security" },
  { title: "UN Holds Emergency Climate Talks", category: "Environment" },
  { title: "Rare Planetary Alignment This Week", category: "Space" },
  { title: "Massive Data Breach Hits Financial Firm", category: "Cyber" },
];

function scanNews() {
  const newsFeed = document.getElementById("news-feed");
  newsFeed.innerHTML = "";

  sampleNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "bg-indigo-800/30 border border-indigo-400/10 backdrop-blur-sm p-4 rounded-lg shadow hover:bg-indigo-800/50 transition";
    card.innerHTML = `
      <h3 class="font-semibold text-indigo-100 mb-1">📰 ${article.title}</h3>
      <p class="text-indigo-300 text-sm mb-2">Category: ${article.category}</p>
      <button onclick="pinArticle('${article.title.replace(/'/g, "\\'")}')" 
              class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded">
        📌 Pin
      </button>`;
    newsFeed.appendChild(card);
  });
}

function pinArticle(title) {
  const list = document.getElementById("pinned-articles");
  const item = document.createElement("li");
  item.textContent = title;
  list.prepend(item);
}


/* ============================
   ☀️ SOLIS: Quotes & Reflections
============================= */
const solisQuotes = [
  "“The light shines in the darkness…” — John 1:5",
  "“To everything there is a season…” — Ecclesiastes 3:1",
  "“As above, so below.” — Hermetic Texts",
  "“Let there be light.” — Genesis 1:3",
  "“He who knows others is wise…” — Lao Tzu",
  "“You are the light of the world…” — Matthew 5:14",
  "“The lips of wisdom are closed…” — The Kybalion",
  "“With Him are wisdom and strength…” — Job 12:13",
  "“Be still, and know that I am God.” — Psalm 46:10",
  "“I am the Alpha and the Omega…” — Revelation 1:8"
];

function getSolisQuote() {
  fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {
      const q = data[Math.floor(Math.random() * data.length)];
      document.getElementById("solis-quote").textContent = `“${q.text}” — ${q.author || "Unknown"}`;
    })
    .catch(() => {
      const quote = solisQuotes[Math.floor(Math.random() * solisQuotes.length)];
      document.getElementById("solis-quote").textContent = quote;
    });
}

function saveEntryAndEmail() {
  const email = document.getElementById("solis-email").value.trim();
  const text = document.getElementById("solis-entry").value.trim();

  if (!email || !text) {
    alert("Please enter both your reflection and email.");
    return;
  }

  const list = document.getElementById("solis-entries");
  const li = document.createElement("li");
  li.textContent = text;
  list.prepend(li);
  document.getElementById("solis-entry").value = "";

  fetch("/send_solis_email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, message: text })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.status === "success" ? "🧡 Reflection sent to your inbox." : "⚠️ Failed to send. Please try again.");
    })
    .catch(err => {
      console.error(err);
      alert("⚠️ Server error. Try again later.");
    });
}


/* ============================
   🌑 VANTA: Private Reflections
============================= */
function saveVantaEntry() {
  const entry = document.getElementById("vanta-entry").value.trim();
  const email = document.getElementById("vanta-email").value.trim();
  const list = document.getElementById("vanta-entries");
  const confirm = document.getElementById("vanta-confirmation");

  if (!entry) return;

  const li = document.createElement("li");
  li.textContent = entry;
  list.prepend(li);

  document.getElementById("vanta-entry").value = "";
  document.getElementById("vanta-email").value = "";
  confirm.classList.remove("hidden");

  if (email) {
    fetch("/send_vanta_entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry, email })
    }).catch(console.error);
  }

  setTimeout(() => confirm.classList.add("hidden"), 4000);
}


/* ============================
   🧪 ORION: Chart Setup
============================= */
const ctx = document.getElementById('apyChart').getContext('2d');
const apyChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'APY %',
      data: [3.4, 4.2, 3.9, 4.5, 5.1],
      borderColor: '#facc15',
      backgroundColor: 'rgba(250, 204, 21, 0.2)',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }
});


/* ============================
   🧩 GLOBAL: Tab + Theme Toggle
============================= */
function showTab(tabId) {
  // Hide all tab contents
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.add('hidden'));

  // Show the selected tab
  const target = document.getElementById(tabId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update tab button states
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active-tab'));

  const clickedButton = Array.from(buttons).find(btn => btn.onclick?.toString().includes(`'${tabId}'`));
  if (clickedButton) {
    clickedButton.classList.add('active-tab');
  }
}


function toggleTheme() {
  document.body.classList.toggle("bg-gray-900");
  document.body.classList.toggle("bg-white");
  document.body.classList.toggle("text-white");
  document.body.classList.toggle("text-black");
}


/* ============================
   🌠 ZENITH: Protocol Modal
============================= */

// Open the Zenith Protocol modal
function openZenithProtocol() {
  const modal = document.getElementById("zenith-protocol-modal");
  modal.classList.remove("hidden");
  document.getElementById("zenith-command-input").focus();
}

// Close the Zenith Protocol modal
function closeZenithProtocol() {
  const modal = document.getElementById("zenith-protocol-modal");
  modal.classList.add("hidden");
}

// Handle submitting a protocol command
function submitZenithCommand() {
  const input = document.getElementById("zenith-command-input");
  const log = document.getElementById("zenith-log-list");
  const command = input.value.trim();

  if (!command) return;

  const li = document.createElement("li");
  li.textContent = `🧪 ${command}`;
  log.prepend(li);

  input.value = "";
}

// Open modal on floating button click
document.getElementById("zenith-protocol-btn").addEventListener("click", openZenithProtocol);

// Optional: Open modal via hotkey (Shift + Z)
document.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key.toLowerCase() === "z") {
    openZenithProtocol();
  }
});
