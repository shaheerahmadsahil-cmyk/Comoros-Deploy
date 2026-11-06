/**
 * Comoros Deploy - Main JavaScript Application
 * High-Performance Single Page Experience with Live Admin Pricing & WhatsApp Integration
 */

// Default Configurations
const DEFAULT_CONFIG = {
    whatsappNumber: "8801725130826",
    adminPin: "admin123",
    currency: "USD", // "USD" or "BDT"
    packages: [
        {
            id: 1,
            name: "Starter Launchpad",
            tag: "Personal & Launch",
            priceUsd: 99,
            priceBdt: 11500,
            desc: "Ideal for high-converting single landing pages, personal portfolios, and startup teasers.",
            delivery: "24 - 48 Hours",
            features: [
                "Single Page High-Converting Design",
                "100% Mobile & Tablet Responsive",
                "Direct WhatsApp Integration (01725130826)",
                "Fast Loading Speed (< 1s)",
                "Contact Form & Social Links",
                "Free Cloud Hosting Deployment"
            ],
            popular: false,
            badgeColor: "cyan"
        },
        {
            id: 2,
            name: "Business Pro",
            tag: "Most Popular Choice",
            priceUsd: 249,
            priceBdt: 28500,
            desc: "Designed for ambitious companies, agencies, and brands ready to dominate online.",
            delivery: "3 - 5 Days",
            features: [
                "Up to 5 Custom Designed Pages",
                "Sleek Modern UI/UX & Animations",
                "Interactive Contact Forms & WhatsApp Leads",
                "Lightweight CMS / Admin Price Editor",
                "Search Engine Optimization (SEO Ready)",
                "Free Domain & SSL Configuration",
                "30 Days Free Technical Support"
            ],
            popular: true,
            badgeColor: "emerald"
        },
        {
            id: 3,
            name: "Enterprise Galaxy",
            tag: "Full Scale Web App",
            priceUsd: 599,
            priceBdt: 69000,
            desc: "Complete custom web applications, e-commerce stores, or SaaS with advanced functionality.",
            delivery: "7 - 14 Days",
            features: [
                "Custom Full-Stack Web Application",
                "E-Commerce Store & Payment Gateway",
                "Custom Client & Admin Dashboards",
                "Database & API Integration",
                "Top-Tier Cloud Security & Backups",
                "Full Source Code & Lifetime License",
                "60 Days VIP Priority Maintenance"
            ],
            popular: false,
            badgeColor: "yellow"
        }
    ]
};

// Storage key
const STORAGE_KEY = 'comoros_deploy_store_v1';

// Load stored settings or default
function getAppSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
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
    renderPricing();
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

// 2. RENDER PRICING CARDS
function renderPricing() {
    const container = document.getElementById("pricingContainer");
    if (!container) return;

    container.innerHTML = "";

    const whatsappNum = currentSettings.whatsappNumber || "8801725130826";

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
    }

    function closeModal() {
        modal.classList.add("hidden");
    }

    if (adminBtnHeader) adminBtnHeader.addEventListener("click", openModal);
    if (adminBtnMobile) adminBtnMobile.addEventListener("click", openModal);
    if (adminBtnFooter) adminBtnFooter.addEventListener("click", openModal);
    if (quickEditPricingBtn) quickEditPricingBtn.addEventListener("click", openModal);

    closeButtons.forEach(btn => btn.addEventListener("click", closeModal));

    // Handle Auth
    let isAuthenticated = false;

    loginBtn.addEventListener("click", () => {
        const enteredPin = pinInput.value.trim();
        const correctPin = currentSettings.adminPin || "admin123";

        if (enteredPin === correctPin) {
            isAuthenticated = true;
            authStage.classList.add("hidden");
            dashboardStage.classList.remove("hidden");
            populateAdminInputs();
        } else {
            authError.classList.remove("hidden");
        }
    });

    // Populate inputs
    function populateAdminInputs() {
        const p1 = currentSettings.packages.find(p => p.id === 1) || {};
        const p2 = currentSettings.packages.find(p => p.id === 2) || {};
        const p3 = currentSettings.packages.find(p => p.id === 3) || {};

        document.getElementById("editPkg1Usd").value = p1.priceUsd || 99;
        document.getElementById("editPkg1Bdt").value = p1.priceBdt || 11500;

        document.getElementById("editPkg2Usd").value = p2.priceUsd || 249;
        document.getElementById("editPkg2Bdt").value = p2.priceBdt || 28500;

        document.getElementById("editPkg3Usd").value = p3.priceUsd || 599;
        document.getElementById("editPkg3Bdt").value = p3.priceBdt || 69000;

        document.getElementById("editWhatsappNumber").value = currentSettings.whatsappNumber || "8801725130826";
    }

    // Save changes
    saveBtn.addEventListener("click", () => {
        const p1Usd = parseInt(document.getElementById("editPkg1Usd").value) || 99;
        const p1Bdt = parseInt(document.getElementById("editPkg1Bdt").value) || 11500;

        const p2Usd = parseInt(document.getElementById("editPkg2Usd").value) || 249;
        const p2Bdt = parseInt(document.getElementById("editPkg2Bdt").value) || 28500;

        const p3Usd = parseInt(document.getElementById("editPkg3Usd").value) || 599;
        const p3Bdt = parseInt(document.getElementById("editPkg3Bdt").value) || 69000;

        const waNum = document.getElementById("editWhatsappNumber").value.trim() || "8801725130826";

        currentSettings.packages[0].priceUsd = p1Usd;
        currentSettings.packages[0].priceBdt = p1Bdt;

        currentSettings.packages[1].priceUsd = p2Usd;
        currentSettings.packages[1].priceBdt = p2Bdt;

        currentSettings.packages[2].priceUsd = p3Usd;
        currentSettings.packages[2].priceBdt = p3Bdt;

        currentSettings.whatsappNumber = waNum;

        saveAppSettings(currentSettings);
        renderPricing();

        successMsg.classList.remove("hidden");
        setTimeout(() => {
            successMsg.classList.add("hidden");
            closeModal();
        }, 1200);
    });

    // Reset defaults
    resetBtn.addEventListener("click", () => {
        if (confirm("Reset pricing back to default settings?")) {
            currentSettings = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
            saveAppSettings(currentSettings);
            populateAdminInputs();
            renderPricing();
            alert("Pricing has been reset to default values.");
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

        const destNumber = currentSettings.whatsappNumber || "8801725130826";

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
