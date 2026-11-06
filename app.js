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
const STORAGE_KEY = 'comoros_deploy_store_v7';

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
    setupLanguageSwitcher();
    initSpotlightCards();
    initScrollReveal();
    animateStatsCounters();
    updateFooterYear();
    setupAiChatbot();
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
        const priceFormatted = `$${pkg.priceUsd.toLocaleString()}`;
        const isPopular = pkg.popular;
        
        // Card wrapper
        const card = document.createElement("div");
        card.className = `spotlight-card reveal-on-scroll relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
            isPopular 
                ? "popular-plan-glow md:-translate-y-2" 
                : ""
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
    const videoLinks = document.querySelectorAll('a[href*="facebook.com/share/v/"], a[href*="facebook.com/reel/"]');
    const targetUrl = currentSettings.featuredFbVideoUrl || "https://www.facebook.com/share/v/1dzhr3Ap1P/";
    videoLinks.forEach(link => {
        link.href = targetUrl;
    });
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

        if (document.getElementById("editPkg1Usd")) document.getElementById("editPkg1Usd").value = p1.priceUsd || 99;
        if (document.getElementById("editPkg2Usd")) document.getElementById("editPkg2Usd").value = p2.priceUsd || 249;
        if (document.getElementById("editPkg3Usd")) document.getElementById("editPkg3Usd").value = p3.priceUsd || 599;

        if (document.getElementById("editWhatsappNumber")) document.getElementById("editWhatsappNumber").value = currentSettings.whatsappNumber || "8801410830826";
        if (document.getElementById("editFbVideoUrl")) document.getElementById("editFbVideoUrl").value = currentSettings.featuredFbVideoUrl || "";
    }

    // Save changes
    saveBtn.addEventListener("click", () => {
        // Save Stats
        const s1Val = document.getElementById("editStat1Val") ? document.getElementById("editStat1Val").value.trim() || "100+" : "100+";
        const s1Lbl = document.getElementById("editStat1Lbl") ? document.getElementById("editStat1Lbl").value.trim() || "Websites Delivered" : "Websites Delivered";

        const s2Val = document.getElementById("editStat2Val") ? document.getElementById("editStat2Val").value.trim() || "99.8%" : "99.8%";
        const s2Lbl = document.getElementById("editStat2Lbl") ? document.getElementById("editStat2Lbl").value.trim() || "Client Satisfaction" : "Client Satisfaction";

        const s3Val = document.getElementById("editStat3Val") ? document.getElementById("editStat3Val").value.trim() || "24 - 72h" : "24 - 72h";
        const s3Lbl = document.getElementById("editStat3Lbl") ? document.getElementById("editStat3Lbl").value.trim() || "Express Turnaround" : "Express Turnaround";

        const s4Val = document.getElementById("editStat4Val") ? document.getElementById("editStat4Val").value.trim() || "24/7" : "24/7";
        const s4Lbl = document.getElementById("editStat4Lbl") ? document.getElementById("editStat4Lbl").value.trim() || "Direct Support" : "Direct Support";

        currentSettings.stats = [
            { id: 1, val: s1Val, lbl: s1Lbl },
            { id: 2, val: s2Val, lbl: s2Lbl },
            { id: 3, val: s3Val, lbl: s3Lbl },
            { id: 4, val: s4Val, lbl: s4Lbl }
        ];

        // Save Packages & General
        const p1Usd = document.getElementById("editPkg1Usd") ? parseInt(document.getElementById("editPkg1Usd").value) || 99 : 99;
        const p2Usd = document.getElementById("editPkg2Usd") ? parseInt(document.getElementById("editPkg2Usd").value) || 249 : 249;
        const p3Usd = document.getElementById("editPkg3Usd") ? parseInt(document.getElementById("editPkg3Usd").value) || 599 : 599;

        const waNum = document.getElementById("editWhatsappNumber") ? document.getElementById("editWhatsappNumber").value.trim() || "8801410830826" : "8801410830826";
        const fbVideoUrl = document.getElementById("editFbVideoUrl") ? document.getElementById("editFbVideoUrl").value.trim() : "";

        if (currentSettings.packages[0]) currentSettings.packages[0].priceUsd = p1Usd;
        if (currentSettings.packages[1]) currentSettings.packages[1].priceUsd = p2Usd;
        if (currentSettings.packages[2]) currentSettings.packages[2].priceUsd = p3Usd;

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

// 9. MULTI-LANGUAGE TRANSLATION CONTROLLER (10 TOP LANGUAGES)
const LANG_MAP = {
    'en': { name: 'English', flag: '🇺🇸', label: 'EN' },
    'bn': { name: 'বাংলা', flag: '🇧🇩', label: 'বাংলা' },
    'es': { name: 'Español', flag: '🇪🇸', label: 'ES' },
    'ar': { name: 'العربية', flag: '🇸🇦', label: 'AR' },
    'fr': { name: 'Français', flag: '🇫🇷', label: 'FR' },
    'de': { name: 'Deutsch', flag: '🇩🇪', label: 'DE' },
    'zh-CN': { name: '中文', flag: '🇨🇳', label: 'ZH' },
    'hi': { name: 'हिन्दी', flag: '🇮🇳', label: 'HI' },
    'pt': { name: 'Português', flag: '🇵🇹', label: 'PT' },
    'ja': { name: '日本語', flag: '🇯🇵', label: 'JA' }
};

// Google translate initialization callback
window.googleTranslateElementInit = function() {
    try {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,bn,es,ar,fr,de,zh-CN,hi,pt,ja',
            autoDisplay: false
        }, 'google_translate_element');

        // Check if user previously picked a language
        const saved = localStorage.getItem('comoros_user_lang');
        if (saved && saved !== 'en') {
            setTimeout(() => {
                const combo = document.querySelector('.goog-te-combo');
                if (combo) {
                    combo.value = saved;
                    combo.dispatchEvent(new Event('change'));
                }
            }, 800);
        }
    } catch (e) {
        console.warn("Translation service initializing...", e);
    }
};

function setupLanguageSwitcher() {
    const btn = document.getElementById("langToggleBtn");
    const menu = document.getElementById("langMenu");
    const chevron = document.getElementById("langChevron");

    if (btn && menu) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("hidden");
            if (chevron) chevron.classList.toggle("rotate-180");
        });

        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.add("hidden");
                if (chevron) chevron.classList.remove("rotate-180");
            }
        });
    }

    // Set initial label from storage
    const saved = localStorage.getItem('comoros_user_lang') || 'en';
    updateLanguageUI(saved);
}

function updateLanguageUI(langCode) {
    const info = LANG_MAP[langCode] || LANG_MAP['en'];
    const lbl = document.getElementById("currentLangLabel");
    if (lbl) lbl.textContent = `${info.flag} ${info.label}`;

    const mobileSel = document.getElementById("mobileLangSelect");
    if (mobileSel) mobileSel.value = langCode;
}

window.changeSiteLanguage = function(langCode, reloadIfFail = true) {
    try {
        localStorage.setItem('comoros_user_lang', langCode);
        updateLanguageUI(langCode);

        // Update cookies for Google Translate
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;

        // Update Google select combo
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = langCode;
            combo.dispatchEvent(new Event('change'));
        } else if (reloadIfFail) {
            location.reload();
        }
    } catch (e) {
        console.error("Language change error", e);
    }

    const menu = document.getElementById("langMenu");
    if (menu) menu.classList.add("hidden");
};

// 10. INTERACTIVE SPOTLIGHT HOVER FOR CARDS
function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// 11. SCROLL REVEAL OBSERVER
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// 12. SMOOTH NUMBER COUNTER ANIMATION
function animateStatsCounters() {
    const container = document.getElementById('statsContainer');
    if (!container || !('IntersectionObserver' in window)) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            observer.unobserve(container);

            const stat1 = document.getElementById('stat1Val');
            const stat2 = document.getElementById('stat2Val');

            // Dynamically animate stat 1
            if (stat1) {
                const text = stat1.textContent.trim();
                const match = text.match(/^(\d+)(\+?)$/);
                if (match) {
                    const targetNum = parseInt(match[1]);
                    const suffix = match[2] || '';
                    let start = 0;
                    const step = Math.max(1, Math.floor(targetNum / 40));
                    const timer = setInterval(() => {
                        start += step;
                        if (start >= targetNum) {
                            stat1.textContent = `${targetNum}${suffix}`;
                            clearInterval(timer);
                        } else {
                            stat1.textContent = `${start}${suffix}`;
                        }
                    }, 25);
                }
            }

            // Dynamically animate stat 2
            if (stat2) {
                const text = stat2.textContent.trim();
                const match = text.match(/^([\d.]+)(%?)$/);
                if (match) {
                    const targetNum = parseFloat(match[1]);
                    const suffix = match[2] || '%';
                    let start = Math.max(0, targetNum - 15);
                    const timer = setInterval(() => {
                        start += 0.3;
                        if (start >= targetNum) {
                            stat2.textContent = `${targetNum}${suffix}`;
                            clearInterval(timer);
                        } else {
                            stat2.textContent = `${start.toFixed(1)}${suffix}`;
                        }
                    }, 25);
                }
            }
        }
    }, { threshold: 0.3 });

    observer.observe(container);
}

// 12. COMOROS DEPLOY AI CHATBOT ENGINE
function setupAiChatbot() {
    const toggleBtn = document.getElementById("aiChatToggleBtn");
    const teaser = document.getElementById("aiChatTeaser");
    const closeTeaserBtn = document.getElementById("closeTeaserBtn");
    const modal = document.getElementById("aiChatModal");
    const closeBtn = document.getElementById("aiCloseChatBtn");
    const resetBtn = document.getElementById("aiResetChatBtn");
    const form = document.getElementById("aiChatForm");
    const input = document.getElementById("aiChatInput");
    const messagesContainer = document.getElementById("aiChatMessages");
    const typingIndicator = document.getElementById("aiTypingIndicator");
    const quickButtons = document.querySelectorAll(".ai-quick-btn");

    if (!toggleBtn || !modal || !form || !input || !messagesContainer) return;

    const whatsappNum = currentSettings.whatsappNumber || "8801410830826";

    // Toggle Modal
    function openChat() {
        modal.classList.remove("hidden");
        if (teaser) teaser.classList.add("hidden");
        setTimeout(() => {
            input.focus();
            scrollToBottom();
        }, 150);
    }

    function closeChat() {
        modal.classList.add("hidden");
    }

    toggleBtn.addEventListener("click", () => {
        if (modal.classList.contains("hidden")) {
            openChat();
        } else {
            closeChat();
        }
    });

    if (teaser) {
        teaser.addEventListener("click", (e) => {
            if (e.target.closest("#closeTeaserBtn")) return;
            openChat();
        });
    }

    if (closeTeaserBtn) {
        closeTeaserBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (teaser) teaser.classList.add("hidden");
        });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeChat);

    // Reset Chat to Default
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            messagesContainer.innerHTML = `
                <div class="flex items-start gap-2.5 chat-bubble-enter">
                    <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black flex-shrink-0 text-[11px] font-bold shadow-md">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </div>
                    <div class="max-w-[85%] rounded-2xl rounded-tl-none p-3.5 bg-white/[0.04] border border-white/10 text-gray-200 leading-relaxed shadow-sm">
                        <p class="mb-2">Hello! 👋 Welcome back to <strong>Comoros Deploy</strong>.</p>
                        <p class="mb-2">I am your intelligent assistant. I can help you choose the best website package, explain our turnaround times, or guide you through starting a new project.</p>
                        <p class="text-cyan-400 font-semibold">What type of website are you looking to build today?</p>
                    </div>
                </div>
            `;
            scrollToBottom();
            input.focus();
        });
    }

    // Scroll helper
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Append User Message
    function appendUserMessage(text) {
        const div = document.createElement("div");
        div.className = "flex items-start justify-end gap-2 chat-bubble-enter";
        const cleanText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        div.innerHTML = `
            <div class="max-w-[85%] rounded-2xl rounded-tr-none px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold leading-relaxed shadow-md text-xs">
                ${cleanText}
            </div>
        `;
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    // Append Bot Message
    function appendBotMessage(html) {
        const div = document.createElement("div");
        div.className = "flex items-start gap-2.5 chat-bubble-enter";
        div.innerHTML = `
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black flex-shrink-0 text-[11px] font-bold shadow-md">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div class="max-w-[85%] rounded-2xl rounded-tl-none p-3.5 bg-white/[0.04] border border-white/10 text-gray-200 leading-relaxed shadow-sm text-xs">
                ${html}
            </div>
        `;
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    // Intelligent AI Response Engine
    function generateAiAnswer(userText) {
        const q = userText.toLowerCase().trim();
        const hasBangla = /[\u0980-\u09FF]/.test(userText);

        // Current live pricing packages
        const p1 = currentSettings.packages.find(p => p.id === 1) || { priceUsd: 99 };
        const p2 = currentSettings.packages.find(p => p.id === 2) || { priceUsd: 249 };
        const p3 = currentSettings.packages.find(p => p.id === 3) || { priceUsd: 599 };

        const waUrl = (msg) => `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;

        // 1. BANGLA QUERY INTENT
        if (hasBangla) {
            if (q.includes("দাম") || q.includes("টাকা") || q.includes("প্রাইজ") || q.includes("খরচ") || q.includes("প্যাকেজ") || q.includes("বাজেট")) {
                return `
                    <p class="font-bold text-white mb-2">আমাদের ৩টি স্বচ্ছ ফিক্সড প্রাইসিং প্যাকেজ রয়েছে:</p>
                    <ul class="space-y-1.5 mb-3 text-gray-300">
                        <li>🚀 <strong>Launchpad ($${p1.priceUsd}):</strong> ল্যান্ডিং পেজ ও পোর্টফোলিও ওয়েবসাইট (২৪-৪৮ ঘণ্টায় ডেলিভারি)।</li>
                        <li>💼 <strong>Business Pro ($${p2.priceUsd}):</strong> পূর্ণাঙ্গ বিজনেস ওয়েবসাইট ও UI/UX ডিজাইন (৩-৫ দিনে ডেলিভারি)।</li>
                        <li>🛍️ <strong>Full Scale ($${p3.priceUsd}):</strong> ই-কমার্স স্টোর ও কাস্টম ওয়েব সল্যুশন (৭-১৪ দিনে ডেলিভারি)।</li>
                    </ul>
                    <p class="text-emerald-400 font-semibold mb-2">সব প্যাকেজেই ১০০% মোবাইল রেসপন্সিভ ডিজাইন ও ফ্রি সাপোর্ট অন্তর্ভুক্ত!</p>
                    <a href="${waUrl('Hello Comoros Deploy! আমি একটি ওয়েবসাইট তৈরি করতে চাই এবং প্যাকেজ সম্পর্কে বিস্তারিত জানতে চাই।')}" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 transition-all">
                        <i class="fa-brands fa-whatsapp text-sm"></i> সরাসরি WhatsApp-এ কথা বলুন
                    </a>
                `;
            }
            if (q.includes("সার্ভিস") || q.includes("কাজ") || q.includes("কি কি") || q.includes("সেবা")) {
                return `
                    <p class="font-bold text-white mb-2">Comoros Deploy-এর ৬টি প্রধান ওয়েব ডেভেলপমেন্ট সেবা:</p>
                    <ol class="space-y-1 text-gray-300 mb-3 list-decimal list-inside">
                        <li><strong>Business Website Development</strong></li>
                        <li><strong>E-commerce Websites</strong> (অনলাইন শপ)</li>
                        <li><strong>Portfolio Websites</strong> (ব্যক্তিগত/এজেন্সি)</li>
                        <li><strong>Landing Page Design</strong> (হাই কনভার্টিং)</li>
                        <li><strong>UI/UX Design</strong> (মডার্ন ও ইউজার-ফ্রেন্ডলি)</li>
                        <li><strong>Custom Web Development</strong> (কাস্টম ফিচার)</li>
                    </ol>
                    <a href="#services" class="inline-flex items-center gap-1.5 text-cyan-400 font-bold hover:underline mb-1">
                        <span>সার্ভিস বিস্তারিত দেখুন</span> &rarr;
                    </a>
                `;
            }
            if (q.includes("সময়") || q.includes("দিন") || q.includes("কতদিন") || q.includes("ডেলিভারি")) {
                return `
                    <p class="font-bold text-white mb-2">⚡ আমাদের এক্সপ্রেস টার্নঅ্যারাউন্ড সময়:</p>
                    <ul class="space-y-1 text-gray-300 mb-3">
                        <li>• <strong>Landing Page & Portfolio:</strong> ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি।</li>
                        <li>• <strong>Business Website:</strong> ৩ থেকে ৫ দিনের মধ্যে ডেলিভারি।</li>
                        <li>• <strong>E-commerce / Custom Web:</strong> ৭ থেকে ১৪ দিনের মধ্যে ডেলিভারি।</li>
                    </ul>
                    <p class="text-xs text-gray-400">আমরা গুণগত মান নিশ্চিত করে দ্রুততম সময়ে ডেলিভারি দিয়ে থাকি।</p>
                `;
            }
            return `
                <p class="mb-2">ধন্যবাদ যোগাযোগের জন্য! 👋 আমরা <strong>Comoros Deploy</strong>, আপনার ডিজিটাল বিজনেসের বিশ্বস্ত টেক পার্টনার।</p>
                <p class="mb-3">আমরা আধুনিক ওয়েবসাইট ডিজাইন, ই-কমার্স ও কাস্টম ওয়েব ডেভেলপমেন্ট সেবা দিয়ে থাকি। আমাদের মূল্য শুরু মাত্র <strong>$${p1.priceUsd}</strong> থেকে।</p>
                <a href="${waUrl('Hello Comoros Deploy! আমি একটি ওয়েবসাইট প্রজেক্ট নিয়ে আলোচনা করতে চাই।')}" target="_blank" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:opacity-95 shadow-md">
                    <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp-এ আলোচনা শুরু করুন
                </a>
            `;
        }

        // 2. PRICING / PACKAGES / COST / RATES
        if (q.includes("price") || q.includes("pricing") || q.includes("cost") || q.includes("package") || q.includes("rate") || q.includes("fee") || q.includes("how much") || q.includes("budget") || q.includes("$")) {
            return `
                <p class="font-bold text-white mb-2">Here are our 3 clear, flat-rate USD pricing packages:</p>
                <div class="space-y-2 mb-3">
                    <div class="p-2.5 rounded-xl bg-white/[0.03] border border-cyan-400/30">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-cyan-400">Launchpad (Landing &amp; Portfolio)</span>
                            <span class="font-extrabold text-white">$${p1.priceUsd}</span>
                        </div>
                        <p class="text-[11px] text-gray-400 mt-0.5">High-converting landing page, 24 - 48h turnaround.</p>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white/[0.03] border border-emerald-400/30">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-emerald-400">Business Website Plan</span>
                            <span class="font-extrabold text-white">$${p2.priceUsd}</span>
                        </div>
                        <p class="text-[11px] text-gray-400 mt-0.5">Complete business authority site &amp; UI/UX, 3 - 5 days.</p>
                    </div>
                    <div class="p-2.5 rounded-xl bg-white/[0.03] border border-yellow-400/30">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-yellow-400">E-commerce &amp; Custom Web</span>
                            <span class="font-extrabold text-white">$${p3.priceUsd}</span>
                        </div>
                        <p class="text-[11px] text-gray-400 mt-0.5">Full online store &amp; custom web logic, 7 - 14 days.</p>
                    </div>
                </div>
                <p class="text-[11px] text-gray-400 mb-2.5">All plans include responsive design, source code &amp; deployment.</p>
                <a href="${waUrl('Hello Comoros Deploy! I would like to order or ask about your website packages.')}" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 transition-all">
                    <i class="fa-brands fa-whatsapp text-sm"></i> Order via WhatsApp
                </a>
            `;
        }

        // 3. SERVICES / WHAT DO YOU DO
        if (q.includes("service") || q.includes("offer") || q.includes("what do you do") || q.includes("capabilities") || q.includes("build") || q.includes("website")) {
            return `
                <p class="font-bold text-white mb-2">Comoros Deploy delivers 6 Core Web Solutions:</p>
                <div class="grid grid-cols-1 gap-1.5 mb-3 text-gray-300">
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i> <strong>Business Website Development</strong></div>
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i> <strong>E-commerce Websites</strong></div>
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-yellow-400 text-xs"></i> <strong>Portfolio Websites</strong></div>
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-cyan-400 text-xs"></i> <strong>Landing Page Design</strong></div>
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-400 text-xs"></i> <strong>UI/UX Design</strong></div>
                    <div class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-rose-400 text-xs"></i> <strong>Custom Web Development</strong></div>
                </div>
                <p class="text-[11px] text-gray-400 mb-2">Which of these best matches your project goals?</p>
                <a href="#pricing" class="inline-flex items-center gap-1.5 text-cyan-400 font-bold hover:underline">
                    <span>View Pricing Plans</span> &rarr;
                </a>
            `;
        }

        // 4. DELIVERY TIME / TURNAROUND / DURATION
        if (q.includes("delivery") || q.includes("turnaround") || q.includes("time") || q.includes("how long") || q.includes("fast") || q.includes("duration") || q.includes("days") || q.includes("hours")) {
            return `
                <p class="font-bold text-white mb-2">⚡ Express Turnaround Timeline:</p>
                <ul class="space-y-1.5 mb-3 text-gray-300">
                    <li>⏱️ <strong>Landing Pages &amp; Portfolios:</strong> Ready in <strong>24 - 48 Hours</strong>.</li>
                    <li>🏢 <strong>Full Business Websites:</strong> Delivered in <strong>3 - 5 Days</strong>.</li>
                    <li>🛒 <strong>E-commerce &amp; Custom Platforms:</strong> Delivered in <strong>7 - 14 Days</strong>.</li>
                </ul>
                <p class="text-xs text-gray-400">Need an urgent launch? We offer prioritized express sprint options.</p>
            `;
        }

        // 5. WHY CHOOSE COMOROS DEPLOY
        if (q.includes("why") || q.includes("choose") || q.includes("trust") || q.includes("advantage") || q.includes("benefit") || q.includes("experience")) {
            return `
                <p class="font-bold text-white mb-2">🌟 Why Choose COMOROS DEPLOY?</p>
                <ul class="space-y-1.5 mb-3 text-gray-300">
                    <li>✨ <strong>Modern &amp; Professional Design:</strong> Cutting-edge layouts that convert visitors into paying clients.</li>
                    <li>📱 <strong>Mobile Responsive Websites:</strong> 100% fluid on smartphones, tablets, and 4K displays.</li>
                    <li>⚡ <strong>Fast &amp; User-Friendly Experience:</strong> Sub-second loading and seamless UX.</li>
                    <li>🛡️ <strong>Professional Development Support:</strong> Direct, dedicated post-launch maintenance.</li>
                </ul>
                <a href="#portfolio" class="text-cyan-400 font-bold hover:underline">See Our Completed Work &rarr;</a>
            `;
        }

        // 6. WHATSAPP / CONTACT / TALK / CALL
        if (q.includes("whatsapp") || q.includes("contact") || q.includes("talk") || q.includes("call") || q.includes("phone") || q.includes("human") || q.includes("reach") || q.includes("support")) {
            return `
                <p class="font-bold text-white mb-2">Let's connect directly on WhatsApp!</p>
                <p class="text-gray-300 mb-3">Our team is available 24/7 for instant consultations, live quotes, and project kickoffs.</p>
                <a href="${waUrl('Hello Comoros Deploy! I would like to speak with a representative about building my website.')}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:scale-105 transition-all shadow-lg">
                    <i class="fa-brands fa-whatsapp text-base"></i> Open Instant WhatsApp Chat
                </a>
            `;
        }

        // 7. FACEBOOK / VIDEO / SOCIAL
        if (q.includes("facebook") || q.includes("video") || q.includes("social") || q.includes("reel")) {
            return `
                <p class="font-bold text-white mb-2">Connect with Comoros Deploy on Social Media:</p>
                <div class="flex flex-col gap-2 mb-3">
                    <a href="https://www.facebook.com/profile.php?id=61596294121111" target="_blank" class="inline-flex items-center gap-2 text-blue-400 hover:underline">
                        <i class="fa-brands fa-facebook"></i> Official Facebook Page
                    </a>
                    <a href="https://www.facebook.com/share/v/1dzhr3Ap1P/" target="_blank" class="inline-flex items-center gap-2 text-cyan-400 hover:underline">
                        <i class="fa-solid fa-play"></i> Watch Featured Video on Facebook
                    </a>
                </div>
            `;
        }

        // 8. GREETINGS
        if (q === "hi" || q === "hello" || q === "hey" || q.includes("good morning") || q.includes("good evening") || q.includes("greetings")) {
            return `
                <p class="mb-2">Hello there! 👋</p>
                <p class="mb-3">Welcome to <strong>COMOROS DEPLOY</strong> — your trusted tech partner for modern, high-converting websites. How can I help you today?</p>
                <div class="flex flex-wrap gap-2">
                    <button class="ai-inline-prompt px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400 text-xs" data-q="What website packages and pricing do you offer?">💰 View Pricing</button>
                    <button class="ai-inline-prompt px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-400 text-xs" data-q="What services does Comoros Deploy offer?">🚀 Core Services</button>
                    <button class="ai-inline-prompt px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-yellow-400 text-xs" data-q="How do I contact you or start on WhatsApp?">💬 WhatsApp Us</button>
                </div>
            `;
        }

        // 9. DEFAULT / FALLBACK INTELLIGENT MATCH
        return `
            <p class="mb-2">Thank you for your question! 😊</p>
            <p class="mb-2">At <strong>Comoros Deploy</strong>, we build modern, fast, and mobile-responsive websites tailored exactly to your business goals — starting at just <strong>$${p1.priceUsd}</strong>.</p>
            <p class="text-xs text-gray-300 mb-3">Would you like to review our packages, or chat directly with our development lead on WhatsApp?</p>
            <div class="flex flex-wrap gap-2">
                <a href="#pricing" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs">View Packages</a>
                <a href="${waUrl(`Hello Comoros Deploy! Regarding: "${userText.slice(0, 50)}...", I would like to discuss this project.`)}" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold hover:bg-emerald-500/30 text-xs flex items-center gap-1.5">
                    <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        `;
    }

    // Handle Form Submit
    function handleUserSubmission(queryText) {
        const text = (queryText || input.value).trim();
        if (!text) return;

        appendUserMessage(text);
        input.value = "";

        // Show typing indicator
        if (typingIndicator) {
            typingIndicator.classList.remove("hidden");
            scrollToBottom();
        }

        // Simulate natural AI thinking delay (450ms - 750ms)
        const delay = Math.floor(Math.random() * 300) + 450;
        setTimeout(() => {
            if (typingIndicator) typingIndicator.classList.add("hidden");
            const botAnswer = generateAiAnswer(text);
            appendBotMessage(botAnswer);
        }, delay);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleUserSubmission();
    });

    // Quick carousel buttons
    quickButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const query = btn.getAttribute("data-query");
            if (query) handleUserSubmission(query);
        });
    });

    // Inline prompt buttons created inside bot responses
    messagesContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".ai-inline-prompt");
        if (btn) {
            const q = btn.getAttribute("data-q");
            if (q) handleUserSubmission(q);
        }
    });
}
