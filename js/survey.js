/**
 * OpenTelemetry MTTD/MTTR Survey
 * With full bilingual support (PL/EN)
 */

// Configuration
const API_URL = 'https://wild-block-e91fsurvey-api.michal-bojko-gdansk.workers.dev';
let currentLang = 'pl';
let currentSection = 0;
let isOtelUser = false;
let isAmateur = false;
let validatedToken = null;

// ========== TRANSLATION HELPERS ==========
function getText(key) {
    if (t[key] && t[key][currentLang]) {
        return t[key][currentLang];
    }
    console.warn('Missing translation:', key);
    return t[key] ? (t[key]['pl'] || key) : key;
}

function translatePage() {
    // Translate all elements with data-t attribute
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        const text = getText(key);
        if (el.tagName === 'INPUT' && el.type === 'submit') {
            el.value = text;
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
    
    // Update progress text if visible
    const progressText = document.getElementById('progressText');
    if (progressText && currentSection > 0) {
        progressText.textContent = `${getText('sectionOf')} ${currentSection} ${getText('of')} 7`;
    }
    
    // Re-render current section if survey started
    if (currentSection > 0) {
        renderSection(currentSection);
    }
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('surveyLang', lang);
    translatePage();
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Survey loaded');
    
    // Check for saved language
    const savedLang = localStorage.getItem('surveyLang');
    if (savedLang) currentLang = savedLang;
    
    // Language selection buttons
    const langPLBtn = document.getElementById('langPL');
    const langENBtn = document.getElementById('langEN');
    const langScreen = document.getElementById('langScreen');
    const tokenScreen = document.getElementById('tokenScreen');
    
    if (langPLBtn) {
        langPLBtn.addEventListener('click', () => {
            console.log('🇵🇱 Polski selected');
            setLanguage('pl');
            langScreen.style.display = 'none';
            tokenScreen.style.display = 'block';
        });
    }
    
    if (langENBtn) {
        langENBtn.addEventListener('click', () => {
            console.log('🇬🇧 English selected');
            setLanguage('en');
            langScreen.style.display = 'none';
            tokenScreen.style.display = 'block';
        });
    }
    
    // Language switcher in header
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            setLanguage(currentLang === 'pl' ? 'en' : 'pl');
        });
    }
    
    // Token form
    const tokenForm = document.getElementById('tokenForm');
    if (tokenForm) {
        tokenForm.addEventListener('submit', handleTokenSubmit);
    }
    
    // Check URL for token
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
        document.getElementById('tokenInput').value = urlToken;
    }
    
    // Initial translation
    translatePage();
});

// ========== TOKEN VALIDATION ==========
async function handleTokenSubmit(e) {
    e.preventDefault();
    const token = document.getElementById('tokenInput').value.trim().toUpperCase();
    const errorEl = document.getElementById('tokenError');
    const btn = e.target.querySelector('button');
    
    if (!token) {
        errorEl.textContent = getText('errRequired');
        errorEl.style.display = 'block';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = '...';
    errorEl.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}/validate?token=${encodeURIComponent(token)}`);
        const data = await response.json();
        
        if (data.valid) {
            validatedToken = token;
            isAmateur = data.group === 'amateur';
            startSurvey();
        } else {
            errorEl.textContent = getText('errInvalidToken');
            errorEl.style.display = 'block';
        }
    } catch (err) {
        console.error('Validation error:', err);
        errorEl.textContent = getText('errSubmit');
        errorEl.style.display = 'block';
    }
    
    btn.disabled = false;
    btn.textContent = getText('verifyBtn');
}

// ========== SURVEY RENDERING ==========
function startSurvey() {
    document.getElementById('tokenScreen').style.display = 'none';
    document.getElementById('surveyContainer').style.display = 'block';
    document.getElementById('progressBar').style.display = 'block';
    
    currentSection = 1;
    renderSection(1);
    updateProgress();
}

function updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = `${(currentSection / 7) * 100}%`;
    if (text) text.textContent = `${getText('sectionOf')} ${currentSection} ${getText('of')} 7`;
}

function renderSection(sectionNum) {
    const container = document.getElementById('surveyContainer');
    let html = '';
    
    switch(sectionNum) {
        case 1: html = renderSection1(); break;
        case 2: html = renderSection2(); break;
        case 3: html = renderSection3(); break;
        case 4: html = renderSection4(); break;
        case 5: html = renderSection5(); break;
        case 6: html = renderSection6(); break;
        case 7: html = renderSection7(); break;
    }
    
    container.innerHTML = html;
    attachEventListeners();
    restoreAnswers();
    window.scrollTo(0, 0);
}

// ========== SECTION RENDERERS ==========
function sectionHeader(num, key) {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
    return `<div class="section-header">
        <span class="section-number">${romans[num-1]}</span>
        <h2>${getText(key)}</h2>
    </div>`;
}

function radioQuestion(qNum, key, options, required = true) {
    let html = `<div class="question" id="q${qNum}">
        <label class="question-label">
            <span class="question-number">${qNum}.</span>
            ${getText(key)} ${required ? '<span class="required">*</span>' : ''}
        </label>
        <div class="options">`;
    
    options.forEach((opt, i) => {
        const optKey = `${key.replace('q', 'q')}_o${i+1}`;
        html += `<label class="radio-option">
            <input type="radio" name="q${qNum}" value="${opt.value || getText(optKey)}" ${required ? 'required' : ''}>
            <span class="radio-label">${getText(optKey)}</span>
        </label>`;
    });
    
    html += `</div></div>`;
    return html;
}

function renderSection1() {
    return `
        ${sectionHeader(1, 'sec1')}
        
        <div class="question" id="q1">
            <label class="question-label">
                <span class="question-number">1.</span>
                ${getText('q1')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q1_o1','q1_o2','q1_o3','q1_o4','q1_o5','q1_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q1" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question" id="q2">
            <label class="question-label">
                <span class="question-number">2.</span>
                ${getText('q2')} <span class="required">*</span>
            </label>
            <select name="q2" id="q2Select" required>
                <option value="">${getText('q2_placeholder')}</option>
                ${['q2_o1','q2_o2','q2_o3','q2_o4','q2_o5','q2_o6','q2_o7','q2_o8','q2_o9','q2_o10'].map(k => `
                    <option value="${getText(k)}">${getText(k)}</option>
                `).join('')}
            </select>
            <input type="text" id="q2Other" name="q2_other" placeholder="${getText('q2_other')}" style="display:none; margin-top:10px;">
        </div>
        
        <div class="question" id="q3">
            <label class="question-label">
                <span class="question-number">3.</span>
                ${getText('q3')} <span class="required">*</span>
            </label>
            <select name="q3" id="q3Select" required>
                <option value="">${getText('q3_placeholder')}</option>
                ${['q3_o1','q3_o2','q3_o3','q3_o4','q3_o5','q3_o6','q3_o7','q3_o8','q3_o9'].map(k => `
                    <option value="${getText(k)}">${getText(k)}</option>
                `).join('')}
            </select>
            <input type="text" id="q3Other" name="q3_other" placeholder="${getText('q3_other')}" style="display:none; margin-top:10px;">
        </div>
        
        <div class="question" id="q4">
            <label class="question-label">
                <span class="question-number">4.</span>
                ${getText('q4')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q4_o1','q4_o2','q4_o3','q4_o4','q4_o5'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q4" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question" id="q5">
            <label class="question-label">
                <span class="question-number">5.</span>
                ${getText('q5')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q5_o1','q5_o2','q5_o3','q5_o4','q5_o5','q5_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q5" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        ${navButtons(false, true)}
    `;
}

function renderSection2() {
    return `
        ${sectionHeader(2, 'sec2')}
        
        <div class="question" id="q6">
            <label class="question-label">
                <span class="question-number">6.</span>
                ${getText('q6')} <span class="required">*</span>
            </label>
            <p class="hint">${getText('q6_hint')}</p>
            <div class="options checkbox-options">
                ${['q6_o1','q6_o2','q6_o3','q6_o4','q6_o5','q6_o6','q6_o7','q6_o8','q6_o9','q6_o10','q6_o11','q6_o12'].map(k => `
                    <label class="checkbox-option">
                        <input type="checkbox" name="q6" value="${getText(k)}">
                        <span class="checkbox-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
            <input type="text" id="q6Other" name="q6_other" placeholder="${getText('q6_other')}" style="display:none; margin-top:10px;">
        </div>
        
        <div class="question" id="q7">
            <label class="question-label">
                <span class="question-number">7.</span>
                ${getText('q7')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q7_o1','q7_o2','q7_o3','q7_o4','q7_o5','q7_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q7" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question otel-enabled" id="q8" style="display:none;">
            <label class="question-label">
                <span class="question-number">8.</span>
                ${getText('q8')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q8_o1','q8_o2','q8_o3','q8_o4','q8_o5'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q8" value="${getText(k)}">
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question otel-enabled" id="q9" style="display:none;">
            <label class="question-label">
                <span class="question-number">9.</span>
                ${getText('q9')} <span class="required">*</span>
            </label>
            <p class="hint">${getText('q9_hint')}</p>
            <div class="options checkbox-options">
                ${['q9_o1','q9_o2','q9_o3','q9_o4','q9_o5','q9_o6'].map(k => `
                    <label class="checkbox-option">
                        <input type="checkbox" name="q9" value="${getText(k)}">
                        <span class="checkbox-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        ${navButtons(true, true)}
    `;
}

function renderSection3() {
    const mttrInfo = `
        <div class="mttr-info">
            <div class="info-icon">ℹ</div>
            <div class="info-content">
                <strong>${getText('mttrInfoTitle')}</strong> ${getText('mttrInfoIntro')}
                <ul>
                    <li><strong>Mean Time To Repair</strong> – ${getText('mttrRepair')}</li>
                    <li><strong>Mean Time To Recovery</strong> – ${getText('mttrRecovery')}</li>
                    <li><strong>Mean Time To Resolve</strong> – ${getText('mttrResolve')}</li>
                </ul>
                <p class="mttr-used">${getText('mttrUsed')}</p>
            </div>
        </div>
    `;
    
    const amateurNotice = isAmateur ? `
        <div class="info-box amateur-info">
            <div class="info-icon">ℹ</div>
            <span>${getText('amateurInfo')}</span>
        </div>
    ` : '';
    
    return `
        ${sectionHeader(3, 'sec3')}
        ${mttrInfo}
        ${amateurNotice}
        
        <div class="question" id="q10">
            <label class="question-label">
                <span class="question-number">10.</span>
                ${getText('q10')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q10_o1','q10_o2','q10_o3','q10_o4'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q10" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question" id="q11">
            <label class="question-label">
                <span class="question-number">11.</span>
                ${getText('q11')}
            </label>
            <p class="hint">${getText('q11_hint')}</p>
            <div class="number-input-group">
                <input type="number" name="q11" min="0" max="10080" placeholder="${getText('q11_placeholder')}">
                <span class="unit">${getText('minutes')}</span>
            </div>
            <p class="range-hint">${getText('q11_range')}</p>
        </div>
        
        <div class="question" id="q12">
            <label class="question-label">
                <span class="question-number">12.</span>
                ${getText('q12')} <br><small>${getText('q12_note')}</small>
            </label>
            <p class="hint">${getText('q12_hint')}</p>
            <div class="number-input-group">
                <input type="number" name="q12" min="0" max="43200" placeholder="${getText('q12_placeholder')}">
                <span class="unit">${getText('minutes')}</span>
            </div>
            <p class="range-hint">${getText('q12_range')}</p>
        </div>
        
        <div class="question" id="q13">
            <label class="question-label">
                <span class="question-number">13.</span>
                ${getText('q13')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q13_o1','q13_o2','q13_o3','q13_o4'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q13" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question" id="q14">
            <label class="question-label">
                <span class="question-number">14.</span>
                ${getText('q14')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q14_o1','q14_o2','q14_o3','q14_o4','q14_o5','q14_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q14" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        ${navButtons(true, true)}
    `;
}

function renderSection4() {
    const otelQuestions = `
        <div class="question otel-only" id="q15">
            <label class="question-label">
                <span class="question-number">15.</span>
                ${getText('q15')} <span class="required">*</span>
            </label>
            <div class="options">
                ${['q15_o1','q15_o2','q15_o3','q15_o4','q15_o5','q15_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q15" value="${getText(k)}">
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question otel-only" id="q16">
            <label class="question-label">
                <span class="question-number">16.</span>
                ${getText('q16')} <br><small>${getText('q16_note')}</small> <span class="required">*</span>
            </label>
            <div class="options">
                ${['q16_o1','q16_o2','q16_o3','q16_o4','q16_o5','q16_o6'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q16" value="${getText(k)}">
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question otel-only" id="q17">
            <label class="question-label">
                <span class="question-number">17.</span>
                ${getText('q17')}
            </label>
            <p class="hint">${getText('q17_hint')}</p>
            <div class="slider-container">
                <input type="range" name="q17" min="0" max="100" value="0" class="slider">
                <span class="slider-value">0%</span>
            </div>
        </div>
        
        <div class="question otel-only" id="q18">
            <label class="question-label">
                <span class="question-number">18.</span>
                ${getText('q18')} <br><small>${getText('q18_note')}</small>
            </label>
            <p class="hint">${getText('q18_hint')}</p>
            <div class="slider-container">
                <input type="range" name="q18" min="0" max="100" value="0" class="slider">
                <span class="slider-value">0%</span>
            </div>
        </div>
        
        <div class="question otel-only" id="q19">
            <label class="question-label">
                <span class="question-number">19.</span>
                ${getText('q19')}
            </label>
            <p class="hint">${getText('q19_hint')}</p>
            <div class="ranking-list" id="rankingList">
                ${['q19_o1','q19_o2','q19_o3','q19_o4','q19_o5'].map((k, i) => `
                    <div class="ranking-item" draggable="true" data-value="${getText(k)}">
                        <span class="rank-number">${i+1}</span>
                        <span class="rank-text">${getText(k)}</span>
                        <span class="drag-handle">⋮⋮</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const nonOtelQuestions = `
        <div class="question non-otel-only" id="q20">
            <label class="question-label">
                <span class="question-number">20.</span>
                ${getText('q20')} <span class="required">*</span>
            </label>
            <p class="hint">${getText('q20_hint')}</p>
            <div class="options checkbox-options">
                ${['q20_o1','q20_o2','q20_o3','q20_o4','q20_o5','q20_o6','q20_o7','q20_o8'].map(k => `
                    <label class="checkbox-option">
                        <input type="checkbox" name="q20" value="${getText(k)}">
                        <span class="checkbox-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
            <input type="text" id="q20Other" name="q20_other" placeholder="${getText('q20_other')}" style="display:none; margin-top:10px;">
        </div>
        
        <div class="question non-otel-only" id="q21">
            <label class="question-label">
                <span class="question-number">21.</span>
                ${getText('q21')} <span class="required">*</span>
            </label>
            <div class="options likert-options">
                ${['q21_o1','q21_o2','q21_o3','q21_o4','q21_o5'].map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q21" value="${getText(k)}">
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <div class="question non-otel-only" id="q22">
            <label class="question-label">
                <span class="question-number">22.</span>
                ${getText('q22')}
            </label>
            <textarea name="q22" rows="4" maxlength="1000" placeholder="${getText('q22_placeholder')}"></textarea>
            <p class="char-count"><span class="current">0</span>/1000 ${getText('characters')}</p>
        </div>
    `;
    
    return `
        ${sectionHeader(4, 'sec4')}
        ${isOtelUser ? otelQuestions : nonOtelQuestions}
        ${navButtons(true, true)}
    `;
}

function renderSection5() {
    if (!isOtelUser) {
        // Skip this section for non-OTel users
        currentSection = 6;
        renderSection(6);
        return '';
    }
    
    const likertScale = ['likert1','likert2','likert3','likert4','likert5'];
    
    function likertQuestion(qNum, key) {
        return `
            <div class="question" id="q${qNum}">
                <label class="question-label">
                    <span class="question-number">${qNum}.</span>
                    ${getText(key)} <span class="required">*</span>
                </label>
                <div class="options likert-options">
                    ${likertScale.map((lk, i) => `
                        <label class="radio-option likert-${i+1}">
                            <input type="radio" name="q${qNum}" value="${i+1}" required>
                            <span class="likert-label">${getText(lk)}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    return `
        ${sectionHeader(5, 'sec5')}
        ${likertQuestion(23, 'q23')}
        ${likertQuestion(24, 'q24')}
        ${likertQuestion(25, 'q25')}
        ${likertQuestion(26, 'q26')}
        ${likertQuestion(27, 'q27')}
        ${navButtons(true, true)}
    `;
}

function renderSection6() {
    const likertScale = (qNum, key, opts) => `
        <div class="question" id="q${qNum}">
            <label class="question-label">
                <span class="question-number">${qNum}.</span>
                ${getText(key)} <span class="required">*</span>
            </label>
            <div class="options likert-options">
                ${opts.map(k => `
                    <label class="radio-option">
                        <input type="radio" name="q${qNum}" value="${getText(k)}" required>
                        <span class="radio-label">${getText(k)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;
    
    const q29Html = isOtelUser ? likertScale(29, 'q29', ['q29_o1','q29_o2','q29_o3','q29_o4','q29_o5']) : '';
    
    return `
        ${sectionHeader(6, 'sec6')}
        
        ${likertScale(28, 'q28', ['q28_o1','q28_o2','q28_o3','q28_o4','q28_o5'])}
        ${q29Html}
        ${likertScale(30, 'q30', ['q30_o1','q30_o2','q30_o3','q30_o4','q30_o5'])}
        
        <div class="question" id="q31">
            <label class="question-label">
                <span class="question-number">31.</span>
                ${getText('q31')} <span class="required">*</span>
            </label>
            <div class="options maturity-options">
                ${[1,2,3,4,5].map(i => `
                    <label class="radio-option maturity-option">
                        <input type="radio" name="q31" value="${i}" required>
                        <span class="maturity-level">${i}</span>
                        <span class="maturity-name">${getText(`q31_o${i}`)}</span>
                        <span class="maturity-desc">${getText(`q31_o${i}_desc`)}</span>
                    </label>
                `).join('')}
            </div>
        </div>
        
        ${navButtons(true, true)}
    `;
}

function renderSection7() {
    return `
        ${sectionHeader(7, 'sec7')}
        <p class="section-intro">${getText('openIntro')}</p>
        
        <div class="question" id="q32">
            <label class="question-label">
                <span class="question-number">32.</span>
                ${getText('q32')}
            </label>
            <p class="hint">${getText('q32_hint')}</p>
            <textarea name="q32" rows="4" maxlength="1000" placeholder="${getText('q32_placeholder')}"></textarea>
            <p class="char-count"><span class="current">0</span>/1000 ${getText('characters')}</p>
        </div>
        
        <div class="question" id="q33">
            <label class="question-label">
                <span class="question-number">33.</span>
                ${getText('q33')}
            </label>
            <p class="hint">${getText('q33_hint')}</p>
            <textarea name="q33" rows="4" maxlength="1000" placeholder="${getText('q33_placeholder')}"></textarea>
            <p class="char-count"><span class="current">0</span>/1000 ${getText('characters')}</p>
        </div>
        
        <div class="question" id="q34">
            <label class="question-label">
                <span class="question-number">34.</span>
                ${getText('q34')}
            </label>
            <textarea name="q34" rows="3" maxlength="500" placeholder="${getText('q34_placeholder')}"></textarea>
            <p class="char-count"><span class="current">0</span>/500 ${getText('characters')}</p>
        </div>
        
        <div class="question" id="q35">
            <label class="question-label">
                <span class="question-number">35.</span>
                ${getText('q35')}
            </label>
            <p class="hint">${getText('q35_hint')}</p>
            <input type="email" name="q35" placeholder="${getText('q35_placeholder')}">
        </div>
        
        ${navButtons(true, false, true)}
    `;
}

function navButtons(showBack, showNext, showSubmit = false) {
    let html = '<div class="nav-buttons">';
    if (showBack) {
        html += `<button type="button" class="btn btn-secondary" onclick="prevSection()">${getText('backBtn')}</button>`;
    }
    if (showNext) {
        html += `<button type="button" class="btn btn-primary" onclick="nextSection()">${getText('nextBtn')}</button>`;
    }
    if (showSubmit) {
        html += `<button type="button" class="btn btn-primary btn-submit" onclick="submitSurvey()">${getText('submitBtn')}</button>`;
    }
    html += '</div>';
    return html;
}

// ========== NAVIGATION ==========
const answers = {};

function saveCurrentAnswers() {
    const container = document.getElementById('surveyContainer');
    
    // Radio buttons
    container.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        answers[input.name] = input.value;
    });
    
    // Checkboxes
    const checkboxGroups = {};
    container.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
        if (!checkboxGroups[input.name]) checkboxGroups[input.name] = [];
        checkboxGroups[input.name].push(input.value);
    });
    Object.assign(answers, checkboxGroups);
    
    // Text inputs
    container.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]').forEach(input => {
        if (input.value) answers[input.name] = input.value;
    });
    
    // Textareas
    container.querySelectorAll('textarea').forEach(textarea => {
        if (textarea.value) answers[textarea.name] = textarea.value;
    });
    
    // Selects
    container.querySelectorAll('select').forEach(select => {
        if (select.value) answers[select.name] = select.value;
    });
    
    // Sliders
    container.querySelectorAll('input[type="range"]').forEach(slider => {
        answers[slider.name] = slider.value;
    });
    
    // Check OTel status from Q7
    if (answers.q7) {
        const otelStatuses = [getText('q7_o1'), getText('q7_o2')];
        isOtelUser = otelStatuses.some(s => answers.q7.includes(s) || answers.q7 === s);
    }
}

function restoreAnswers() {
    const container = document.getElementById('surveyContainer');
    
    Object.entries(answers).forEach(([name, value]) => {
        if (Array.isArray(value)) {
            // Checkboxes
            value.forEach(v => {
                const cb = container.querySelector(`input[name="${name}"][value="${v}"]`);
                if (cb) cb.checked = true;
            });
        } else {
            // Radio
            const radio = container.querySelector(`input[type="radio"][name="${name}"][value="${value}"]`);
            if (radio) radio.checked = true;
            
            // Text/number/email
            const input = container.querySelector(`input[type="text"][name="${name}"], input[type="number"][name="${name}"], input[type="email"][name="${name}"]`);
            if (input) input.value = value;
            
            // Textarea
            const textarea = container.querySelector(`textarea[name="${name}"]`);
            if (textarea) textarea.value = value;
            
            // Select
            const select = container.querySelector(`select[name="${name}"]`);
            if (select) select.value = value;
            
            // Slider
            const slider = container.querySelector(`input[type="range"][name="${name}"]`);
            if (slider) {
                slider.value = value;
                const valueDisplay = slider.parentElement.querySelector('.slider-value');
                if (valueDisplay) valueDisplay.textContent = value + '%';
            }
        }
    });
    
    // Update isOtelUser from saved q7 answer
    if (answers.q7) {
        const otelStatuses = [getText('q7_o1'), getText('q7_o2')];
        isOtelUser = otelStatuses.includes(answers.q7);
    }
    
    // Show/hide OTel-dependent questions
    updateOtelVisibility();
}

function validateCurrentSection() {
    const container = document.getElementById('surveyContainer');
    const required = container.querySelectorAll('[required]');
    
    for (const el of required) {
        if (el.type === 'radio') {
            const name = el.name;
            const checked = container.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                el.closest('.question').scrollIntoView({ behavior: 'smooth' });
                alert(getText('errRequired'));
                return false;
            }
        } else if (!el.value) {
            el.scrollIntoView({ behavior: 'smooth' });
            alert(getText('errRequired'));
            return false;
        }
    }
    return true;
}

function nextSection() {
    if (!validateCurrentSection()) return;
    saveCurrentAnswers();
    
    currentSection++;
    
    // Skip section 5 for non-OTel users
    if (currentSection === 5 && !isOtelUser) {
        currentSection = 6;
    }
    
    renderSection(currentSection);
    updateProgress();
}

function prevSection() {
    saveCurrentAnswers();
    
    currentSection--;
    
    // Skip section 5 for non-OTel users
    if (currentSection === 5 && !isOtelUser) {
        currentSection = 4;
    }
    
    if (currentSection < 1) currentSection = 1;
    renderSection(currentSection);
    updateProgress();
}

// ========== EVENT LISTENERS ==========
function attachEventListeners() {
    // Q2 "Other" handling
    const q2Select = document.getElementById('q2Select');
    const q2Other = document.getElementById('q2Other');
    if (q2Select && q2Other) {
        q2Select.addEventListener('change', () => {
            q2Other.style.display = q2Select.value === getText('q2_o10') ? 'block' : 'none';
        });
    }
    
    // Q3 "Other" handling
    const q3Select = document.getElementById('q3Select');
    const q3Other = document.getElementById('q3Other');
    if (q3Select && q3Other) {
        q3Select.addEventListener('change', () => {
            q3Other.style.display = q3Select.value === getText('q3_o9') ? 'block' : 'none';
        });
    }
    
    // Q6 "Other" handling
    const q6Checkboxes = document.querySelectorAll('input[name="q6"]');
    const q6Other = document.getElementById('q6Other');
    if (q6Other) {
        q6Checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const otherChecked = [...q6Checkboxes].some(c => c.value === getText('q6_o12') && c.checked);
                q6Other.style.display = otherChecked ? 'block' : 'none';
            });
        });
    }
    
    // Q7 OTel status change
    const q7Radios = document.querySelectorAll('input[name="q7"]');
    q7Radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const otelStatuses = [getText('q7_o1'), getText('q7_o2')];
            isOtelUser = otelStatuses.includes(radio.value);
            updateOtelVisibility();
        });
    });
    
    // Q20 "Other" handling
    const q20Checkboxes = document.querySelectorAll('input[name="q20"]');
    const q20Other = document.getElementById('q20Other');
    if (q20Other) {
        q20Checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const otherChecked = [...q20Checkboxes].some(c => c.value === getText('q20_o8') && c.checked);
                q20Other.style.display = otherChecked ? 'block' : 'none';
            });
        });
    }
    
    // Sliders
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.slider-value');
        if (valueDisplay) {
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value + '%';
            });
        }
    });
    
    // Character counters
    document.querySelectorAll('textarea').forEach(textarea => {
        const counter = textarea.parentElement.querySelector('.char-count .current');
        if (counter) {
            textarea.addEventListener('input', () => {
                counter.textContent = textarea.value.length;
            });
        }
    });
    
    // Drag and drop for ranking
    initRanking();
}

function updateOtelVisibility() {
    // Update isOtelUser from saved q7 answer
    if (answers.q7) {
        const otelStatuses = [getText('q7_o1'), getText('q7_o2')];
        isOtelUser = otelStatuses.includes(answers.q7);
    }
    
    // Show/hide OTel-dependent questions in section 2
    document.querySelectorAll('.otel-enabled').forEach(el => {
        el.style.display = isOtelUser ? 'block' : 'none';
    });
}

function initRanking() {
    const list = document.getElementById('rankingList');
    if (!list) return;
    
    let draggedItem = null;
    
    list.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => item.classList.add('dragging'), 0);
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            updateRankNumbers();
        });
        
        item.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(list, e.clientY);
            if (afterElement) {
                list.insertBefore(draggedItem, afterElement);
            } else {
                list.appendChild(draggedItem);
            }
        });
    });
    
    function getDragAfterElement(container, y) {
        const elements = [...container.querySelectorAll('.ranking-item:not(.dragging)')];
        return elements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    
    function updateRankNumbers() {
        list.querySelectorAll('.ranking-item').forEach((item, i) => {
            item.querySelector('.rank-number').textContent = i + 1;
        });
    }
}

// ========== SUBMISSION ==========
async function submitSurvey() {
    if (!validateCurrentSection()) return;
    saveCurrentAnswers();
    
    // Get ranking order
    const rankingList = document.getElementById('rankingList');
    if (rankingList) {
        answers.q19 = [...rankingList.querySelectorAll('.ranking-item')]
            .map(item => item.dataset.value);
    }
    
    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = '...';
    
    try {
        const response = await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: validatedToken,
                language: currentLang,
                isOtelUser,
                isAmateur,
                responses: answers,
                submittedAt: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showThankYou();
        } else {
            throw new Error(data.error || 'Submission failed');
        }
    } catch (err) {
        console.error('Submit error:', err);
        alert(getText('errSubmit'));
        submitBtn.disabled = false;
        submitBtn.textContent = getText('submitBtn');
    }
}

function showThankYou() {
    document.getElementById('surveyContainer').innerHTML = `
        <div class="thank-you">
            <div class="thank-icon">✓</div>
            <h2>${getText('thankTitle')}</h2>
            <p>${getText('thankMsg')}</p>
        </div>
    `;
    document.getElementById('progressBar').style.display = 'none';
}
