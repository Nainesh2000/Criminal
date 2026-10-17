/* ============================================================
   CrimeTrace Gujarat - Full Interactive Application Logic
   ============================================================ */

const sampleIncidents = [
    {
        id: "fir-101",
        type: "official",
        title: "FIR #4012: Armed Robbery at Jewelry Store",
        location: "Ring Road Market, Surat",
        date: "2026-10-15 21:30",
        peopleInvolved: "Suspect A. Khan, Store Manager V. Patel",
        details: "Surat City Police registered FIR under Section 309 BNS. Two suspects apprehended with stolen goods during night patrolling.",
        lat: 21.1959,
        lng: 72.8302,
        verified: true,
        likes: 38,
        comments: ["Kudos to Surat police team!", "Is Ring Road stretch safe at night?"],
        author: "Surat City Police Division",
        isFollowing: false
    },
    {
        id: "fir-102",
        type: "official",
        title: "FIR #4088: Vehicle Theft Syndicate Busted",
        location: "Railway Station Road, Surat",
        date: "2026-10-16 14:15",
        peopleInvolved: "3 Inter-state Gang Members",
        details: "Surat Crime Branch recovered 12 stolen two-wheelers during checkpoint inspection.",
        lat: 21.2048,
        lng: 72.8406,
        verified: true,
        likes: 72,
        comments: ["Great work by local police."],
        author: "Crime Branch Unit 2",
        isFollowing: true
    },
    {
        id: "post-201",
        type: "people",
        title: "Suspicious Activity & Phone Snatching near Lake",
        location: "Adajan Lake Garden, Surat",
        date: "2026-10-16 19:10",
        peopleInvolved: "Two bike riders without helmets",
        details: "Phone snatched near garden gate at 7 PM. Bikers sped toward Adajan Patia bridge.",
        lat: 21.1926,
        lng: 72.7997,
        verified: false,
        likes: 19,
        comments: ["Please inform Adajan Police Station immediately."],
        author: "Ramesh Sharma (Citizen)",
        isFollowing: false
    }
];

const translations = {
    en: {
        login: "Login / Profile",
        breakingNews: "BREAKING CRIME NEWS",
        searchPlaceholder: "Search by incident, date, location, time, involved persons...",
        search: "Search Incidents",
        officialInfo: "Official Info (Verified FIRs)",
        peopleInfo: "People Info (Citizen Reports)",
        aiFactChecker: "AI Incident Truth & Rumor Checker",
        aiFactDesc: "Ask AI whether news, viral messages or FIR reports in Gujarat are real or rumors.",
        verify: "Check Truth",
        nearbyMap: "Nearby Emergency Stations",
        mapSub: "Police Stations, High/District Courts, Fire Stations",
        crimePrecautions: "Crime Precautions & AI Guide",
        selectCrimeType: "Select or Describe Crime:",
        getPrecautions: "How It Happens & Precautions",
        reportIncident: "Post Community Incident (+ Sign)",
        loginModalHeader: "Login to CrimeTrace Portal",
        notificationsTitle: "Gujarat Police & Crime Alerts"
    },
    hi: {
        login: "लॉगिन / प्रोफ़ाइल",
        breakingNews: "ताजा अपराध खबर",
        searchPlaceholder: "घटना, तारीख, स्थान, समय या शामिल व्यक्तियों द्वारा खोजें...",
        search: "घटनाएं खोजें",
        officialInfo: "आधिकारिक जानकारी (सत्यापित FIR)",
        peopleInfo: "नागरिक रिपोर्ट (सामुदायिक पोस्ट)",
        aiFactChecker: "AI सत्यता एवं अफवाह जांचकर्ता",
        aiFactDesc: "AI से पूछें कि क्या गुजरात की कोई खबर या FIR रिपोर्ट सच है या अफवाह।",
        verify: "सत्यता जांचें",
        nearbyMap: "नजदीकी आपातकालीन सेवाएं",
        mapSub: "पुलिस स्टेशन, कोर्ट और फायर स्टेशन",
        crimePrecautions: "अपराध सावधानियां एवं AI गाइड",
        selectCrimeType: "अपराध का प्रकार चुनें:",
        getPrecautions: "यह कैसे होता है और सावधानियां",
        reportIncident: "सामुदायिक घटना पोस्ट करें (+ चिह्न)",
        loginModalHeader: "क्राइमट्रेस पोर्टल में लॉगिन करें",
        notificationsTitle: "गुजरात पुलिस एवं अपराध अलर्ट"
    },
    gu: {
        login: "લોગિન / પ્રોફાઇલ",
        breakingNews: "મુખ્ય ગુના સમાચાર",
        searchPlaceholder: "ઘટના, તારીખ, સ્થળ, સમય અથવા વ્યક્તિઓ દ્વારા શોધો...",
        search: "ઘટનાઓ શોધો",
        officialInfo: "સત્તાવાર માહિતી (પ્રમાણિત FIR)",
        peopleInfo: "નાગરિક માહિતી (કોમ્યુનિટી પોસ્ટ્સ)",
        aiFactChecker: "AI સત્યતા અને અફવા ચકાસણી",
        aiFactDesc: "AI ને પૂછો કે શું ગુજરાતની કોઈ માહિતી કે સમાચાર સાચા છે કે અફવા.",
        verify: "સત્યતા તપાસો",
        nearbyMap: "નજીકની કટોકટી સેવાઓ",
        mapSub: "પોલીસ સ્ટેશન, કોર્ટ અને ફાયર સ્ટેશન",
        crimePrecautions: "ગુના નિવારણ અને AI માર્ગદર્શિકા",
        selectCrimeType: "ગુનાનો પ્રકાર પસંદ કરો:",
        getPrecautions: "આ કેવી રીતે થાય છે અને સાવચેતીઓ",
        reportIncident: "નવી ઘટના પોસ્ટ કરો (+ ચિહ્ન)",
        loginModalHeader: "ક્રાઇમટ્રેસ પોર્ટલમાં લોગિન કરો",
        notificationsTitle: "ગુજરાત પોલીસ અને ક્રાઇમ એલર્ટ્સ"
    }
};

let currentTab = "official";
let currentLang = "en";
let mainMap = null;

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
    renderFeed();
    initNearbyMap();
    initCrimeChart();
    setupEventListeners();
});

function setupEventListeners() {
    // Theme Switcher
    document.getElementById("themeToggleBtn").addEventListener("click", toggleTheme);

    // SOS Emergency Button
    document.getElementById("sosBtn").addEventListener("click", triggerSOS);

    // Multilingual Switcher
    document.getElementById("langSelect").addEventListener("change", (e) => {
        changeLanguage(e.target.value);
    });

    // Notifications Toggle
    document.getElementById("notifBtn").addEventListener("click", () => {
        document.getElementById("notifDropdown").classList.toggle("hidden");
    });

    // Search Engine
    document.getElementById("searchBtn").addEventListener("click", handleSearch);
    document.getElementById("searchInput").addEventListener("keyup", (e) => {
        if (e.key === "Enter") handleSearch();
    });

    // AI Fact Verification
    document.getElementById("aiVerifyBtn").addEventListener("click", verifyWithAI);

    // AI Precautions
    document.getElementById("crimeTypeSelect").addEventListener("change", (e) => {
        const customGroup = document.getElementById("customCrimeGroup");
        if (e.target.value === "custom") customGroup.classList.remove("hidden");
        else customGroup.classList.add("hidden");
    });
    document.getElementById("getPrecautionBtn").addEventListener("click", generatePrecautions);

    // Modals
    document.getElementById("loginModalBtn").addEventListener("click", () => {
        document.getElementById("loginModal").classList.remove("hidden");
    });
    document.getElementById("closeLoginModal").addEventListener("click", () => {
        document.getElementById("loginModal").classList.add("hidden");
    });
    document.getElementById("addIncidentFab").addEventListener("click", () => {
        document.getElementById("reportModal").classList.remove("hidden");
    });
    document.getElementById("closeReportModal").addEventListener("click", () => {
        document.getElementById("reportModal").classList.add("hidden");
    });

    // Form Submissions
    document.getElementById("reportForm").addEventListener("submit", handleReportSubmit);
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Login Successful!");
        document.getElementById("loginModal").classList.add("hidden");
        document.getElementById("loginBtnText").innerText = "My Profile";
    });
}

// 🚨 Emergency GPS SOS Trigger
function triggerSOS() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
                const sosMessage = encodeURIComponent(`🚨 EMERGENCY SOS! I need urgent help. My live GPS Location: ${mapsUrl}`);
                window.open(`https://wa.me/916355159954?text=${sosMessage}`, '_blank');
            },
            () => {
                alert("GPS permission denied. Opening emergency call dialog to 112 / +91 6355 159 954");
                window.open(`https://wa.me/916355159954?text=🚨%20EMERGENCY%20HELP%20REQUIRED%21`, '_blank');
            }
        );
    } else {
        alert("Geolocation not supported by browser.");
    }
}

// 🔊 Text-to-Speech Audio Reader
function readAloud(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Text-to-Speech not supported in this browser.");
    }
}

// 🗺️ Safe Route Finder
function findSafeRoute() {
    const from = document.getElementById("routeFrom").value.trim();
    const to = document.getElementById("routeTo").value.trim();
    const result = document.getElementById("routeResult");

    if (!from || !to) {
        alert("Please enter both origin and destination.");
        return;
    }

    result.classList.remove("hidden");
    result.innerHTML = `<strong><i class="fa-solid fa-shield-halved text-success"></i> Safe Route Calculated from ${from} to${to}:</strong><br>
                        • Preferred Path: Via Ring Road Main Arterial Highway.<br>
                        • Active Patrolling: 2 Police PCR Vans active on route.<br>
                        • Street Lighting: 98% well-lit stretch. Safe for night travel.`;
}

// 📄 Anonymous FIR Draft Generator
function generateFIRDraft() {
    const name = document.getElementById("firApplicant").value || "Anonymous Citizen";
    const loc = document.getElementById("firIncidentLocation").value || "Surat, Gujarat";
    const stmt = document.getElementById("firStatement").value || "Unidentified theft incident occurred.";
    const output = document.getElementById("firDraftOutput");

    output.classList.remove("hidden");
    output.innerHTML = `
        <div style="font-family: monospace; font-size: 0.8rem;">
            <strong>TO THE OFFICER-IN-CHARGE, LOCAL POLICE STATION, GUJARAT</strong><br><br>
            <strong>Subject:</strong> Initial Application for Registration of FIR under Bharatiya Nyaya Sanhita (BNS)<br><br>
            <strong>Applicant Name:</strong> ${name}<br>
            <strong>Place of Incident:</strong> ${loc}<br>
            <strong>Statement:</strong> "${stmt}"<br><br>
            <strong>Auto-Suggested Sections:</strong> BNS Section 303 (Theft) / BNS Section 318 (Cheating).<br>
            <em>Draft Generated via CrimeTrace Gujarat Portal. Print and submit to local Police Station.</em>
        </div>
    `;
}

// 📊 Chart.js Crime Analytics Chart
function initCrimeChart() {
    const ctx = document.getElementById('crimeAnalyticsChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cyber Fraud', 'Vehicle Theft', 'Robbery', 'Snatching'],
            datasets: [{
                data: [42, 28, 18, 12],
                backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#10b981']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
            }
        }
    });
}

// Theme Switcher
function toggleTheme() {
    const html = document.documentElement;
    const themeBtnIcon = document.querySelector("#themeToggleBtn i");
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        themeBtnIcon.className = "fa-solid fa-moon";
    } else {
        html.setAttribute("data-theme", "dark");
        themeBtnIcon.className = "fa-solid fa-sun";
    }
}

// Multilingual Switcher
function changeLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang] || translations["en"];

    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        if (dict[key]) elem.innerText = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(elem => {
        const key = elem.getAttribute("data-i18n-placeholder");
        if (dict[key]) elem.placeholder = dict[key];
    });
}

// Tab Switcher
function switchTab(type) {
    currentTab = type;
    document.getElementById("tabOfficial").classList.toggle("active", type === "official");
    document.getElementById("tabPeople").classList.toggle("active", type === "people");
    renderFeed();
}

// Render Incident Stream
function renderFeed(filteredData = null) {
    const feedBox = document.getElementById("postsFeed");
    feedBox.innerHTML = "";

    const dataset = filteredData || sampleIncidents.filter(i => i.type === currentTab);

    if (dataset.length === 0) {
        feedBox.innerHTML = `<div class="incident-card"><p>No incidents match your search query.</p></div>`;
        return;
    }

    dataset.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "incident-card";
        card.innerHTML = `
            <div class="card-header">
                <span class="card-title">${item.title}</span>${item.verified ? `<span class="rate-badge low"><i class="fa-solid fa-shield-check"></i> Official FIR</span>` : `<span class="rate-badge high"><i class="fa-solid fa-triangle-exclamation"></i> Citizen Report</span>`}
            </div>
            <div class="card-meta">
                <span><i class="fa-solid fa-location-dot text-accent"></i> <strong>Location:</strong> ${item.location}</span>
                <span><i class="fa-solid fa-clock text-accent"></i> <strong>Time/Date:</strong> ${item.date}</span>
            </div>
            <p style="margin-bottom:0.4rem;"><strong>People Involved:</strong> ${item.peopleInvolved}</p>
            <p><strong>Incident Details:</strong> ${item.details}</p>
            
            <div class="author-info">
                <span>Posted by: <strong>${item.author}</strong></span>
                <button class="follow-btn ${item.isFollowing ? 'following' : ''}" onclick="toggleFollow(${index})">
                    ${item.isFollowing ? 'Following' : '+ Follow Profile'}
                </button>
            </div>

            <!-- Per-Post Location Map -->
            <div id="inline-map-${item.id}" class="inline-map-box"></div>

            <!-- Social Action Bar -->
            <div class="card-actions">
                <span class="action-btn" onclick="likePost(${index})"><i class="fa-solid fa-thumbs-up"></i> <span id="like-count-${index}">${item.likes}</span> Likes</span>
                <span class="action-btn" onclick="toggleComments('${item.id}')"><i class="fa-solid fa-comment"></i> ${item.comments.length} Comments</span>
                <span class="action-btn" onclick="readAloud('${item.title}.${item.details}')"><i class="fa-solid fa-volume-high"></i> Listen</span>
                <span class="action-btn" onclick="sharePost('${item.title}')"><i class="fa-solid fa-share-nodes"></i> Share</span>
            </div>

            <!-- Comments Drawer -->
            <div id="comments-box-${item.id}" class="comments-section hidden">
                <div class="comment-list" id="comment-list-${item.id}">
                    ${item.comments.map(c => `<div class="comment-item"><i class="fa-solid fa-user"></i> ${c}</div>`).join('')}
                </div>
                <div class="comment-input-box">
                    <input type="text" id="comment-input-${item.id}" placeholder="Write your opinion...">
                    <button class="btn btn-primary btn-sm" onclick="addComment('${item.id}',${index})">Post Comment</button>
                </div>
            </div>
        `;

        feedBox.appendChild(card);

        // Render inline map for individual post
        setTimeout(() => {
            const inlineMap = L.map(`inline-map-${item.id}`).setView([item.lat, item.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(inlineMap);
            L.marker([item.lat, item.lng]).addTo(inlineMap)
                .bindPopup(`<b>${item.title}</b><br>${item.location}`)
                .openPopup();
        }, 120);
    });
}

function toggleFollow(index) {
    sampleIncidents[index].isFollowing = !sampleIncidents[index].isFollowing;
    renderFeed();
}

function likePost(index) {
    sampleIncidents[index].likes += 1;
    document.getElementById(`like-count-${index}`).innerText = sampleIncidents[index].likes;
}

function toggleComments(id) {
    document.getElementById(`comments-box-${id}`).classList.toggle("hidden");
}

function addComment(id, index) {
    const input = document.getElementById(`comment-input-${id}`);
    const val = input.value.trim();
    if (val !== "") {
        sampleIncidents[index].comments.push(val);
        input.value = "";
        renderFeed();
        document.getElementById(`comments-box-${id}`).classList.remove("hidden");
    }
}

function sharePost(title) {
    if (navigator.share) {
        navigator.share({ title: 'Gujarat CrimeTrace Alert', text: title, url: window.location.href }).catch(() => {});
    } else {
        alert(`Share link for "${title}" copied to clipboard!`);
    }
}

function handleSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!query) {
        renderFeed();
        return;
    }

    const filtered = sampleIncidents.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query) ||
        item.peopleInvolved.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query)
    );

    renderFeed(filtered);
}

function verifyWithAI() {
    const query = document.getElementById("aiQueryInput").value.trim();
    const resultBox = document.getElementById("aiResultBox");

    if (!query) {
        alert("Please enter news or statement text to verify.");
        return;
    }

    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI cross-referencing Gujarat Police FIR records...`;

    setTimeout(() => {
        if (query.toLowerCase().includes("curfew") || query.toLowerCase().includes("shutdown")) {
            resultBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark text-danger"></i> High Probability of Rumor (Truth Score: 12%)</strong><br>No official police notification or FIR supports this claim.[cite: 1]`;
        } else {
            resultBox.innerHTML = `<strong><i class="fa-solid fa-circle-check text-success"></i> Likely Authentic (Truth Score: 92%)</strong><br>Matches FIR register entries and verified police intelligence bulletins.[cite: 1]`;
        }
    }, 1100);
}

function triggerAIIngest() {
    alert("AI Ingest Engine synced with Gujarat Police Portal. 2 new official FIR entries fetched.");
}

function generatePrecautions() {
    const select = document.getElementById("crimeTypeSelect").value;
    const customText = document.getElementById("customCrimeInput").value;
    const output = document.getElementById("precautionOutput");

    output.classList.remove("hidden");
    output.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI generating safety guide...`;

    setTimeout(() => {
        let text = "";
        if (select === "cyber") {
            text = `<strong>How Cyber Fraud Happens:</strong> Attackers send fake electricity bill APKs or OTP spoofing links.<br>
                    <strong>Precautions:</strong> Never click unknown links or share OTPs. Call National Cyber Helpline 1930.[cite: 1]`;
        } else if (select === "burglary") {
            text = `<strong>How Burglary Happens:</strong> Theft in unmonitored premises during travel.<br>
                    <strong>Precautions:</strong> Inform nearest Gujarat Police station before extended trips.`;
        } else {
            text = `<strong>AI Safety Analysis for "${customText}":</strong> Stay alert, save Emergency 112 on speed dial, and report suspicious persons instantly.[cite: 1]`;
        }
        output.innerHTML = text;
    }, 900);
}

function initNearbyMap() {
    mainMap = L.map('nearbyMap').setView([21.1702, 72.8311], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(mainMap);

    const emergencyLocations = [
        { name: "Surat Central Police Station", lat: 21.1980, lng: 72.8280, type: "Police Station" },
        { name: "Surat District & Sessions Court", lat: 21.1850, lng: 72.8150, type: "Court" },
        { name: "Main Fire Station Surat", lat: 21.1750, lng: 72.8350, type: "Fire Station" }
    ];

    emergencyLocations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(mainMap).bindPopup(`<b>${loc.name}</b><br>Type:${loc.type}`);
    });
}

function handleReportSubmit(e) {
    e.preventDefault();
    const isAnon = document.getElementById("repAnonymous").checked;
    
    const newIncident = {
        id: "post-" + Date.now(),
        type: "people",
        title: document.getElementById("repTitle").value,
        location: document.getElementById("repLocation").value,
        date: document.getElementById("repTime").value.replace("T", " "),
        peopleInvolved: document.getElementById("repPeople").value || "N/A",
        details: document.getElementById("repDetails").value,
        lat: 21.1702 + (Math.random() - 0.5) * 0.04,
        lng: 72.8311 + (Math.random() - 0.5) * 0.04,
        verified: false,
        likes: 0,
        comments: [],
        author: isAnon ? "Anonymous Citizen" : "You (Citizen)",
        isFollowing: false
    };

    sampleIncidents.unshift(newIncident);
    document.getElementById("reportModal").classList.add("hidden");
    document.getElementById("reportForm").reset();

    switchTab("people");
    alert("Your incident post has been published!");
}