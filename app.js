// Lucent Carat Lab - Etsy Listing Generator Core Logic

// Presets Data
const presets = {
    ovalHalo: {
        diamondShape: 'Oval',
        caratWeight: '2.00',
        diamondColor: 'E',
        diamondClarity: 'VVS1',
        diamondCut: 'Excellent',
        certification: 'IGI Certified',
        ringStyle: 'Halo',
        metalType: '14K Solid Yellow Gold',
        bandWidth: '1.8',
        accentStones: '0.45 CT Round Brilliant Diamonds (VVS/E-F)',
        materialsCost: 450,
        laborCost: 200,
        overheadRate: 20,
        luxuryMarkup: 120,
        shippingTime: 'Free Express Worldwide Shipping (3-5 business days)',
        warranty: 'Lifetime Manufacturing Warranty & Certificate of Authenticity'
    },
    classicSolitaire: {
        diamondShape: 'Round',
        caratWeight: '1.50',
        diamondColor: 'D',
        diamondClarity: 'IF',
        diamondCut: 'Ideal',
        certification: 'IGI Certified',
        ringStyle: 'Solitaire',
        metalType: 'Platinum',
        bandWidth: '1.6',
        accentStones: 'None',
        materialsCost: 380,
        laborCost: 180,
        overheadRate: 20,
        luxuryMarkup: 150,
        shippingTime: 'Free Express Worldwide Shipping (3-5 business days)',
        warranty: 'Lifetime Manufacturing Warranty & Certificate of Authenticity'
    },
    emeraldEternity: {
        diamondShape: 'Emerald',
        caratWeight: '5.50',
        diamondColor: 'F',
        diamondClarity: 'VVS2',
        diamondCut: 'Excellent',
        certification: 'IGI Certified',
        ringStyle: 'Eternity',
        metalType: '18K Solid White Gold',
        bandWidth: '3.5',
        accentStones: 'Full Eternity Set Emerald Cut Diamonds (Total 5.50 CT)',
        materialsCost: 1200,
        laborCost: 300,
        overheadRate: 20,
        luxuryMarkup: 100,
        shippingTime: 'Free Express Worldwide Shipping (3-5 business days)',
        warranty: 'Lifetime Manufacturing Warranty & Certificate of Authenticity'
    }
};

// DOM elements mapping
const elements = {
    diamondShape: () => document.getElementById('diamond-shape'),
    caratWeight: () => document.getElementById('carat-weight'),
    diamondColor: () => document.getElementById('diamond-color'),
    diamondClarity: () => document.getElementById('diamond-clarity'),
    diamondCut: () => document.getElementById('diamond-cut'),
    certification: () => document.getElementById('certification'),
    ringStyle: () => document.getElementById('ring-style'),
    customRingStyle: () => document.getElementById('custom-ring-style'),
    metalType: () => document.getElementById('metal-type'),
    bandWidth: () => document.getElementById('band-width'),
    accentStones: () => document.getElementById('accent-stones'),
    materialsCost: () => document.getElementById('materials-cost'),
    laborCost: () => document.getElementById('labor-cost'),
    overheadRate: () => document.getElementById('overhead-rate'),
    luxuryMarkup: () => document.getElementById('luxury-markup'),
    shippingTime: () => document.getElementById('shipping-time'),
    warranty: () => document.getElementById('warranty'),
    
    // Outputs
    titleOutput: () => document.getElementById('title-output'),
    titleCharCount: () => document.getElementById('title-char-count'),
    tagsVisual: () => document.getElementById('tags-output-visual'),
    tagsPlain: () => document.getElementById('tags-output-plain'),
    tagCount: () => document.getElementById('tag-count'),
    
    priceOutput: () => document.getElementById('price-output'),
    priceOutputVal: () => document.getElementById('price-output-val'),
    breakMaterials: () => document.getElementById('break-materials'),
    breakLabor: () => document.getElementById('break-labor'),
    breakOverhead: () => document.getElementById('break-overhead'),
    breakSubtotal: () => document.getElementById('break-subtotal'),
    breakMarkup: () => document.getElementById('break-markup'),
    
    descriptionOutput: () => document.getElementById('description-output'),
    descWordCount: () => document.getElementById('desc-word-count'),
    
    captionOutput: () => document.getElementById('caption-output'),
    jsonOutput: () => document.getElementById('json-output')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Generate initially with default form values
    generateListing();
});

// Load Preset
function loadPreset(key) {
    const data = presets[key];
    if (!data) return;
    
    // Set Active Preset Visual Class
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Fill form
    elements.diamondShape().value = data.diamondShape;
    elements.caratWeight().value = data.caratWeight;
    elements.diamondColor().value = data.diamondColor;
    elements.diamondClarity().value = data.diamondClarity;
    elements.diamondCut().value = data.diamondCut;
    elements.certification().value = data.certification;
    elements.ringStyle().value = data.ringStyle;
    
    toggleCustomStyle(data.ringStyle);
    if (data.ringStyle === 'Custom') {
        elements.customRingStyle().value = data.customRingStyle || '';
    }
    
    elements.metalType().value = data.metalType;
    elements.bandWidth().value = data.bandWidth;
    elements.accentStones().value = data.accentStones;
    
    elements.materialsCost().value = data.materialsCost;
    elements.laborCost().value = data.laborCost;
    elements.overheadRate().value = data.overheadRate;
    elements.luxuryMarkup().value = data.luxuryMarkup;
    
    elements.shippingTime().value = data.shippingTime;
    elements.warranty().value = data.warranty;
    
    generateListing();
}

// Reset Form
function resetForm() {
    document.getElementById('listing-form').reset();
    document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
    toggleCustomStyle('Halo');
    generateListing();
}

// Show/Hide Custom Ring Style Input
function toggleCustomStyle(styleValue) {
    const customGroup = document.getElementById('custom-style-group');
    if (styleValue === 'Custom') {
        customGroup.style.display = 'block';
    } else {
        customGroup.style.display = 'none';
    }
}

// Get Style Name
function getStyleName() {
    const styleSelect = elements.ringStyle().value;
    if (styleSelect === 'Custom') {
        return elements.customRingStyle().value || 'Engagement Ring';
    }
    
    // Return friendly name
    const names = {
        'Solitaire': 'Solitaire Ring',
        'Halo': 'Halo Engagement Ring',
        'Three-Stone': 'Three-Stone Ring',
        'Eternity': 'Eternity Band',
        'Vintage': 'Vintage Inspired Ring',
        'Toi et Moi': 'Toi et Moi Ring',
        'Pavé': 'Classic Pavé Ring'
    };
    return names[styleSelect] || styleSelect;
}

// Generate Listing
function generateListing() {
    // Gather Inputs
    const shape = elements.diamondShape().value;
    const carat = parseFloat(elements.caratWeight().value).toFixed(2);
    const color = elements.diamondColor().value;
    const clarity = elements.diamondClarity().value;
    const cut = elements.diamondCut().value;
    const cert = elements.certification().value;
    const style = getStyleName();
    const metal = elements.metalType().value;
    const width = parseFloat(elements.bandWidth().value).toFixed(1);
    const accents = elements.accentStones().value || 'None';
    
    const matCost = parseFloat(elements.materialsCost().value) || 0;
    const labCost = parseFloat(elements.laborCost().value) || 0;
    const overheadPct = parseFloat(elements.overheadRate().value) || 0;
    const markupPct = parseFloat(elements.luxuryMarkup().value) || 0;
    
    const shipping = elements.shippingTime().value;
    const warranty = elements.warranty().value;

    // 1. SEO Title (60-80 chars target)
    // Format: [Diamond Shape] [Carat Weight] [Lab-Grown Diamond] [Ring Style] [Metal] | Engagement Ring
    let title = `${shape} Cut ${carat}CT Lab-Grown Diamond ${style} ${metal} | Engagement Ring`;
    
    // If it's too long, let's optimize it
    if (title.length > 80) {
        // Option A: Remove "Cut"
        title = `${shape} ${carat}CT Lab-Grown Diamond ${style} ${metal} | Engagement Ring`;
    }
    if (title.length > 80) {
        // Option B: Simplify metal name (e.g. White Gold instead of Solid White Gold)
        const simplifiedMetal = metal.replace('Solid ', '');
        title = `${shape} ${carat}CT Lab-Grown Diamond ${style} ${simplifiedMetal} | Engagement Ring`;
    }
    if (title.length > 80) {
        // Option C: Shorten Carat phrasing
        const simplifiedMetal = metal.replace('Solid ', '');
        title = `${shape} ${carat}ct Lab Grown Diamond ${style} ${simplifiedMetal} | Engagement Ring`;
    }
    if (title.length > 80) {
        // Option D: Shorten "Engagement Ring" at the end if the style already has "Ring"
        const simplifiedMetal = metal.replace('Solid ', '');
        title = `${shape} ${carat}ct Lab Diamond ${style} ${simplifiedMetal} | Engagement Ring`;
    }
    // Hard limit character enforcement
    if (title.length > 80) {
        title = title.substring(0, 80);
    }
    
    elements.titleOutput().innerText = title;
    updateCharCount();

    // 2. Pricing Calculations
    // Formula: (Materials Cost * 3) + Labor + Overhead (20%) + Luxury Markup (100-150%)
    const matKeystone = matCost * 3;
    const baseSubtotal = matKeystone + labCost;
    const overheadVal = baseSubtotal * (overheadPct / 100);
    const subtotalWithOverhead = baseSubtotal + overheadVal;
    const markupVal = subtotalWithOverhead * (markupPct / 100);
    const finalPrice = subtotalWithOverhead + markupVal;
    
    // Set pricing displays
    elements.priceOutput().innerText = `$${finalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    elements.priceOutputVal().innerText = finalPrice.toFixed(2);
    elements.breakMaterials().innerText = `$${matKeystone.toFixed(2)}`;
    elements.breakLabor().innerText = `$${labCost.toFixed(2)}`;
    elements.breakOverhead().innerText = `$${overheadVal.toFixed(2)} (${overheadPct}%)`;
    elements.breakSubtotal().innerText = `$${subtotalWithOverhead.toFixed(2)}`;
    elements.breakMarkup().innerText = `$${markupVal.toFixed(2)} (${markupPct}%)`;

    // 3. Etsy Tags Generation (Exactly 13 Tags, max 20 chars per tag)
    const tags = generateEtsyTags(shape, carat, style, metal, color, clarity);
    displayTags(tags);

    // 4. Luxury Description Generation
    const description = generateDescription(shape, carat, color, clarity, cut, cert, style, metal, width, accents, shipping, warranty);
    elements.descriptionOutput().innerText = description;
    updateWordCount();

    // 5. Pinterest Caption
    const caption = generatePinterestCaption(shape, carat, style, metal);
    elements.captionOutput().innerText = caption;

    // 6. JSON Export Generation
    const jsonListing = {
        shopName: "Lucent Carat Lab",
        listingTitle: title,
        suggestedPrice: finalPrice.toFixed(2),
        tags: tags,
        pricingBreakdown: {
            materialsKeystone: matKeystone.toFixed(2),
            labor: labCost.toFixed(2),
            overhead: overheadVal.toFixed(2),
            luxuryMarkup: markupVal.toFixed(2),
            finalCalculatedPrice: finalPrice.toFixed(2)
        },
        specifications: {
            shape: shape,
            carat: carat,
            color: color,
            clarity: clarity,
            cut: cut,
            certification: cert,
            style: style,
            metal: metal,
            bandWidthWidthMm: width,
            accents: accents
        },
        pinterestCaption: caption,
        listingDescription: description
    };
    
    elements.jsonOutput().innerText = JSON.stringify(jsonListing, null, 4);
}

// Custom Tag Generator Logic
function generateEtsyTags(shape, carat, style, metal, color, clarity) {
    const rawTags = [];
    
    // Clean inputs for tag creation
    const metalShort = metal.replace('Solid ', ''); // e.g. "14K White Gold"
    const shapeWord = shape; // e.g. "Oval"
    const styleWord = style.replace(' Ring', '').replace(' Engagement', ''); // e.g. "Halo"
    
    // Tag 1: Main Keyword (High Search Volume)
    rawTags.push(`${shapeWord} Diamond Ring`);
    
    // Tag 2: Long-tail Keyword
    rawTags.push(`${carat}ct ${shapeWord} Ring`);
    
    // Tag 3: Trend Keyword
    rawTags.push(`Lab Grown Diamond`);
    
    // Tag 4: Buyer Intent Keyword
    rawTags.push(`Engagement Ring`);
    
    // Tag 5: Material Keyword
    rawTags.push(metalShort);
    
    // Tag 6: Occasion Keyword
    rawTags.push(`Proposal Ring`);
    
    // Tag 7: Synonyms - Lab Created
    rawTags.push(`Lab Created Diamond`);
    
    // Tag 8: Synonyms - Style specific
    rawTags.push(`${shapeWord} ${styleWord} Ring`);
    
    // Tag 9: Brand and luxury marker
    rawTags.push(`Lucent Carat Lab`);
    
    // Tag 10: Occasion variations
    rawTags.push(`Anniversary Gift`);
    
    // Tag 11: Style variations
    rawTags.push(`Gold Bridal Ring`);
    
    // Tag 12: Buyer Intent variations
    rawTags.push(`Unique Promise Ring`);
    
    // Tag 13: Technical / value proposition
    rawTags.push(`Conflict Free Ring`);

    // Clean and validate tags (Max 13, strictly max 20 characters per tag, lowercase, trim)
    const cleanedTags = rawTags.map(tag => {
        let clean = tag.toLowerCase().trim();
        // Remove special characters that Etsy does not support in tags
        clean = clean.replace(/[^a-zA-Z0-9\s]/g, '');
        // Limit to 20 characters
        if (clean.length > 20) {
            clean = clean.substring(0, 20).trim();
        }
        return clean;
    });

    // Deduplicate and pad if we have less than 13
    let uniqueTags = [...new Set(cleanedTags)];
    
    const fallbackTags = [
        "luxury jewelry", "gold wedding band", "diamond jewelry", "ethical jewelry", 
        "gift for her", "forever diamond", "solitaire ring", "gold bridal ring"
    ];

    let i = 0;
    while (uniqueTags.length < 13 && i < fallbackTags.length) {
        const fallback = fallbackTags[i].toLowerCase();
        if (!uniqueTags.includes(fallback) && fallback.length <= 20) {
            uniqueTags.push(fallback);
        }
        i++;
    }

    // Return exactly 13
    return uniqueTags.slice(0, 13);
}

// Render Tags to UI
function displayTags(tags) {
    const visualContainer = elements.tagsVisual();
    const plainInput = elements.tagsPlain();
    const counter = elements.tagCount();
    
    visualContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.className = 'tag-badge';
        badge.innerHTML = `${tag} <i class="fa-solid fa-copy"></i>`;
        badge.onclick = () => copyText(tag, `Tag "${tag}"`);
        visualContainer.appendChild(badge);
    });
    
    plainInput.value = tags.join(', ');
    counter.innerText = `${tags.length} / 13 Tags`;
}

// Custom Luxury Description Generator Template
function generateDescription(shape, carat, color, clarity, cut, cert, style, metal, width, accents, shipping, warranty) {
    const paragraphs = [
        // Hook
        `Indulge in the unmatched brilliance of Lucent Carat Lab. This breathtaking ${carat} carat ${shape} cut lab-grown diamond ${style} is meticulously handcrafted in ${metal} to capture the very essence of high-end luxury. Designed for the modern bride who values both spectacular beauty and ethical transparency, this ring stands as a testament to conscious elegance and timeless craftsmanship.`,
        
        // Spec Lists
        `✦ CENTER STONE SPECIFICATIONS ✦
• Shape: ${shape} Cut
• Carat Weight: ${carat} CT
• Color Grade: ${color}
• Clarity Grade: ${clarity}
• Cut Grade: ${cut}
• Certification: ${cert}
• Quality Grade: Type IIa (Purest carbon structure)

✦ SETTING DETAILS ✦
• Metal Base: ${metal} (Nickel-free, hypoallergenic)
• Style: ${style}
• Band Width: ${width} mm
• Accent Side Stones: ${accents}
• Fit: Standard comfort-fit interior`,
        
        // Lab Grown Benefits
        `✦ THE LAB-GROWN BENEFIT ✦
Our lab-grown diamonds are cultivated using advanced technology, offering identical physical, chemical, and optical properties to mined diamonds. Sustainably created and conflict-free, they bypass traditional mining markups, allowing us to offer exceptional purity and brilliance at a fraction of the cost.`,
        
        // Customization
        `✦ BESPOKE CUSTOMIZATION ✦
Every Lucent Carat piece is handcrafted to order. Contact our bespoke concierge studio to request custom ring sizes, alternative carat weights (1.0ct to 5.0ct+), custom band configurations, laser engravings, or custom side stones.`,
        
        // Shipping & Care
        `✦ SHIPPING & PRESENTATION ✦
• Packaging: Elegant velvet presentation ring box.
• Shipping: ${shipping}.
• Guarantee: ${warranty}.
• Care: Clean with warm water and mild soap; polish with the included cloth.`,
        
        // CTA
        `Select your ring size and click 'Add to Cart' to begin crafting your dream ring with Lucent Carat Lab.`
    ];

    return paragraphs.join('\n\n');
}

// Pinterest Caption
function generatePinterestCaption(shape, carat, style, metal) {
    const shapeTag = shape.toLowerCase();
    const styleTag = style.toLowerCase().replace(/\s+/g, '');
    const metalTag = metal.toLowerCase().includes('gold') ? 'goldring' : 'platinumring';
    
    return `A breathtaking ${carat} CT ${shape} lab-grown diamond ${style} set in polished ${metal}. The ultimate symbol of modern luxury, sustainably crafted for your forever love by Lucent Carat Lab. ✨💍 Visit our Etsy shop to customize your dream ring today.

#${shapeTag}diamond #${shapeTag}engagementring #${styleTag} #labgrowndiamonds #ethicaljewelry #goldengagementring #luxurybride #${metalTag} #lucentcaratlab`;
}

// Copy single field utility
function copyField(elementId, btnElement) {
    const text = document.getElementById(elementId).innerText || document.getElementById(elementId).value;
    
    navigator.clipboard.writeText(text).then(() => {
        // Change button state
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        btnElement.classList.add('copied');
        
        showToast("Copied to clipboard!");
        
        setTimeout(() => {
            btnElement.innerHTML = originalHTML;
            btnElement.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showToast("Copy failed. Please copy manually.");
    });
}

// Copy arbitrary text helper
function copyText(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied!`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Copy all fields as a unified JSON
function copyAllJSON() {
    const jsonText = elements.jsonOutput().innerText;
    navigator.clipboard.writeText(jsonText).then(() => {
        showToast("Full Listing JSON copied to clipboard!");
    }).catch(() => {
        showToast("Copy failed.");
    });
}

// Toast notification helper
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.innerText = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Character counter styling helper
function updateCharCount() {
    const titleText = elements.titleOutput().innerText;
    const countEl = elements.titleCharCount();
    const len = titleText.length;
    
    countEl.innerText = `${len} / 80`;
    
    if (len >= 60 && len <= 80) {
        countEl.className = 'char-count good';
    } else {
        countEl.className = 'char-count bad';
    }
}

// Word counter helper
function updateWordCount() {
    const text = elements.descriptionOutput().innerText;
    const countEl = elements.descWordCount();
    
    if (!text.trim()) {
        countEl.innerText = '0 words';
        return;
    }
    
    const wordCount = text.trim().split(/\s+/).length;
    countEl.innerText = `${wordCount} words`;
}

// Publish Code directly to GitHub Repository using REST API
async function publishToGitHub() {
    const pat = document.getElementById('gh-pat').value.trim();
    const repo = document.getElementById('gh-repo').value.trim();
    const branch = document.getElementById('gh-branch').value.trim();
    const statusEl = document.getElementById('gh-status');
    
    if (!pat) {
        showStatus('Please enter your GitHub Personal Access Token (PAT).', 'error');
        return;
    }
    if (!repo || !repo.includes('/')) {
        showStatus('Please enter a valid Repository Path (e.g. username/repo).', 'error');
        return;
    }
    
    showStatus('Reading project files...', 'info');
    
    try {
        // Fetch files from our local server
        const filesToUpload = [
            { path: 'index.html' },
            { path: 'style.css' },
            { path: 'app.js' },
            { path: 'server.js' }
        ];
        
        for (let file of filesToUpload) {
            showStatus(`Fetching local ${file.path}...`, 'info');
            const res = await fetch('/' + file.path);
            if (!res.ok) throw new Error(`Could not load local file ${file.path}`);
            file.content = await res.text();
        }
        
        showStatus('Connecting to GitHub API...', 'info');
        
        // Loop through each file and upload
        for (let i = 0; i < filesToUpload.length; i++) {
            const file = filesToUpload[i];
            showStatus(`Uploading ${file.path} (${i+1}/${filesToUpload.length})...`, 'info');
            
            // Check if file already exists on GitHub to get its SHA hash
            let sha = null;
            const checkUrl = `https://api.github.com/repos/${repo}/contents/${file.path}?ref=${branch}`;
            const checkRes = await fetch(checkUrl, {
                headers: {
                    'Authorization': `token ${pat}`,
                    'Accept': 'application/vnd.github+json'
                }
            });
            
            if (checkRes.ok) {
                const data = await checkRes.json();
                sha = data.sha;
            }
            
            // Upload / Update file
            const uploadUrl = `https://api.github.com/repos/${repo}/contents/${file.path}`;
            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${pat}`,
                    'Accept': 'application/vnd.github+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Upload ${file.path} via Lucent Carat Lab Etsy Generator`,
                    content: btoa(unescape(encodeURIComponent(file.content))), // Safe UTF-8 Base64 encoding
                    branch: branch,
                    sha: sha
                })
            });
            
            if (!uploadRes.ok) {
                const errorData = await uploadRes.json();
                throw new Error(`Failed to upload ${file.path}: ${errorData.message || uploadRes.statusText}`);
            }
        }
        
        showStatus('🎉 All files successfully published to your GitHub repository!', 'success');
        showToast("Successfully published to GitHub!");
        
    } catch (err) {
        console.error(err);
        showStatus(`Error: ${err.message}`, 'error');
    }
    
    function showStatus(msg, type) {
        statusEl.innerText = msg;
        statusEl.className = `gh-status-text ${type}`;
        statusEl.style.display = 'block';
    }
}
