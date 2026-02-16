// Translations for the survey
const translations = {
    // Token screen
    "Weryfikacja dostępu": "Access Verification",
    "Ta ankieta wymaga zaproszenia. Wprowadź otrzymany token lub użyj linku z zaproszenia.": "This survey requires an invitation. Enter your token or use the link from your invitation.",
    "Nie masz tokenu? Skontaktuj się z osobą, która wysłała Ci zaproszenie.": "Don't have a token? Contact the person who sent you the invitation.",
    "Weryfikuj": "Verify",
    
    // Header
    "Badanie: Wpływ OpenTelemetry na MTTD i MTTR": "Research: OpenTelemetry Impact on MTTD and MTTR",
    "MTTD = Mean Time To Detect (średni czas wykrycia incydentu) | MTTR = Mean Time To Recovery (średni czas przywrócenia usługi)": "MTTD = Mean Time To Detect | MTTR = Mean Time To Recovery",
    "Badanie naukowe | Czas wypełnienia: ~6-8 min": "Research Study | Time: ~6-8 min",
    
    // Navigation
    "Wstecz": "Back",
    "Dalej": "Next",
    "Wyślij ankietę": "Submit Survey",
    "Sekcja": "Section",
    "z": "of",
    
    // Section headers
    "Informacje demograficzne": "Demographics",
    "Aktualny stan monitoringu": "Current Monitoring State",
    "Samoocena MTTD/MTTR": "MTTD/MTTR Self-Assessment",
    "MTTD i MTTR – samoocena": "MTTD and MTTR – Self-Assessment",
    "Wpływ OpenTelemetry": "OpenTelemetry Impact",
    "Użyteczność elementów OpenTelemetry": "OpenTelemetry Element Usefulness",
    "Ocena użyteczności elementów OpenTelemetry": "OpenTelemetry Element Usefulness Assessment",
    "Wiedza i satysfakcja": "Knowledge and Satisfaction",
    "Pytania otwarte": "Open Questions",
    
    // Questions
    "Ile lat doświadczenia zawodowego posiadasz w obszarze DevOps, SRE, Backend Development lub pokrewnym?": "How many years of professional experience do you have in DevOps, SRE, Backend Development, or related fields?",
    "Jaka jest Twoja obecna rola zawodowa?": "What is your current professional role?",
    "W jakiej branży działa Twoja organizacja?": "What industry does your organization operate in?",
    "Jaka jest przybliżona wielkość Twojej organizacji (liczba pracowników)?": "What is the approximate size of your organization (number of employees)?",
    "Ile mikroserwisów lub komponentów aplikacyjnych obsługuje Twój zespół?": "How many microservices or application components does your team manage?",
    "Jakich narzędzi do observability używasz w swojej pracy?": "What observability tools do you use in your work?",
    "Czy w Twojej organizacji wdrożono OpenTelemetry (OTel)?": "Has OpenTelemetry (OTel) been implemented in your organization?",
    "Jak długo OpenTelemetry jest używane w Twojej organizacji?": "How long has OpenTelemetry been used in your organization?",
    "Które komponenty OpenTelemetry są aktualnie używane?": "Which OpenTelemetry components are currently being used?",
    "W jaki sposób Twój zespół zbiera dane o czasie detekcji (MTTD) i rozwiązania (MTTR) incydentów?": "How does your team collect incident detection (MTTD) and resolution (MTTR) data?",
    "Jaki był średni czas detekcji incydentu (MTTD) w ciągu ostatnich 6 miesięcy?": "What was the average incident detection time (MTTD) in the last 6 months?",
    "Jaki był średni czas przywrócenia usługi (MTTR) w ciągu ostatnich 6 miesięcy?": "What was the average service recovery time (MTTR) in the last 6 months?",
    "Czy podane wartości MTTD i MTTR są danymi dokładnymi czy orientacyjnymi?": "Are the MTTD and MTTR values you provided accurate or estimated?",
    "Ile incydentów produkcyjnych średnio obsługuje Twój zespół miesięcznie?": "How many production incidents does your team handle on average per month?",
    "Jak zmieniło się MTTD (Mean Time To Detect) po wdrożeniu OpenTelemetry?": "How did MTTD (Mean Time To Detect) change after implementing OpenTelemetry?",
    "Jak zmieniło się MTTR (Mean Time To Recovery) po wdrożeniu OpenTelemetry?": "How did MTTR (Mean Time To Recovery) change after implementing OpenTelemetry?",
    "Jeśli zauważyłeś/aś poprawę, podaj szacunkową wartość skrócenia czasu w procentach:": "If you noticed improvement, estimate the percentage reduction:",
    "Które elementy OpenTelemetry miały największy wpływ na poprawę?": "Which OpenTelemetry elements had the greatest impact on improvement?",
    "W jakim obszarze OpenTelemetry przyniosło największą wartość?": "In which area did OpenTelemetry bring the greatest value?",
    "Jakie są główne przeszkody we wdrożeniu OpenTelemetry?": "What are the main obstacles to implementing OpenTelemetry?",
    "Jak oceniasz prawdopodobieństwo wdrożenia OpenTelemetry w ciągu najbliższych 2 lat?": "How do you rate the likelihood of implementing OpenTelemetry in the next 2 years?",
    "Co musiałoby się zmienić, abyś rozważył/a wdrożenie OpenTelemetry?": "What would need to change for you to consider implementing OpenTelemetry?",
    "Distributed Traces (śledzenie rozproszone)": "Distributed Traces",
    "Metrics (metryki)": "Metrics",
    "Logs (logi strukturalne)": "Logs (structured logs)",
    "Korelacja wizualna między traces, metrics i logs": "Visual correlation between traces, metrics and logs",
    "Standaryzacja eksportu danych (protokół OTLP)": "Data export standardization (OTLP protocol)",
    "Jak oceniasz swoją pewność w diagnozowaniu incydentów PRZED wdrożeniem OpenTelemetry?": "How would you rate your confidence in diagnosing incidents BEFORE implementing OpenTelemetry?",
    "Jak oceniasz swoją pewność w diagnozowaniu incydentów PO wdrożeniu OpenTelemetry?": "How would you rate your confidence in diagnosing incidents AFTER implementing OpenTelemetry?",
    "Jak oceniasz ogólną satysfakcję z obecnie używanych narzędzi do observability?": "How satisfied are you with your current observability tools?",
    "Jak oceniasz dojrzałość praktyk observability w Twojej organizacji?": "How would you rate the observability maturity of your organization?",
    "Jakie największe wyzwania napotykasz przy wdrażaniu lub używaniu OpenTelemetry?": "What are the biggest challenges you face implementing or using OpenTelemetry?",
    "Jakie korzyści zauważyłeś/aś (lub spodziewasz się) po wdrożeniu OpenTelemetry?": "What benefits have you noticed (or expect) from implementing OpenTelemetry?",
    "Czy masz dodatkowe uwagi lub sugestie dotyczące tematu badania?": "Do you have any additional comments or suggestions regarding the research topic?",
    "Opcjonalnie: podaj swój adres e-mail, jeśli chcesz otrzymać wyniki badania.": "Optional: provide your email if you would like to receive the research results.",
    
    // Options - Q1 Experience
    "Mniej niż 6 miesięcy": "Less than 6 months",
    "6 miesięcy – 1 rok": "6 months – 1 year",
    "1–2 lata": "1–2 years",
    "3–5 lat": "3–5 years",
    "6–10 lat": "6–10 years",
    "Ponad 10 lat": "More than 10 years",
    
    // Options - Q2 Role
    "Backend Developer": "Backend Developer",
    "Full-stack Developer": "Full-stack Developer",
    "DevOps Engineer": "DevOps Engineer",
    "SRE (Site Reliability Engineer)": "SRE (Site Reliability Engineer)",
    "Platform Engineer": "Platform Engineer",
    "Cloud Architect": "Cloud Architect",
    "Tech Lead / Team Lead": "Tech Lead / Team Lead",
    "Engineering Manager": "Engineering Manager",
    "Inny": "Other",
    "Inna": "Other",
    
    // Options - Q3 Industry
    "Finanse i bankowość": "Finance and Banking",
    "E-commerce / Retail": "E-commerce / Retail",
    "Technologie / Software house": "Technology / Software house",
    "Telekomunikacja": "Telecommunications",
    "Media i rozrywka": "Media and Entertainment",
    "Ochrona zdrowia": "Healthcare",
    "Produkcja / Przemysł": "Manufacturing / Industry",
    "Sektor publiczny / Edukacja": "Public Sector / Education",
    
    // Options - Q4 Org size
    "1–10 (mikroprzedsiębiorstwo)": "1–10 (micro)",
    "11–50 (małe)": "11–50 (small)",
    "51–250 (średnie)": "51–250 (medium)",
    "251–1000 (duże)": "251–1000 (large)",
    "Ponad 1000 (korporacja)": "More than 1000 (enterprise)",
    
    // Options - Q5 Microservices
    "1–5 serwisów": "1–5 services",
    "6–20 serwisów": "6–20 services",
    "21–50 serwisów": "21–50 services",
    "51–100 serwisów": "51–100 services",
    "Ponad 100 serwisów": "More than 100 services",
    "Nie wiem / Trudno określić": "Don't know / Hard to say",
    "Nie wiem": "Don't know",
    
    // Options - Q7 OTel status
    "Tak, w produkcji": "Yes, in production",
    "Tak, w fazie testów/pilotażu": "Yes, in testing/pilot phase",
    "Planujemy wdrożenie": "Planning to implement",
    "Rozważamy, ale bez konkretnych planów": "Considering, but no concrete plans",
    "Nie, i nie planujemy": "No, and not planning to",
    "Nie znam OpenTelemetry": "I don't know OpenTelemetry",
    
    // Options - Q8 OTel duration
    "Mniej niż 3 miesiące": "Less than 3 months",
    "3–6 miesięcy": "3–6 months",
    "6–12 miesięcy": "6–12 months",
    "1–2 lata": "1–2 years",
    "Ponad 2 lata": "More than 2 years",
    
    // Options - Q10 Data collection
    "Automatyczne pomiary z narzędzi APM/Observability": "Automatic measurements from APM/Observability tools",
    "Ręczne obliczenia na podstawie ticketów/alertów": "Manual calculations based on tickets/alerts",
    "Kombinacja obu metod": "Combination of both methods",
    "Nie zbieramy takich danych": "We don't collect such data",
    
    // Options - Q13 Accuracy
    "Dokładne – bazują na pomiarach systemowych": "Accurate – based on system measurements",
    "Orientacyjne – moja najlepsza estymacja": "Approximate – my best estimate",
    "Nie jestem pewien/pewna": "I'm not sure",
    
    // Options - Q15/Q16 Change
    "Znacząca poprawa (>50%)": "Significant improvement (>50%)",
    "Umiarkowana poprawa (20-50%)": "Moderate improvement (20-50%)",
    "Niewielka poprawa (<20%)": "Slight improvement (<20%)",
    "Bez zmian": "No change",
    "Pogorszenie": "Deterioration",
    "Nie jestem w stanie ocenić": "Unable to assess",
    
    // Options - Q17 Improvement %
    "Brak poprawy lub pogorszenie": "No improvement or deterioration",
    "Nie jestem w stanie oszacować": "Unable to estimate",
    
    // Options - Q19 Value
    "Szybsza identyfikacja źródła problemu (root cause analysis)": "Faster root cause identification",
    "Lepsza widoczność zależności między serwisami": "Better visibility of service dependencies",
    "Unifikacja narzędzi i redukcja kosztów": "Tool unification and cost reduction",
    "Łatwiejsze onboardingowanie nowych członków zespołu": "Easier onboarding of new team members",
    "Standaryzacja praktyk observability w organizacji": "Standardization of observability practices",
    
    // Options - Q20 Barriers
    "Brak czasu/zasobów na wdrożenie": "Lack of time/resources for implementation",
    "Brak wiedzy/kompetencji w zespole": "Lack of knowledge/skills in the team",
    "Obecne narzędzia wystarczają": "Current tools are sufficient",
    "Obawy o koszty": "Cost concerns",
    "Złożoność wdrożenia": "Implementation complexity",
    "Brak wsparcia kierownictwa": "Lack of management support",
    "Problemy z integracją z istniejącą infrastrukturą": "Integration issues with existing infrastructure",
    "Obawy o wydajność": "Performance concerns",
    
    // Options - Q21 Likelihood
    "Bardzo prawdopodobne": "Very likely",
    "Raczej prawdopodobne": "Somewhat likely",
    "Trudno powiedzieć": "Hard to say",
    "Raczej nieprawdopodobne": "Somewhat unlikely",
    "Bardzo nieprawdopodobne": "Very unlikely",
    
    // Likert scale labels
    "Bezużyteczne": "Useless",
    "Neutralne": "Neutral",
    "Bardzo użyteczne": "Very useful",
    "Bardzo niska": "Very low",
    "Niska": "Low",
    "Średnia": "Average",
    "Wysoka": "High",
    "Bardzo wysoka": "Very high",
    "Bardzo niezadowolony": "Very dissatisfied",
    "Bardzo zadowolony": "Very satisfied",
    "Początkowa": "Initial",
    "Rozwijająca się": "Developing",
    "Dojrzała": "Mature",
    "Zaawansowana": "Advanced",
    "Lider": "Leader",
    
    // Hints and helpers
    "(możesz wybrać wiele)": "(select multiple)",
    "(wybierz maksymalnie 3)": "(select up to 3)",
    "(lub przy obecnych narzędziach, jeśli nie używasz OTel)": "(or with current tools if you don't use OTel)",
    "Podaj wartość w minutach": "Enter value in minutes",
    "Uszereguj od 1 (największy) do 5 (najmniejszy) – przeciągnij elementy": "Rank from 1 (highest) to 5 (lowest) – drag items",
    "Opisz warunki, które skłoniłyby Cię do wdrożenia OTel...": "Describe conditions that would lead you to implement OTel...",
    "przez wdrożenie rozumiemy użycie SDK, Collectora lub auto-instrumentacji OTel w co najmniej jednym środowisku": "by implementation we mean using SDK, Collector, or OTel auto-instrumentation in at least one environment",
    
    // Info box
    "Uwaga dotycząca MTTR:": "Note about MTTR:",
    "Akronim MTTR ma trzy możliwe interpretacje:": "The MTTR acronym has three possible interpretations:",
    "Mean Time To Repair": "Mean Time To Repair",
    "Mean Time To Recovery": "Mean Time To Recovery",
    "Mean Time To Resolve": "Mean Time To Resolve",
    "czas samej naprawy (bez diagnostyki)": "repair time only (without diagnostics)",
    "od wykrycia do pełnego przywrócenia usługi": "from detection to full service restoration",
    "cały cykl życia incydentu (włącznie z post-mortem)": "entire incident lifecycle (including post-mortem)",
    "W tym badaniu stosujemy definicję Recovery": "In this research we use the Recovery definition",
    "czyli czas od wykrycia incydentu do pełnego przywrócenia usługi do stanu operacyjnego. Ta interpretacja bezpośrednio przekłada się na czas niedostępności odczuwany przez użytkowników.": "meaning time from incident detection to full service restoration. This interpretation directly relates to downtime experienced by users.",
    
    // Subsection titles
    "Ocena wpływu po wdrożeniu": "Impact assessment after implementation",
    "Plany i przeszkody": "Plans and obstacles",
    "Oceń jak przydatne są poszczególne elementy OpenTelemetry w procesie diagnozowania incydentów.": "Rate how useful each OpenTelemetry element is in the incident diagnosis process.",
    
    // Units and misc
    "minut": "minutes",
    "znaków": "characters",
    "Wartość od 0 do 10080 (maksymalnie tydzień)": "Value from 0 to 10080 (maximum one week)",
    "Wartość od 0 do 43200 (maksymalnie miesiąc)": "Value from 0 to 43200 (maximum one month)",
    
    // Placeholders
    "-- Wybierz branżę --": "-- Select industry --",
    "-- Wybierz --": "-- Select --",
    "Wpisz swoją rolę...": "Enter your role...",
    "Wpisz branżę...": "Enter industry...",
    "Opisz największą wartość...": "Describe the greatest value...",
    "np. 15": "e.g., 15",
    "np. 60": "e.g., 60",
    
    // Tools list (Q6)
    "Prometheus": "Prometheus",
    "Grafana": "Grafana",
    "Datadog": "Datadog",
    "New Relic": "New Relic",
    "Dynatrace": "Dynatrace",
    "Splunk": "Splunk",
    "Elastic/ELK Stack": "Elastic/ELK Stack",
    "Jaeger": "Jaeger",
    "Zipkin": "Zipkin",
    "AWS CloudWatch": "AWS CloudWatch",
    "Azure Monitor": "Azure Monitor",
    "Google Cloud Operations": "Google Cloud Operations",
    "Honeycomb": "Honeycomb",
    "Lightstep": "Lightstep",
    "OpenTelemetry Collector": "OpenTelemetry Collector",
    "Własne rozwiązanie": "Custom solution",
    "Żadne": "None",
    
    // OTel components (Q9)
    "Traces (śledzenie rozproszone)": "Traces (distributed tracing)",
    "Metrics (metryki)": "Metrics",
    "Logs (logi)": "Logs",
    "Auto-instrumentacja (SDK)": "Auto-instrumentation (SDK)",
    "Manualna instrumentacja": "Manual instrumentation",
    "Baggage / Context Propagation": "Baggage / Context Propagation",
    
    // Ranking items
    "Korelacja między traces/metrics/logs": "Correlation between traces/metrics/logs",
    "Standaryzacja eksportu danych (OTLP)": "Data export standardization (OTLP)",
    
    // Error messages
    "Nieprawidłowy token. Sprawdź czy wprowadzony token jest poprawny.": "Invalid token. Please check that the token is correct.",
    "Ten token został już wykorzystany.": "This token has already been used.",
    "Błąd weryfikacji. Spróbuj ponownie.": "Verification error. Please try again.",
    
    // Success messages
    "Dziękujemy za wypełnienie ankiety!": "Thank you for completing the survey!",
    "Twoje odpowiedzi zostały zapisane.": "Your responses have been saved."
};

// Function to switch language
function switchLanguage(lang) {
    document.documentElement.lang = lang;
    document.body.classList.remove('lang-pl', 'lang-en');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('surveyLang', lang);
    
    if (lang === 'en') {
        translateToEnglish();
    } else {
        location.reload(); // Reload for Polish (original)
    }
}

// Apply translations
function translateToEnglish() {
    // Translate text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (translations[text]) {
            node.textContent = node.textContent.replace(text, translations[text]);
        }
    }
    
    // Translate placeholders
    document.querySelectorAll('[placeholder]').forEach(el => {
        const placeholder = el.getAttribute('placeholder');
        if (translations[placeholder]) {
            el.setAttribute('placeholder', translations[placeholder]);
        }
    });
    
    // Translate select options
    document.querySelectorAll('option').forEach(el => {
        const text = el.textContent.trim();
        if (translations[text]) {
            el.textContent = translations[text];
        }
    });
    
    // Update progress text format
    updateProgressText();
}

function updateProgressText() {
    const progressText = document.getElementById('progressText');
    if (progressText) {
        const lang = localStorage.getItem('surveyLang') || 'pl';
        const match = progressText.textContent.match(/\d+/g);
        if (match && match.length >= 2) {
            const current = match[0];
            const total = match[1];
            if (lang === 'en') {
                progressText.textContent = `Section ${current} of ${total}`;
            } else {
                progressText.textContent = `Sekcja ${current} z ${total}`;
            }
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('surveyLang');
    if (savedLang === 'en') {
        document.body.classList.add('lang-en');
        translateToEnglish();
    } else {
        document.body.classList.add('lang-pl');
    }
});
