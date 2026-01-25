/**
 * OpenTelemetry Survey - JavaScript Logic
 * Handles token validation, conditional logic, navigation, and form submission
 */

// ============================================
// Configuration - UPDATE THIS AFTER DEPLOYING CLOUDFLARE WORKER
// ============================================
const CONFIG = {
    WORKER_URL: 'https://wild-block-e91fsurvey-api.michal-bojko-gdansk.workers.dev',
    DEBUG: false
};

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // State Management
    // ============================================
    const state = {
        currentSection: 1,
        totalSections: 7,
        startTime: null,
        otelStatus: null,
        shortExperience: false,
        collectsMttdMttr: true,
        token: null,
        tokenValidated: false
    };

    // ============================================
    // DOM Elements
    // ============================================
    const tokenScreen = document.getElementById('tokenScreen');
    const surveyContainer = document.getElementById('surveyContainer');
    const tokenInput = document.getElementById('tokenInput');
    const validateTokenBtn = document.getElementById('validateTokenBtn');
    const tokenError = document.getElementById('tokenError');
    
    const form = document.getElementById('surveyForm');
    const sections = document.querySelectorAll('.survey-section');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const thankYouScreen = document.getElementById('thankYouScreen');

    // ============================================
    // Token Validation
    // ============================================
    initTokenValidation();

    function initTokenValidation() {
        // Check for token in URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token');
        
        if (urlToken) {
            tokenInput.value = urlToken;
            validateToken(urlToken);
        }

        // Token validation button
        validateTokenBtn.addEventListener('click', () => {
            const token = tokenInput.value.trim().toUpperCase();
            if (token) {
                validateToken(token);
            } else {
                showTokenError('Wprowadź token');
            }
        });

        // Enter key in token input
        tokenInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                validateTokenBtn.click();
            }
        });
    }

    async function validateToken(token) {
        showTokenLoading(true);
        hideTokenError();

        try {
            const response = await fetch(`${CONFIG.WORKER_URL}/validate?token=${encodeURIComponent(token)}`);
            const data = await response.json();

            if (data.valid) {
                state.token = token;
                state.tokenValidated = true;
                showSurvey();
            } else {
                showTokenError(getTokenErrorMessage(data.error));
            }
        } catch (error) {
            console.error('Token validation error:', error);
            showTokenError('Błąd połączenia. Sprawdź połączenie internetowe i spróbuj ponownie.');
        } finally {
            showTokenLoading(false);
        }
    }

    function getTokenErrorMessage(error) {
        const messages = {
            'Token required': 'Wprowadź token',
            'Invalid token': 'Nieprawidłowy token. Sprawdź poprawność i spróbuj ponownie.',
            'Token already used': 'Ten token został już wykorzystany. Każdy token może być użyty tylko raz.'
        };
        return messages[error] || 'Wystąpił błąd. Spróbuj ponownie.';
    }

    function showTokenError(message) {
        tokenError.textContent = message;
        tokenError.classList.add('show');
    }

    function hideTokenError() {
        tokenError.classList.remove('show');
    }

    function showTokenLoading(loading) {
        if (loading) {
            validateTokenBtn.disabled = true;
            validateTokenBtn.innerHTML = '<span class="token-loading"></span>';
        } else {
            validateTokenBtn.disabled = false;
            validateTokenBtn.textContent = 'Weryfikuj';
        }
    }

    function showSurvey() {
        tokenScreen.style.display = 'none';
        surveyContainer.style.display = 'block';
        state.startTime = new Date();
        init();
        
        // Clean URL (remove token parameter)
        if (window.history.replaceState) {
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }

    // ============================================
    // Survey Initialization
    // ============================================
    function init() {
        setupEventListeners();
        setupConditionalLogic();
        setupRanking();
        setupCharCounters();
        setupCheckboxLimits();
        updateProgress();
        showSection(1);
    }

    // ============================================
    // Event Listeners
    // ============================================
    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', () => navigateSection(-1));
        nextBtn.addEventListener('click', () => navigateSection(1));
        
        // Form submission
        form.addEventListener('submit', handleSubmit);

        // Experience question (Q1)
        document.querySelectorAll('input[name="q1_experience"]').forEach(input => {
            input.addEventListener('change', handleExperienceChange);
        });

        // OTel status question (Q7)
        document.querySelectorAll('input[name="q7_otel_status"]').forEach(input => {
            input.addEventListener('change', handleOtelStatusChange);
        });

        // Data collection question (Q10)
        document.querySelectorAll('input[name="q10_data_collection"]').forEach(input => {
            input.addEventListener('change', handleDataCollectionChange);
        });

        // Role dropdown (Q2)
        document.querySelector('select[name="q2_role"]').addEventListener('change', function() {
            toggleConditionalField('q2_other_container', this.value === 'other');
        });

        // Industry dropdown (Q3)
        document.querySelector('select[name="q3_industry"]').addEventListener('change', function() {
            toggleConditionalField('q3_other_container', this.value === 'other');
        });

        // Tools checkbox - Other (Q6)
        setupCheckboxOther('q6_tools', 'other', 'q6_other_container');

        // Biggest value - Other (Q19)
        document.querySelectorAll('input[name="q19_biggest_value"]').forEach(input => {
            input.addEventListener('change', function() {
                toggleConditionalField('q19_other_container', this.value === 'other');
            });
        });

        // Obstacles checkbox - Other (Q20)
        setupCheckboxOther('q20_obstacles', 'other', 'q20_other_container');
    }

    // ============================================
    // Conditional Logic
    // ============================================
    function setupConditionalLogic() {
        const otelStatusValue = document.querySelector('input[name="q7_otel_status"]:checked');
        if (otelStatusValue) {
            handleOtelStatusChange.call(otelStatusValue);
        }
    }

    function handleExperienceChange() {
        const value = this.value;
        state.shortExperience = (value === 'less_than_6m');
        
        const infoBox = document.getElementById('shortExperienceInfo');
        if (infoBox) {
            infoBox.style.display = state.shortExperience ? 'flex' : 'none';
        }
    }

    function handleOtelStatusChange() {
        const value = this.value;
        const otelYesValues = ['full', 'partial', 'in_progress'];
        state.otelStatus = otelYesValues.includes(value) ? 'yes' : 'no';

        document.querySelectorAll('[data-show-if="otel_yes"]').forEach(el => {
            el.style.display = state.otelStatus === 'yes' ? 'block' : 'none';
        });

        const otelUsersSection = document.getElementById('otelUsersSection');
        const nonOtelUsersSection = document.getElementById('nonOtelUsersSection');
        const otelUsabilitySection = document.getElementById('otelUsabilitySection');

        if (state.otelStatus === 'yes') {
            otelUsersSection.style.display = 'block';
            nonOtelUsersSection.style.display = 'none';
            // Sekcja V będzie pokazywana przez nawigację (klasa active)
            otelUsabilitySection.classList.add('otel-enabled');
        } else {
            otelUsersSection.style.display = 'none';
            nonOtelUsersSection.style.display = 'block';
            // Sekcja V będzie pomijana w nawigacji
            otelUsabilitySection.classList.remove('otel-enabled');
        }

        updateVisibleSections();
    }

    function handleDataCollectionChange() {
        const value = this.value;
        state.collectsMttdMttr = !['none', 'unknown'].includes(value);
        
        const mttdMttrQuestions = document.getElementById('mttdMttrQuestions');
        if (mttdMttrQuestions) {
            mttdMttrQuestions.style.display = state.collectsMttdMttr ? 'block' : 'none';
        }
    }

    function toggleConditionalField(containerId, show) {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = show ? 'block' : 'none';
            const input = container.querySelector('input, textarea');
            if (input) {
                input.required = show;
            }
        }
    }

    function setupCheckboxOther(name, otherValue, containerId) {
        document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
            input.addEventListener('change', function() {
                const otherChecked = document.querySelector(`input[name="${name}"][value="${otherValue}"]`).checked;
                toggleConditionalField(containerId, otherChecked);
            });
        });
    }

    // ============================================
    // Navigation
    // ============================================
    function navigateSection(direction) {
        const newSection = state.currentSection + direction;
        
        if (direction > 0 && !validateCurrentSection()) {
            return;
        }

        let targetSection = newSection;
        if (state.otelStatus === 'no') {
            if (direction > 0 && newSection === 5) {
                targetSection = 6;
            } else if (direction < 0 && newSection === 5) {
                targetSection = 4;
            }
        }

        if (targetSection >= 1 && targetSection <= state.totalSections) {
            showSection(targetSection);
        }
    }

    function showSection(sectionNum) {
        // Ukryj wszystkie sekcje
        sections.forEach(section => {
            section.classList.remove('active');
            // Nie zmieniaj display dla sekcji warunkowych (obsługiwanych osobno)
            if (!section.id || (section.id !== 'otelUsersSection' && section.id !== 'nonOtelUsersSection')) {
                section.style.display = '';  // Reset inline style, pozwól CSS działać
            }
        });

        const targetSection = document.querySelector(`[data-section="${sectionNum}"]`);
        if (targetSection) {
            targetSection.classList.add('active');
            state.currentSection = sectionNum;
        }

        updateNavigationButtons();
        updateProgress();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateNavigationButtons() {
        const effectiveSections = getEffectiveTotalSections();
        
        prevBtn.style.display = state.currentSection > 1 ? 'block' : 'none';
        
        if (state.currentSection >= effectiveSections) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    function updateProgress() {
        const effectiveSections = getEffectiveTotalSections();
        const progress = (state.currentSection / effectiveSections) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Sekcja ${state.currentSection} z ${effectiveSections}`;
    }

    function getEffectiveTotalSections() {
        return state.otelStatus === 'no' ? state.totalSections - 1 : state.totalSections;
    }

    function updateVisibleSections() {
        updateNavigationButtons();
        updateProgress();
    }

    // ============================================
    // Validation
    // ============================================
    function validateCurrentSection() {
        const currentSectionEl = document.querySelector(`[data-section="${state.currentSection}"]`);
        const requiredInputs = currentSectionEl.querySelectorAll('[required]');
        let isValid = true;
        let firstInvalid = null;

        requiredInputs.forEach(input => {
            if (!isVisible(input)) return;

            const inputValid = validateInput(input);
            if (!inputValid && !firstInvalid) {
                firstInvalid = input;
            }
            isValid = isValid && inputValid;
        });

        const checkboxGroups = currentSectionEl.querySelectorAll('.checkbox-grid[data-min], .checkbox-grid');
        checkboxGroups.forEach(group => {
            if (!isVisible(group)) return;
            
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            
            const question = group.closest('.question');
            if (question && question.querySelector('.required')) {
                if (!anyChecked) {
                    isValid = false;
                    if (!firstInvalid) {
                        firstInvalid = checkboxes[0];
                    }
                    highlightInvalid(group);
                }
            }
        });

        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showValidationMessage(firstInvalid);
        }

        return isValid;
    }

    function validateInput(input) {
        if (input.type === 'radio') {
            const name = input.name;
            const checked = document.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                highlightInvalid(input.closest('.options-list, .options-grid, .likert-scale'));
                return false;
            }
        } else if (input.type === 'number') {
            const value = parseFloat(input.value);
            const min = parseFloat(input.min) || 0;
            const max = parseFloat(input.max) || Infinity;
            
            if (input.value !== '' && (isNaN(value) || value < min || value > max)) {
                highlightInvalid(input);
                return false;
            }
        } else if (input.value.trim() === '') {
            highlightInvalid(input);
            return false;
        }
        
        return true;
    }

    function isVisible(element) {
        if (!element) return false;
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        
        const parent = element.parentElement;
        if (parent) return isVisible(parent);
        
        return true;
    }

    function highlightInvalid(element) {
        if (!element) return;
        element.classList.add('invalid');
        setTimeout(() => element.classList.remove('invalid'), 3000);
    }

    function showValidationMessage(element) {
        document.querySelectorAll('.validation-message').forEach(el => el.remove());
        
        const message = document.createElement('div');
        message.className = 'validation-message';
        message.textContent = 'To pole jest wymagane';
        message.style.cssText = `
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 8px;
            padding: 8px 12px;
            background: #fee2e2;
            border-radius: 6px;
        `;
        
        const question = element.closest('.question');
        if (question) {
            question.appendChild(message);
            setTimeout(() => message.remove(), 3000);
        }
    }

    // ============================================
    // Ranking (Drag & Drop)
    // ============================================
    function setupRanking() {
        const container = document.getElementById('rankingContainer');
        if (!container) return;

        const items = container.querySelectorAll('.ranking-item');
        let draggedItem = null;

        items.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                draggedItem = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });

            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                items.forEach(i => i.classList.remove('drag-over'));
                updateRankingPositions();
            });

            item.addEventListener('dragover', function(e) {
                e.preventDefault();
                if (this !== draggedItem) {
                    this.classList.add('drag-over');
                }
            });

            item.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });

            item.addEventListener('drop', function(e) {
                e.preventDefault();
                if (this !== draggedItem) {
                    const allItems = [...container.querySelectorAll('.ranking-item')];
                    const fromIndex = allItems.indexOf(draggedItem);
                    const toIndex = allItems.indexOf(this);

                    if (fromIndex < toIndex) {
                        container.insertBefore(draggedItem, this.nextSibling);
                    } else {
                        container.insertBefore(draggedItem, this);
                    }
                }
                this.classList.remove('drag-over');
            });

            item.addEventListener('touchstart', handleTouchStart, { passive: true });
            item.addEventListener('touchmove', handleTouchMove, { passive: false });
            item.addEventListener('touchend', handleTouchEnd);
        });

        updateRankingPositions();
    }

    function updateRankingPositions() {
        const container = document.getElementById('rankingContainer');
        const items = container.querySelectorAll('.ranking-item');
        const ranking = [];

        items.forEach((item, index) => {
            const position = item.querySelector('.ranking-position');
            position.textContent = index + 1;
            ranking.push(item.dataset.value);
        });

        const rankingInput = document.getElementById('q18RankingInput');
        if (rankingInput) {
            rankingInput.value = ranking.join(',');
        }
    }

    let touchStartY = 0;
    let touchCurrentItem = null;

    function handleTouchStart(e) {
        touchCurrentItem = this;
        touchStartY = e.touches[0].clientY;
        this.classList.add('dragging');
    }

    function handleTouchMove(e) {
        if (!touchCurrentItem) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const container = document.getElementById('rankingContainer');
        const items = [...container.querySelectorAll('.ranking-item')];
        
        items.forEach(item => {
            if (item === touchCurrentItem) return;
            const rect = item.getBoundingClientRect();
            if (touch.clientY > rect.top && touch.clientY < rect.bottom) {
                item.classList.add('drag-over');
            } else {
                item.classList.remove('drag-over');
            }
        });
    }

    function handleTouchEnd(e) {
        if (!touchCurrentItem) return;
        
        const container = document.getElementById('rankingContainer');
        const overItem = container.querySelector('.ranking-item.drag-over');
        
        if (overItem && overItem !== touchCurrentItem) {
            const items = [...container.querySelectorAll('.ranking-item')];
            const fromIndex = items.indexOf(touchCurrentItem);
            const toIndex = items.indexOf(overItem);

            if (fromIndex < toIndex) {
                container.insertBefore(touchCurrentItem, overItem.nextSibling);
            } else {
                container.insertBefore(touchCurrentItem, overItem);
            }
        }

        touchCurrentItem.classList.remove('dragging');
        container.querySelectorAll('.ranking-item').forEach(i => i.classList.remove('drag-over'));
        updateRankingPositions();
        touchCurrentItem = null;
    }

    // ============================================
    // Character Counters
    // ============================================
    function setupCharCounters() {
        const textareas = document.querySelectorAll('textarea[maxlength]');
        
        textareas.forEach(textarea => {
            const counterId = textarea.name.replace('q', 'q') + 'CharCount';
            const counter = document.getElementById(counterId.replace('_', '').replace('biggest_benefit', '32CharCount').replace('biggest_challenge', '33CharCount').replace('comments', '34CharCount').replace('adoption_conditions', '22CharCount'));
            
            if (counter) {
                textarea.addEventListener('input', function() {
                    counter.textContent = this.value.length;
                });
            }
        });

        setupCharCounter('q22_adoption_conditions', 'q22CharCount');
        setupCharCounter('q32_biggest_benefit', 'q32CharCount');
        setupCharCounter('q33_biggest_challenge', 'q33CharCount');
        setupCharCounter('q34_comments', 'q34CharCount');
    }

    function setupCharCounter(textareaName, counterId) {
        const textarea = document.querySelector(`textarea[name="${textareaName}"]`);
        const counter = document.getElementById(counterId);
        
        if (textarea && counter) {
            textarea.addEventListener('input', function() {
                counter.textContent = this.value.length;
            });
        }
    }

    // ============================================
    // Checkbox Limits
    // ============================================
    function setupCheckboxLimits() {
        const limitedGroups = document.querySelectorAll('.checkbox-grid[data-max]');
        
        limitedGroups.forEach(group => {
            const max = parseInt(group.dataset.max);
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const checked = group.querySelectorAll('input[type="checkbox"]:checked');
                    if (checked.length > max) {
                        this.checked = false;
                        showLimitMessage(group, max);
                    }
                });
            });
        });
    }

    function showLimitMessage(group, max) {
        group.querySelectorAll('.limit-message').forEach(el => el.remove());
        
        const message = document.createElement('div');
        message.className = 'limit-message';
        message.textContent = `Możesz wybrać maksymalnie ${max} opcje`;
        message.style.cssText = `
            color: #f59e0b;
            font-size: 0.85rem;
            margin-top: 10px;
            padding: 8px 12px;
            background: #fef3c7;
            border-radius: 6px;
        `;
        
        group.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }

    // ============================================
    // Form Submission
    // ============================================
    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateCurrentSection()) {
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="token-loading"></span> Wysyłanie...';

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        // Add metadata
        data._metadata = {
            completionTime: calculateCompletionTime(),
            timestamp: new Date().toISOString(),
            respondentType: classifyRespondent(data.q1_experience),
            otelStatus: state.otelStatus
        };

        // Submit to Cloudflare Worker
        try {
            const response = await fetch(`${CONFIG.WORKER_URL}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: state.token,
                    responses: data
                })
            });

            const result = await response.json();

            if (result.success) {
                showThankYou(data);
            } else {
                throw new Error(result.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            
            // Save to localStorage as backup
            saveToLocalStorage(data);
            
            // Show error but still show thank you (data is saved locally)
            alert('Wystąpił problem z wysłaniem odpowiedzi. Twoje dane zostały zapisane lokalnie. Skontaktuj się z administratorem ankiety.');
            showThankYou(data);
        }
    }

    function calculateCompletionTime() {
        const endTime = new Date();
        const diffMs = endTime - state.startTime;
        const diffMins = Math.round(diffMs / 60000);
        const diffSecs = Math.round((diffMs % 60000) / 1000);
        return `${diffMins}:${diffSecs.toString().padStart(2, '0')}`;
    }

    function classifyRespondent(experience) {
        const amateurValues = ['less_than_6m', '6m_1y', '1_2y'];
        return amateurValues.includes(experience) ? 'amateur' : 'specialist';
    }

    function saveToLocalStorage(data) {
        try {
            const responses = JSON.parse(localStorage.getItem('survey_responses') || '[]');
            responses.push({
                ...data,
                _backup: true,
                _token: state.token
            });
            localStorage.setItem('survey_responses', JSON.stringify(responses));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    function showThankYou(data) {
        form.style.display = 'none';
        thankYouScreen.style.display = 'block';

        document.getElementById('completionTime').textContent = data._metadata.completionTime;
        
        const answeredCount = Object.keys(data).filter(key => 
            !key.startsWith('_') && data[key] && data[key] !== ''
        ).length;
        document.getElementById('answeredQuestions').textContent = answeredCount;

        document.querySelector('.progress-container').style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ============================================
    // CSS for validation (add dynamically)
    // ============================================
    const validationStyles = document.createElement('style');
    validationStyles.textContent = `
        .invalid {
            animation: shake 0.5s ease;
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(validationStyles);
});
