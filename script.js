// Default skills (shown on explore page)
var skillsData = [
  { icon: "💻", name: "Web Development", description: "Learn HTML, CSS, JS and build websites from scratch." },
  { icon: "☕", name: "Java Programming", description: "OOP, data structures, and core Java concepts." },
  { icon: "🎬", name: "Video Editing", description: "Edit videos using Premiere Pro or DaVinci Resolve." },
  { icon: "🐍", name: "Python", description: "From basics to automation. Great for beginners." },
  { icon: "📱", name: "App Development", description: "Build mobile apps using Flutter or React Native." },
  { icon: "📊", name: "Data Analysis", description: "Excel, SQL, and data visualization for projects." },
  { icon: "✍️", name: "Content Writing", description: "Blog posts, assignments — improve your writing." },
];

// Save a skill to localStorage
function saveSkill(name, offer, want, description) {
  var skills = loadSkills();
  skills.push({ name: name, offer: offer, want: want, description: description });
  localStorage.setItem("userSkills", JSON.stringify(skills));
}

// Load skills from localStorage
function loadSkills() {
  var data = localStorage.getItem("userSkills");
  return data ? JSON.parse(data) : [];
}

// Save a swap request to localStorage
function saveRequest(skillName) {
  var requests = loadRequests();
  requests.push({ skill: skillName });
  localStorage.setItem("requests", JSON.stringify(requests));
}

// Load swap requests from localStorage
function loadRequests() {
  var data = localStorage.getItem("requests");
  return data ? JSON.parse(data) : [];
}

// Show modal popup
function showModal(title, message) {
  var overlay = document.getElementById("modal-overlay");
  if (!overlay) return;
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-message").textContent = message;
  overlay.classList.add("show");
}

// Close modal — OK button or click outside
var overlay = document.getElementById("modal-overlay");
var closeBtn = document.getElementById("modal-close-btn");
if (closeBtn) closeBtn.addEventListener("click", function () { overlay.classList.remove("show"); });
if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) overlay.classList.remove("show"); });

// === EXPLORE PAGE — render skill cards ===
var grid = document.getElementById("skills-grid");

if (grid) {
  // Render default skills
  skillsData.forEach(function (skill) {
    grid.innerHTML += `
      <div class="skill-card">
        <div class="skill-card-icon">${skill.icon}</div>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
        <button class="btn request-swap-btn">Request Swap</button>
      </div>`;
  });

  // Render user-posted skills from localStorage
  loadSkills().forEach(function (skill) {
    grid.innerHTML += `
      <div class="skill-card">
        <div class="skill-card-icon">🙋</div>
        <h3>${skill.offer}</h3>
        <p>${skill.description}</p>
        <p class="skill-meta"><strong>By:</strong> ${skill.name} | <strong>Wants:</strong> ${skill.want}</p>
        <button class="btn request-swap-btn">Request Swap</button>
      </div>`;
  });

  // Add click to all swap buttons
  document.querySelectorAll(".request-swap-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = this.closest(".skill-card").querySelector("h3").textContent;
      saveRequest(name);
      showModal("Request Sent! 🎉", 'Your swap request for "' + name + '" has been sent!');
    });
  });
}

// === POST PAGE — form handling ===
var form = document.getElementById("skill-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("user-name").value.trim();
    var offer = document.getElementById("skill-offer").value.trim();
    var want = document.getElementById("skill-want").value.trim();
    var desc = document.getElementById("skill-description").value.trim();

    if (!name || !offer || !want || !desc) { alert("Please fill in all fields!"); return; }

    saveSkill(name, offer, want, desc);
    showModal("Skill Posted! ✅", "Thanks " + name + '! Your skill "' + offer + '" has been posted.');
    form.reset();
  });
}

// === REQUESTS PAGE — show requested skills ===
var reqGrid = document.getElementById("requests-grid");

if (reqGrid) {
  var requests = loadRequests();

  if (requests.length === 0) {
    document.getElementById("no-requests").style.display = "block";
  } else {
    requests.forEach(function (req) {
      reqGrid.innerHTML += `
        <div class="skill-card">
          <h3>${req.skill}</h3>
          <p class="skill-meta">📌 Requested</p>
        </div>`;
    });
  }
}
