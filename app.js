/**
 * Comoros Deploy - Main JavaScript Application
 * High-Performance Single Page Experience with Live Admin Pricing & WhatsApp Integration
 */

// Default Configurations
const DEFAULT_CONFIG = {
    whatsappNumber: "8801410830826",
    currency: "USD", // "USD" or "BDT"
    featuredFbVideoUrl: "https://www.facebook.com/share/v/1dzhr3Ap1P/",
    stats: [
        { id: 1, val: "100+", lbl: "Websites Delivered" },
        { id: 2, val: "99.8%", lbl: "Client Satisfaction" },
        { id: 3, val: "24 - 72h", lbl: "Express Turnaround" },
        { id: 4, val: "24/7", lbl: "Direct Support" }
    ],
    packages: [
        {
            id: 1,
            name: "Landing Page & Portfolio",
            tag: "Launchpad",
            priceUsd: 99,
            priceBdt: 11500,
            desc: "Ideal for high-converting single Landing Pages and personal/agency Portfolio Websites.",
            delivery: "24 - 48 Hours",
            features: [
                "Landing Page & Portfolio Design",
                "Modern & Professional Design",
                "100% Mobile Responsive Websites",
                "Fast & User-Friendly Experience",
                "Direct WhatsApp & Contact Forms",
                "Professional Development Support"
            ],
            popular: false,
            badgeColor: "cyan"
        },
        {
            id: 2,
            name: "Business Website Plan",
            tag: "Most Popular",
            priceUsd: 249,
            priceBdt: 28500,
            desc: "Tailor-made Business Website Development and UI/UX Design to establish company authority.",
            delivery: "3 - 5 Days",
            features: [
                "Complete Business Website Development",
                "Custom UI/UX Design & Pro Layouts",
                "100% Mobile Responsive Websites",
                "Fast & User-Friendly Experience",
                "Lead Capture Forms & WhatsApp Sync",
                "Professional Development Support"
            ],
            popular: true,
            badgeColor: "emerald"
        },
        {
            id: 3,
            name: "E-commerce & Custom Web",
            tag: "Full Scale",
            priceUsd: 599,
            priceBdt: 69000,
            desc: "High-performance E-commerce Websites and Custom Web Development tailored to your needs.",
            delivery: "7 - 14 Days",
            features: [
                "E-commerce Websites & Online Stores",
                "Custom Web Development & Logic",
                "Modern & Professional UI/UX Design",
                "100% Mobile Responsive Experience",
                "Fast Checkout & Order Management",
                "Dedicated Professional Support"
            ],
            popular: false,
            badgeColor: "yellow"
        }
    ]
};

// Storage key
const STORAGE_KEY = 'comoros_deploy_store_v5';

// Load stored settings or default
function getAppSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed;
        }
    } catch (e) {
        console.error("Storage error:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

// Save settings to LocalStorage
function saveAppSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
        console.error("Failed to save settings", e);
    }
}

// Global active state
let currentSettings = getAppSettings();
let activeCurrency = "USD"; // Default active display currency

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    renderStats();
    renderPricing();
    renderFeaturedVideo();
    setupCurrencySwitchers();
    setupAdminModal();
    setupContactForm();
    setupFaqAccordion();
    setupMobileMenu();
    updateFooterYear();
});

// 1. STARFIELD CANVAS ANIMATION
function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numStars = Math.min(100, Math.floor(window.innerWidth / 15));
    const stars = [];

    const starColors = ["#ffffff", "#00F0FF", "#00E676", "#FFD600", "#FF1744"];

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.3,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            alpha: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.3 + 0.05
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.y -= s.speed;
            if (s.y < 0) {
                s.y = height;
                s.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.alpha;
            ctx.shadowBlur = 4;
            ctx.shadowColor = s.color;
            ctx.fill();
        }

        ctx.globalAlpha = 1.0;
        requestAnimationFrame(animate);
    }

    animate();
}

// 1.5 RENDER STATS COUNTERS
function renderStats() {
    const s = currentSettings.stats || DEFAULT_CONFIG.stats;
    const s1 = s.find(x => x.id === 1) || DEFAULT_CONFIG.stats[0];
    const s2 = s.find(x => x.id === 2) || DEFAULT_CONFIG.stats[1];
    const s3 = s.find(x => x.id === 3) || DEFAULT_CONFIG.stats[2];
    const s4 = s.find(x => x.id === 4) || DEFAULT_CONFIG.stats[3];

    const el1Val = document.getElementById("stat1Val");
    const el1Lbl = document.getElementById("stat1Lbl");
    const el2Val = document.getElementById("stat2Val");
    const el2Lbl = document.getElementById("stat2Lbl");
    const el3Val = document.getElementById("stat3Val");
    const el3Lbl = document.getElementById("stat3Lbl");
    const el4Val = document.getElementById("stat4Val");
    const el4Lbl = document.getElementById("stat4Lbl");

    if (el1Val) el1Val.textContent = s1.val;
    if (el1Lbl) el1Lbl.textContent = s1.lbl;

    if (el2Val) el2Val.textContent = s2.val;
    if (el2Lbl) el2Lbl.textContent = s2.lbl;

    if (el3Val) el3Val.textContent = s3.val;
    if (el3Lbl) el3Lbl.textContent = s3.lbl;

    if (el4Val) el4Val.textContent = s4.val;
    if (el4Lbl) el4Lbl.textContent = s4.lbl;
}

// 2. RENDER PRICING CARDS
function renderPricing() {
    const container = document.getElementById("pricingContainer");
    if (!container) return;

    container.innerHTML = "";

    const whatsappNum = currentSettings.whatsappNumber || "8801410830826";

    currentSettings.packages.forEach((pkg) => {
        const isBdt = activeCurrency === "BDT";
        const priceFormatted = isBdt 
            ? `৳${pkg.priceBdt.toLocaleString()}` 
            : `$${pkg.priceUsd.toLocaleString()}`;

        const isPopular = pkg.popular;
        
        // Card wrapper
        const card = document.createElement("div");
        card.className = `relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
            isPopular 
                ? "bg-[#0f1528] border-2 border-emerald-400/80 shadow-2xl shadow-emerald-500/10 popular-plan-glow md:-translate-y-2" 
                : "bg-[#0d1222] border border-white/10 hover:border-white/25"
        }`;

        // Pre-filled WhatsApp message
        const message = `Hello Comoros Deploy! I would like to order the "${pkg.name}" package (${priceFormatted}). Please guide me through starting the project.`;
        const waLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <div>
                <!-- Top Tags -->
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold uppercase tracking-wider ${
                        isPopular ? "text-emerald-400" : "text-cyan-400"
                    }">${pkg.tag}</span>
                    ${isPopular ? `
                        <span class="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-400 to-cyan-400 text-black">
                            <i class="fa-solid fa-fire mr-1"></i> Highly Recommended
                        </span>
                    ` : `
                        <span class="text-xs text-gray-500 font-medium"><i class="fa-regular fa-clock mr-1"></i> ${pkg.delivery}</span>
                    `}
                </div>

                <!-- Package Title -->
                <h3 class="text-2xl font-bold font-heading text-white mb-2">${pkg.name}</h3>
                <p class="text-xs text-gray-400 mb-6 min-h-[36px]">${pkg.desc}</p>

                <!-- Price -->
                <div class="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/10">
                    <span class="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight">${priceFormatted}</span>
                    <span class="text-xs text-gray-400 uppercase font-semibold">/ flat rate</span>
                </div>

                <!-- Features list -->
                <ul class="space-y-3.5 mb-8 text-xs text-gray-300">
                    ${pkg.features.map(f => `
                        <li class="flex items-start gap-2.5">
                            <i class="fa-solid fa-circle-check text-emerald-400 mt-0.5 text-sm"></i>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- CTA Button -->
            <div>
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isPopular 
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-black hover:opacity-95 shadow-lg shadow-emerald-500/25" 
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-cyan-400/40"
                }">
                    <i class="fa-brands fa-whatsapp text-lg"></i>
                    <span>Order via WhatsApp &rarr;</span>
                </a>
                <p class="text-center text-[10px] text-gray-500 mt-2.5">Instant WhatsApp chat &amp; quote</p>
            </div>
        `;

        container.appendChild(card);
    });
}

// 3. CURRENCY SWITCHER
function setupCurrencySwitchers() {
    const usdBtn = document.getElementById("currUsd");
    const bdtBtn = document.getElementById("currBdt");

    if (!usdBtn || !bdtBtn) return;

    usdBtn.addEventListener("click", () => {
        activeCurrency = "USD";
        usdBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 text-black shadow-md transition-all";
        bdtBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all";
        renderPricing();
    });

    bdtBtn.addEventListener("click", () => {
        activeCurrency = "BDT";
        bdtBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 text-black shadow-md transition-all";
        usdBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all";
        renderPricing();
    });
}

// 3.5 RENDER FEATURED FACEBOOK VIDEO
function renderFeaturedVideo() {
    const iframe = document.getElementById("fbVideoPlayerIframe");
    if (!iframe) return;

    const targetUrl = currentSettings.featuredFbVideoUrl || "https://www.facebook.com/share/v/1dzhr3Ap1P/";
    iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(targetUrl)}&show_text=false&width=900`;
}

// 4. ADMIN MODAL & PRICE EDITING
function setupAdminModal() {
    const modal = document.getElementById("adminModal");
    const adminBtnHeader = document.getElementById("adminBtnHeader");
    const adminBtnMobile = document.getElementById("adminBtnMobile");
    const adminBtnFooter = document.getElementById("adminBtnFooter");
    const quickEditPricingBtn = document.getElementById("quickEditPricingBtn");
    const closeButtons = document.querySelectorAll(".closeAdminModal");

    const authStage = document.getElementById("adminAuthStage");
    const dashboardStage = document.getElementById("adminDashboardStage");
    const pinInput = document.getElementById("adminPasswordInput");
    const loginBtn = document.getElementById("adminLoginBtn");
    const authError = document.getElementById("adminAuthError");

    const saveBtn = document.getElementById("adminSaveBtn");
    const resetBtn = document.getElementById("adminResetBtn");
    const successMsg = document.getElementById("adminSuccessMsg");

    function openModal() {
        modal.classList.remove("hidden");
        authError.classList.add("hidden");
        pinInput.value = "";
        authStage.classList.remove("hidden");
        dashboardStage.classList.add("hidden");
        setTimeout(() => pinInput.focus(), 100);
    }

    function closeModal() {
        modal.classList.add("hidden");
        authStage.classList.remove("hidden");
        dashboardStage.classList.add("hidden");
        pinInput.value = "";
    }

    if (adminBtnHeader) adminBtnHeader.addEventListener("click", openModal);
    if (adminBtnMobile) adminBtnMobile.addEventListener("click", openModal);
    if (adminBtnFooter) adminBtnFooter.addEventListener("click", openModal);
    if (quickEditPricingBtn) quickEditPricingBtn.addEventListener("click", openModal);

    closeButtons.forEach(btn => btn.addEventListener("click", closeModal));

    // Handle Auth via Secure Cryptographic Hash (Only your secret PIN 619105 works)
    const SECRET_HASH = "b948b6c121452f21704dfc301866cb95881aa596ddd1101ca61b84a7ce62f736";

    async function checkAdminPin(pin) {
        try {
            if (window.crypto && crypto.subtle) {
                const buffer = new TextEncoder().encode(pin);
                const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                return hashHex === SECRET_HASH;
            }
        } catch (e) {
            console.error(e);
        }
        return pin === "619105";
    }

    async function attemptLogin() {
        const enteredPin = pinInput.value.trim();
        const isValid = await checkAdminPin(enteredPin);

        if (isValid) {
            authStage.classList.add("hidden");
            dashboardStage.classList.remove("hidden");
            populateAdminInputs();
        } else {
            authError.classList.remove("hidden");
            pinInput.value = "";
            pinInput.focus();
        }
    }

    loginBtn.addEventListener("click", attemptLogin);
    pinInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            attemptLogin();
        }
    });

    // Populate inputs
    function populateAdminInputs() {
        // Populate Stats
        const stats = currentSettings.stats || DEFAULT_CONFIG.stats;
        const s1 = stats.find(x => x.id === 1) || DEFAULT_CONFIG.stats[0];
        const s2 = stats.find(x => x.id === 2) || DEFAULT_CONFIG.stats[1];
        const s3 = stats.find(x => x.id === 3) || DEFAULT_CONFIG.stats[2];
        const s4 = stats.find(x => x.id === 4) || DEFAULT_CONFIG.stats[3];

        if (document.getElementById("editStat1Val")) document.getElementById("editStat1Val").value = s1.val;
        if (document.getElementById("editStat1Lbl")) document.getElementById("editStat1Lbl").value = s1.lbl;

        if (document.getElementById("editStat2Val")) document.getElementById("editStat2Val").value = s2.val;
        if (document.getElementById("editStat2Lbl")) document.getElementById("editStat2Lbl").value = s2.lbl;

        if (document.getElementById("editStat3Val")) document.getElementById("editStat3Val").value = s3.val;
        if (document.getElementById("editStat3Lbl")) document.getElementById("editStat3Lbl").value = s3.lbl;

        if (document.getElementById("editStat4Val")) document.getElementById("editStat4Val").value = s4.val;
        if (document.getElementById("editStat4Lbl")) document.getElementById("editStat4Lbl").value = s4.lbl;

        // Populate Packages
        const p1 = currentSettings.packages.find(p => p.id === 1) || {};
        const p2 = currentSettings.packages.find(p => p.id === 2) || {};
        const p3 = currentSettings.packages.find(p => p.id === 3) || {};

        document.getElementById("editPkg1Usd").value = p1.priceUsd || 99;
        document.getElementById("editPkg1Bdt").value = p1.priceBdt || 11500;

        document.getElementById("editPkg2Usd").value = p2.priceUsd || 249;
        document.getElementById("editPkg2Bdt").value = p2.priceBdt || 28500;

        document.getElementById("editPkg3Usd").value = p3.priceUsd || 599;
        document.getElementById("editPkg3Bdt").value = p3.priceBdt || 69000;

        document.getElementById("editWhatsappNumber").value = currentSettings.whatsappNumber || "8801410830826";
        document.getElementById("editFbVideoUrl").value = currentSettings.featuredFbVideoUrl || "";
    }

    // Save changes
    saveBtn.addEventListener("click", () => {
        // Save Stats
        const s1Val = document.getElementById("editStat1Val").value.trim() || "100+";
        const s1Lbl = document.getElementById("editStat1Lbl").value.trim() || "Websites Delivered";

        const s2Val = document.getElementById("editStat2Val").value.trim() || "99.8%";
        const s2Lbl = document.getElementById("editStat2Lbl").value.trim() || "Client Satisfaction";

        const s3Val = document.getElementById("editStat3Val").value.trim() || "24 - 72h";
        const s3Lbl = document.getElementById("editStat3Lbl").value.trim() || "Express Turnaround";

        const s4Val = document.getElementById("editStat4Val").value.trim() || "24/7";
        const s4Lbl = document.getElementById("editStat4Lbl").value.trim() || "Direct Support";

        currentSettings.stats = [
            { id: 1, val: s1Val, lbl: s1Lbl },
            { id: 2, val: s2Val, lbl: s2Lbl },
            { id: 3, val: s3Val, lbl: s3Lbl },
            { id: 4, val: s4Val, lbl: s4Lbl }
        ];

        // Save Packages & General
        const p1Usd = parseInt(document.getElementById("editPkg1Usd").value) || 99;
        const p1Bdt = parseInt(document.getElementById("editPkg1Bdt").value) || 11500;

        const p2Usd = parseInt(document.getElementById("editPkg2Usd").value) || 249;
        const p2Bdt = parseInt(document.getElementById("editPkg2Bdt").value) || 28500;

        const p3Usd = parseInt(document.getElementById("editPkg3Usd").value) || 599;
        const p3Bdt = parseInt(document.getElementById("editPkg3Bdt").value) || 69000;

        const waNum = document.getElementById("editWhatsappNumber").value.trim() || "8801410830826";
        const fbVideoUrl = document.getElementById("editFbVideoUrl").value.trim();

        currentSettings.packages[0].priceUsd = p1Usd;
        currentSettings.packages[0].priceBdt = p1Bdt;

        currentSettings.packages[1].priceUsd = p2Usd;
        currentSettings.packages[1].priceBdt = p2Bdt;

        currentSettings.packages[2].priceUsd = p3Usd;
        currentSettings.packages[2].priceBdt = p3Bdt;

        currentSettings.whatsappNumber = waNum;
        currentSettings.featuredFbVideoUrl = fbVideoUrl;

        saveAppSettings(currentSettings);
        renderStats();
        renderPricing();
        renderFeaturedVideo();

        successMsg.classList.remove("hidden");
        setTimeout(() => {
            successMsg.classList.add("hidden");
            closeModal();
        }, 1200);
    });

    // Reset defaults
    resetBtn.addEventListener("click", () => {
        if (confirm("Reset website settings, stats, and pricing back to default?")) {
            currentSettings = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
            saveAppSettings(currentSettings);
            populateAdminInputs();
            renderStats();
            renderPricing();
            renderFeaturedVideo();
            alert("Settings have been reset to default values.");
        }
    });
}

// 5. CONTACT FORM TO WHATSAPP INTEGRATION
function setupContactForm() {
    const form = document.getElementById("whatsappForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("clientName").value.trim();
        const phone = document.getElementById("clientPhone").value.trim();
        const type = document.getElementById("projectType").value;
        const budget = document.getElementById("projectBudget").value;
        const details = document.getElementById("projectDetails").value.trim();

        const destNumber = currentSettings.whatsappNumber || "8801410830826";

        const textMessage = 
`*NEW PROJECT INQUIRY - COMOROS DEPLOY*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
📞 *Phone / Contact:* ${phone}
💻 *Project Type:* ${type}
💰 *Target Budget:* ${budget}
📝 *Project Details:* 
${details ? details : 'Not specified yet. Ready to discuss.'}
━━━━━━━━━━━━━━━━━━━━
*Sent directly from Comoros Deploy website*`;

        const waUrl = `https://wa.me/${destNumber}?text=${encodeURIComponent(textMessage)}`;
        
        // Open WhatsApp in new tab
        window.open(waUrl, "_blank");
    });
}

// 6. FAQ ACCORDION
function setupFaqAccordion() {
    const toggles = document.querySelectorAll(".faq-toggle");
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector("i");
            
            const isHidden = content.classList.contains("hidden");
            
            // Close all
            document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
            document.querySelectorAll(".faq-toggle i").forEach(i => i.style.transform = "rotate(0deg)");

            if (isHidden) {
                content.classList.remove("hidden");
                icon.style.transform = "rotate(180deg)";
            }
        });
    });
}

// 7. MOBILE MENU
function setupMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    menu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => menu.classList.add("hidden"));
    });
}

// 8. FOOTER YEAR
function updateFooterYear() {
    const yr = document.getElementById("currentYear");
    if (yr) yr.textContent = new Date().getFullYear();
}
