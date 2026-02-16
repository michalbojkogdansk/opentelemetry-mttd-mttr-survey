/**
 * Translations for OpenTelemetry MTTD/MTTR Survey
 * Key-based system for reliable translation
 */
const t = {
    // ========== UI ==========
    langTitle: { pl: "Wybierz język ankiety", en: "Select survey language" },
    tokenTitle: { pl: "Weryfikacja dostępu", en: "Access Verification" },
    tokenDesc: { pl: "Ta ankieta wymaga zaproszenia. Wprowadź otrzymany token lub użyj linku z zaproszenia.", en: "This survey requires an invitation. Enter the token you received or use the invitation link." },
    tokenHelp: { pl: "Nie masz tokenu? Skontaktuj się z osobą, która wysłała Ci zaproszenie.", en: "Don't have a token? Contact the person who sent you the invitation." },
    tokenPlaceholder: { pl: "Np. OTEL-2026-ABC123", en: "E.g. OTEL-2026-ABC123" },
    verifyBtn: { pl: "Weryfikuj", en: "Verify" },
    backBtn: { pl: "Wstecz", en: "Back" },
    nextBtn: { pl: "Dalej", en: "Next" },
    submitBtn: { pl: "Wyślij odpowiedzi", en: "Submit answers" },
    sectionOf: { pl: "Sekcja", en: "Section" },
    of: { pl: "z", en: "of" },
    required: { pl: "(wymagane)", en: "(required)" },
    optional: { pl: "(opcjonalnie)", en: "(optional)" },
    characters: { pl: "znaków", en: "characters" },
    minutes: { pl: "minut", en: "minutes" },
    
    // Header & Footer
    headerTitle: { pl: "Badanie: Wpływ OpenTelemetry na MTTD i MTTR", en: "Study: OpenTelemetry Impact on MTTD and MTTR" },
    headerSubtitle: { pl: "MTTD = Mean Time To Detect (średni czas wykrycia incydentu) | MTTR = Mean Time To Recovery (średni czas przywrócenia usługi)", en: "MTTD = Mean Time To Detect | MTTR = Mean Time To Recovery" },
    footerTitle: { pl: "Badanie naukowe | 2026", en: "Research Study | 2026" },
    footerAnon: { pl: "Ankieta jest anonimowa. Dane są wykorzystywane wyłącznie do celów naukowych.", en: "This survey is anonymous. Data is used only for research purposes." },
    
    // Errors
    errRequired: { pl: "To pole jest wymagane", en: "This field is required" },
    errInvalidToken: { pl: "Nieprawidłowy lub wykorzystany token", en: "Invalid or used token" },
    errSubmit: { pl: "Błąd wysyłania. Spróbuj ponownie.", en: "Submission error. Please try again." },
    
    // Thank you
    thankTitle: { pl: "Dziękujemy za udział!", en: "Thank you for participating!" },
    thankMsg: { pl: "Twoje odpowiedzi zostały zapisane. Dziękujemy za poświęcony czas.", en: "Your responses have been saved. Thank you for your time." },
    
    // ========== SECTIONS ==========
    sec1: { pl: "Informacje demograficzne", en: "Demographics" },
    sec2: { pl: "Obecne praktyki monitoringu", en: "Current Monitoring Practices" },
    sec3: { pl: "Samoocena MTTD i MTTR", en: "MTTD and MTTR – Self-Assessment" },
    sec4: { pl: "Wpływ OpenTelemetry", en: "OpenTelemetry Impact" },
    sec5: { pl: "Przydatność elementów OpenTelemetry", en: "OpenTelemetry Element Usefulness" },
    sec6: { pl: "Wiedza i satysfakcja", en: "Knowledge and Satisfaction" },
    sec7: { pl: "Pytania otwarte", en: "Open Questions" },
    
    // MTTR Info Box
    mttrInfoTitle: { pl: "Uwaga dotycząca MTTR:", en: "Note about MTTR:" },
    mttrInfoIntro: { pl: "Akronim MTTR ma trzy możliwe interpretacje:", en: "The MTTR acronym has three possible interpretations:" },
    mttrRepair: { pl: "Mean Time To Repair – tylko czas naprawy (bez diagnostyki)", en: "Mean Time To Repair – repair time only (excluding diagnostics)" },
    mttrRecovery: { pl: "Mean Time To Recovery – od wykrycia do pełnego przywrócenia usługi", en: "Mean Time To Recovery – from detection to full service restoration" },
    mttrResolve: { pl: "Mean Time To Resolve – cały cykl życia incydentu (z post-mortem)", en: "Mean Time To Resolve – entire incident lifecycle (including post-mortem)" },
    mttrUsed: { pl: "W tym badaniu używamy definicji Recovery – czyli czas od wykrycia incydentu do pełnego przywrócenia usługi do stanu operacyjnego. Ta interpretacja bezpośrednio przekłada się na czas niedostępności odczuwany przez użytkowników.", en: "This study uses the Recovery definition – time from incident detection to full service restoration. This interpretation directly reflects downtime experienced by users." },
    
    // Amateur info
    amateurInfo: { pl: "Ze względu na krótkie doświadczenie możesz podać wartości orientacyjne lub pozostawić pola puste.", en: "Due to limited experience, you may provide approximate values or leave fields empty." },
    
    // Open questions intro
    openIntro: { pl: "Twoje szczegółowe odpowiedzi są bardzo cenne dla badania. Opisz swoje doświadczenia własnymi słowami.", en: "Your detailed answers are very valuable for the research. Describe your experiences in your own words." },
    
    // ========== QUESTIONS ==========
    // Q1
    q1: { pl: "Ile lat doświadczenia zawodowego posiadasz w obszarze DevOps, SRE, Backend Development lub pokrewnym?", en: "How many years of professional experience do you have in DevOps, SRE, Backend Development or related fields?" },
    q1_o1: { pl: "Mniej niż 6 miesięcy", en: "Less than 6 months" },
    q1_o2: { pl: "6 miesięcy – 1 rok", en: "6 months – 1 year" },
    q1_o3: { pl: "1–2 lata", en: "1–2 years" },
    q1_o4: { pl: "3–5 lat", en: "3–5 years" },
    q1_o5: { pl: "6–10 lat", en: "6–10 years" },
    q1_o6: { pl: "Ponad 10 lat", en: "More than 10 years" },
    
    // Q2
    q2: { pl: "Jaka jest Twoja obecna rola zawodowa?", en: "What is your current professional role?" },
    q2_placeholder: { pl: "-- Wybierz rolę --", en: "-- Select role --" },
    q2_other: { pl: "Wpisz swoją rolę...", en: "Enter your role..." },
    q2_o1: { pl: "DevOps Engineer", en: "DevOps Engineer" },
    q2_o2: { pl: "Site Reliability Engineer (SRE)", en: "Site Reliability Engineer (SRE)" },
    q2_o3: { pl: "Platform Engineer", en: "Platform Engineer" },
    q2_o4: { pl: "Backend Developer", en: "Backend Developer" },
    q2_o5: { pl: "Full-stack Developer", en: "Full-stack Developer" },
    q2_o6: { pl: "Cloud Architect", en: "Cloud Architect" },
    q2_o7: { pl: "System Administrator", en: "System Administrator" },
    q2_o8: { pl: "Tech Lead / Engineering Manager", en: "Tech Lead / Engineering Manager" },
    q2_o9: { pl: "Student / Praktykant", en: "Student / Intern" },
    q2_o10: { pl: "Inna", en: "Other" },
    
    // Q3
    q3: { pl: "W jakiej branży działa Twoja organizacja?", en: "What industry does your organization operate in?" },
    q3_placeholder: { pl: "-- Wybierz branżę --", en: "-- Select industry --" },
    q3_other: { pl: "Wpisz branżę...", en: "Enter industry..." },
    q3_o1: { pl: "Finanse i bankowość", en: "Finance and banking" },
    q3_o2: { pl: "E-commerce / Retail", en: "E-commerce / Retail" },
    q3_o3: { pl: "Technologie / Software house", en: "Technology / Software house" },
    q3_o4: { pl: "Telekomunikacja", en: "Telecommunications" },
    q3_o5: { pl: "Media i rozrywka", en: "Media and entertainment" },
    q3_o6: { pl: "Ochrona zdrowia", en: "Healthcare" },
    q3_o7: { pl: "Produkcja / Przemysł", en: "Manufacturing / Industry" },
    q3_o8: { pl: "Sektor publiczny / Edukacja", en: "Public sector / Education" },
    q3_o9: { pl: "Inna", en: "Other" },
    
    // Q4
    q4: { pl: "Jaka jest przybliżona wielkość Twojej organizacji (liczba pracowników)?", en: "What is the approximate size of your organization (number of employees)?" },
    q4_o1: { pl: "1–10 (mikroprzedsiębiorstwo)", en: "1–10 (micro)" },
    q4_o2: { pl: "11–50 (małe)", en: "11–50 (small)" },
    q4_o3: { pl: "51–250 (średnie)", en: "51–250 (medium)" },
    q4_o4: { pl: "251–1000 (duże)", en: "251–1000 (large)" },
    q4_o5: { pl: "Ponad 1000 (korporacja)", en: "More than 1000 (enterprise)" },
    
    // Q5
    q5: { pl: "Ile mikroserwisów lub komponentów aplikacyjnych obsługuje Twój zespół?", en: "How many microservices or application components does your team manage?" },
    q5_o1: { pl: "1–5", en: "1–5" },
    q5_o2: { pl: "6–15", en: "6–15" },
    q5_o3: { pl: "16–50", en: "16–50" },
    q5_o4: { pl: "51–100", en: "51–100" },
    q5_o5: { pl: "Ponad 100", en: "More than 100" },
    q5_o6: { pl: "Nie wiem / Nie dotyczy", en: "Don't know / N/A" },
    
    // Q6
    q6: { pl: "Jakich narzędzi do observability używasz w swojej pracy?", en: "What observability tools do you use in your work?" },
    q6_hint: { pl: "Zaznacz wszystkie pasujące", en: "Select all that apply" },
    q6_o1: { pl: "Prometheus + Grafana", en: "Prometheus + Grafana" },
    q6_o2: { pl: "Elastic Stack (ELK)", en: "Elastic Stack (ELK)" },
    q6_o3: { pl: "Datadog", en: "Datadog" },
    q6_o4: { pl: "New Relic", en: "New Relic" },
    q6_o5: { pl: "Dynatrace", en: "Dynatrace" },
    q6_o6: { pl: "Splunk", en: "Splunk" },
    q6_o7: { pl: "Jaeger / Zipkin", en: "Jaeger / Zipkin" },
    q6_o8: { pl: "AWS CloudWatch", en: "AWS CloudWatch" },
    q6_o9: { pl: "Azure Monitor", en: "Azure Monitor" },
    q6_o10: { pl: "Google Cloud Operations", en: "Google Cloud Operations" },
    q6_o11: { pl: "OpenTelemetry Collector", en: "OpenTelemetry Collector" },
    q6_o12: { pl: "Inne", en: "Other" },
    q6_other: { pl: "Wpisz inne narzędzia...", en: "Enter other tools..." },
    
    // Q7
    q7: { pl: "Czy Twój zespół wdrożył lub planuje wdrożyć OpenTelemetry?", en: "Has your team implemented or is planning to implement OpenTelemetry?" },
    q7_o1: { pl: "Tak, używamy w produkcji", en: "Yes, we use it in production" },
    q7_o2: { pl: "Tak, jesteśmy w trakcie wdrożenia", en: "Yes, we are currently implementing" },
    q7_o3: { pl: "Planujemy wdrożenie w ciągu 12 miesięcy", en: "We plan to implement within 12 months" },
    q7_o4: { pl: "Rozważamy, ale bez konkretnych planów", en: "We're considering it, but no concrete plans" },
    q7_o5: { pl: "Nie, nie planujemy", en: "No, we don't plan to" },
    q7_o6: { pl: "Nie znam OpenTelemetry", en: "I don't know OpenTelemetry" },
    
    // Q8
    q8: { pl: "Jak długo Twój zespół używa OpenTelemetry?", en: "How long has your team been using OpenTelemetry?" },
    q8_o1: { pl: "Mniej niż 3 miesiące", en: "Less than 3 months" },
    q8_o2: { pl: "3–6 miesięcy", en: "3–6 months" },
    q8_o3: { pl: "6–12 miesięcy", en: "6–12 months" },
    q8_o4: { pl: "1–2 lata", en: "1–2 years" },
    q8_o5: { pl: "Ponad 2 lata", en: "More than 2 years" },
    
    // Q9
    q9: { pl: "Które komponenty OpenTelemetry są używane w Twoim środowisku?", en: "Which OpenTelemetry components are used in your environment?" },
    q9_hint: { pl: "Zaznacz wszystkie pasujące", en: "Select all that apply" },
    q9_o1: { pl: "Traces (ślady rozproszone)", en: "Traces (distributed tracing)" },
    q9_o2: { pl: "Metrics (metryki)", en: "Metrics" },
    q9_o3: { pl: "Logs (logi)", en: "Logs" },
    q9_o4: { pl: "OpenTelemetry Collector", en: "OpenTelemetry Collector" },
    q9_o5: { pl: "Auto-instrumentacja", en: "Auto-instrumentation" },
    q9_o6: { pl: "Nie wiem", en: "Don't know" },
    
    // Q10
    q10: { pl: "W jaki sposób zbierasz dane o MTTD i MTTR?", en: "How do you collect MTTD and MTTR data?" },
    q10_o1: { pl: "Automatycznie z narzędzi monitoringu", en: "Automatically from monitoring tools" },
    q10_o2: { pl: "Manualnie rejestrujemy incydenty", en: "We manually record incidents" },
    q10_o3: { pl: "Kombinacja obu metod", en: "Combination of both methods" },
    q10_o4: { pl: "Nie zbieramy tych metryk", en: "We don't collect these metrics" },
    
    // Q11
    q11: { pl: "Jaki był średni czas wykrycia incydentu (MTTD) w ostatnich 6 miesiącach?", en: "What was the average incident detection time (MTTD) over the last 6 months?" },
    q11_hint: { pl: "Podaj wartość w minutach", en: "Enter value in minutes" },
    q11_placeholder: { pl: "np. 15", en: "e.g. 15" },
    q11_range: { pl: "Wartość od 0 do 10080 (maksymalnie tydzień)", en: "Value from 0 to 10080 (maximum one week)" },
    
    // Q12
    q12: { pl: "Jaki był średni czas przywrócenia usługi (MTTR) w ostatnich 6 miesiącach?", en: "What was the average time to recovery (MTTR) over the last 6 months?" },
    q12_note: { pl: "(od wykrycia do pełnego przywrócenia usługi)", en: "(from detection to full service restoration)" },
    q12_hint: { pl: "Podaj wartość w minutach", en: "Enter value in minutes" },
    q12_placeholder: { pl: "np. 60", en: "e.g. 60" },
    q12_range: { pl: "Wartość od 0 do 43200 (maksymalnie miesiąc)", en: "Value from 0 to 43200 (maximum one month)" },
    
    // Q13
    q13: { pl: "Jak oceniasz dokładność swoich danych o MTTD/MTTR?", en: "How do you rate the accuracy of your MTTD/MTTR data?" },
    q13_o1: { pl: "Bardzo dokładne (automatyczne pomiary)", en: "Very accurate (automated measurements)" },
    q13_o2: { pl: "Dość dokładne (częściowo automatyczne)", en: "Fairly accurate (partially automated)" },
    q13_o3: { pl: "Szacunkowe (manualne rejestrowanie)", en: "Estimated (manual recording)" },
    q13_o4: { pl: "Niedokładne / Nie śledzę regularnie", en: "Inaccurate / I don't track regularly" },
    
    // Q14
    q14: { pl: "Ile incydentów produkcyjnych wystąpiło w Twoim środowisku w ostatnich 3 miesiącach?", en: "How many production incidents occurred in your environment in the last 3 months?" },
    q14_o1: { pl: "0 (brak incydentów)", en: "0 (no incidents)" },
    q14_o2: { pl: "1–5", en: "1–5" },
    q14_o3: { pl: "6–15", en: "6–15" },
    q14_o4: { pl: "16–30", en: "16–30" },
    q14_o5: { pl: "Ponad 30", en: "More than 30" },
    q14_o6: { pl: "Nie wiem / Nie śledzę", en: "Don't know / Don't track" },
    
    // Q15
    q15: { pl: "Jak OpenTelemetry wpłynęło na czas wykrycia incydentów (MTTD)?", en: "How has OpenTelemetry affected incident detection time (MTTD)?" },
    q15_o1: { pl: "Znaczące skrócenie (>50%)", en: "Significant reduction (>50%)" },
    q15_o2: { pl: "Umiarkowane skrócenie (20-50%)", en: "Moderate reduction (20-50%)" },
    q15_o3: { pl: "Nieznaczne skrócenie (<20%)", en: "Slight reduction (<20%)" },
    q15_o4: { pl: "Bez zmian", en: "No change" },
    q15_o5: { pl: "Wydłużenie czasu", en: "Increased time" },
    q15_o6: { pl: "Za wcześnie na ocenę", en: "Too early to assess" },
    
    // Q16
    q16: { pl: "Jak OpenTelemetry wpłynęło na czas przywrócenia usługi (MTTR)?", en: "How has OpenTelemetry affected time to recovery (MTTR)?" },
    q16_note: { pl: "(od wykrycia do pełnego przywrócenia usługi)", en: "(from detection to full service restoration)" },
    q16_o1: { pl: "Znaczące skrócenie (>50%)", en: "Significant reduction (>50%)" },
    q16_o2: { pl: "Umiarkowane skrócenie (20-50%)", en: "Moderate reduction (20-50%)" },
    q16_o3: { pl: "Nieznaczne skrócenie (<20%)", en: "Slight reduction (<20%)" },
    q16_o4: { pl: "Bez zmian", en: "No change" },
    q16_o5: { pl: "Wydłużenie czasu", en: "Increased time" },
    q16_o6: { pl: "Za wcześnie na ocenę", en: "Too early to assess" },
    
    // Q17
    q17: { pl: "O ile procent szacujesz poprawę MTTD dzięki OpenTelemetry?", en: "By what percentage do you estimate MTTD improvement thanks to OpenTelemetry?" },
    q17_hint: { pl: "Użyj suwaka lub wpisz wartość", en: "Use the slider or enter value" },
    
    // Q18
    q18: { pl: "O ile procent szacujesz poprawę MTTR dzięki OpenTelemetry?", en: "By what percentage do you estimate MTTR improvement thanks to OpenTelemetry?" },
    q18_note: { pl: "(od wykrycia do pełnego przywrócenia usługi)", en: "(from detection to full service restoration)" },
    q18_hint: { pl: "Użyj suwaka lub wpisz wartość", en: "Use the slider or enter value" },
    
    // Q19
    q19: { pl: "Które elementy OpenTelemetry najbardziej przyczyniły się do poprawy?", en: "Which OpenTelemetry elements contributed most to the improvement?" },
    q19_hint: { pl: "Uszereguj od najważniejszego (1) do najmniej ważnego", en: "Rank from most important (1) to least important" },
    q19_o1: { pl: "Ślady rozproszone (traces)", en: "Distributed traces" },
    q19_o2: { pl: "Metryki", en: "Metrics" },
    q19_o3: { pl: "Logi", en: "Logs" },
    q19_o4: { pl: "Korelacja między sygnałami", en: "Signal correlation" },
    q19_o5: { pl: "Standaryzacja (OTLP)", en: "Standardization (OTLP)" },
    
    // Q20
    q20: { pl: "Jakie są główne bariery w adopcji OpenTelemetry w Twojej organizacji?", en: "What are the main barriers to OpenTelemetry adoption in your organization?" },
    q20_hint: { pl: "Zaznacz wszystkie pasujące", en: "Select all that apply" },
    q20_o1: { pl: "Brak zasobów / czasu na wdrożenie", en: "Lack of resources / time for implementation" },
    q20_o2: { pl: "Brak wiedzy / kompetencji w zespole", en: "Lack of knowledge / skills in the team" },
    q20_o3: { pl: "Istniejące rozwiązania są wystarczające", en: "Existing solutions are sufficient" },
    q20_o4: { pl: "Koszt migracji z obecnych narzędzi", en: "Cost of migration from current tools" },
    q20_o5: { pl: "Brak wsparcia management", en: "Lack of management support" },
    q20_o6: { pl: "Niedojrzałość OpenTelemetry", en: "OpenTelemetry immaturity" },
    q20_o7: { pl: "Złożoność integracji", en: "Integration complexity" },
    q20_o8: { pl: "Inne", en: "Other" },
    q20_other: { pl: "Wpisz inne bariery...", en: "Enter other barriers..." },
    
    // Q21
    q21: { pl: "Jak prawdopodobne jest wdrożenie OpenTelemetry w Twojej organizacji w ciągu 2 lat?", en: "How likely is OpenTelemetry implementation in your organization within 2 years?" },
    q21_o1: { pl: "1 - Bardzo mało prawdopodobne", en: "1 - Very unlikely" },
    q21_o2: { pl: "2", en: "2" },
    q21_o3: { pl: "3 - Neutralne", en: "3 - Neutral" },
    q21_o4: { pl: "4", en: "4" },
    q21_o5: { pl: "5 - Bardzo prawdopodobne", en: "5 - Very likely" },
    
    // Q22
    q22: { pl: "Co musiałoby się zmienić, żeby Twoja organizacja wdrożyła OpenTelemetry?", en: "What would need to change for your organization to implement OpenTelemetry?" },
    q22_placeholder: { pl: "Opisz warunki, które musiałyby być spełnione...", en: "Describe the conditions that would need to be met..." },
    
    // Q23-27 Likert
    likert1: { pl: "1 - Całkowicie bezużyteczne", en: "1 - Completely useless" },
    likert2: { pl: "2 - Mało przydatne", en: "2 - Not very useful" },
    likert3: { pl: "3 - Neutralne", en: "3 - Neutral" },
    likert4: { pl: "4 - Przydatne", en: "4 - Useful" },
    likert5: { pl: "5 - Niezwykle przydatne", en: "5 - Extremely useful" },
    
    q23: { pl: "Oceń przydatność śladów rozproszonych (traces) dla wykrywania i rozwiązywania incydentów:", en: "Rate the usefulness of distributed traces for incident detection and resolution:" },
    q24: { pl: "Oceń przydatność metryk dla wykrywania i rozwiązywania incydentów:", en: "Rate the usefulness of metrics for incident detection and resolution:" },
    q25: { pl: "Oceń przydatność logów dla wykrywania i rozwiązywania incydentów:", en: "Rate the usefulness of logs for incident detection and resolution:" },
    q26: { pl: "Oceń przydatność korelacji między sygnałami (traces, metrics, logs):", en: "Rate the usefulness of signal correlation (traces, metrics, logs):" },
    q27: { pl: "Oceń wartość standaryzacji danych telemetrycznych (OTLP):", en: "Rate the value of telemetry data standardization (OTLP):" },
    
    // Q28
    q28: { pl: "Jak pewnie czułeś/aś się w diagnozowaniu problemów PRZED wdrożeniem OpenTelemetry?", en: "How confident did you feel diagnosing problems BEFORE implementing OpenTelemetry?" },
    q28_o1: { pl: "1 - Bardzo niepewnie", en: "1 - Very uncertain" },
    q28_o2: { pl: "2", en: "2" },
    q28_o3: { pl: "3 - Neutralnie", en: "3 - Neutral" },
    q28_o4: { pl: "4", en: "4" },
    q28_o5: { pl: "5 - Bardzo pewnie", en: "5 - Very confident" },
    
    // Q29
    q29: { pl: "Jak pewnie czujesz się w diagnozowaniu problemów PO wdrożeniu OpenTelemetry?", en: "How confident do you feel diagnosing problems AFTER implementing OpenTelemetry?" },
    q29_o1: { pl: "1 - Bardzo niepewnie", en: "1 - Very uncertain" },
    q29_o2: { pl: "2", en: "2" },
    q29_o3: { pl: "3 - Neutralnie", en: "3 - Neutral" },
    q29_o4: { pl: "4", en: "4" },
    q29_o5: { pl: "5 - Bardzo pewnie", en: "5 - Very confident" },
    
    // Q30
    q30: { pl: "Jak oceniasz ogólną satysfakcję z narzędzi observability w Twojej organizacji?", en: "How do you rate overall satisfaction with observability tools in your organization?" },
    q30_o1: { pl: "1 - Bardzo niezadowolony/a", en: "1 - Very dissatisfied" },
    q30_o2: { pl: "2", en: "2" },
    q30_o3: { pl: "3 - Neutralnie", en: "3 - Neutral" },
    q30_o4: { pl: "4", en: "4" },
    q30_o5: { pl: "5 - Bardzo zadowolony/a", en: "5 - Very satisfied" },
    
    // Q31
    q31: { pl: "Jak oceniasz dojrzałość praktyk observability w Twojej organizacji?", en: "How do you rate the maturity of observability practices in your organization?" },
    q31_o1: { pl: "Początkowa", en: "Initial" },
    q31_o1_desc: { pl: "Brak formalnych procesów", en: "No formal processes" },
    q31_o2: { pl: "Podstawowa", en: "Basic" },
    q31_o2_desc: { pl: "Podstawowy monitoring", en: "Basic monitoring" },
    q31_o3: { pl: "Rozwijająca się", en: "Developing" },
    q31_o3_desc: { pl: "Częściowa automatyzacja", en: "Partial automation" },
    q31_o4: { pl: "Zaawansowana", en: "Advanced" },
    q31_o4_desc: { pl: "Pełna automatyzacja, proaktywność", en: "Full automation, proactive" },
    q31_o5: { pl: "Optymalna", en: "Optimal" },
    q31_o5_desc: { pl: "Continuous improvement, AIOps", en: "Continuous improvement, AIOps" },
    
    // Q32
    q32: { pl: "Jaka jest według Ciebie największa korzyść z wdrożenia OpenTelemetry?", en: "In your opinion, what is the biggest benefit of implementing OpenTelemetry?" },
    q32_hint: { pl: "(jeśli nie używasz OTel, opisz oczekiwaną korzyść)", en: "(if you don't use OTel, describe the expected benefit)" },
    q32_placeholder: { pl: "Opisz największą korzyść...", en: "Describe the biggest benefit..." },
    
    // Q33
    q33: { pl: "Jakie jest według Ciebie największe wyzwanie związane z OpenTelemetry?", en: "In your opinion, what is the biggest challenge related to OpenTelemetry?" },
    q33_hint: { pl: "(wdrożenie, użytkowanie, integracja itp.)", en: "(implementation, usage, integration, etc.)" },
    q33_placeholder: { pl: "Opisz największe wyzwanie...", en: "Describe the biggest challenge..." },
    
    // Q34
    q34: { pl: "Czy masz dodatkowe uwagi dotyczące tematu badania?", en: "Do you have any additional comments about the research topic?" },
    q34_placeholder: { pl: "Dodatkowe uwagi...", en: "Additional comments..." },
    
    // Q35
    q35: { pl: "Adres e-mail do przesłania wyników badania", en: "Email address to receive research results" },
    q35_hint: { pl: "(opcjonalnie)", en: "(optional)" },
    q35_placeholder: { pl: "twoj@email.com", en: "your@email.com" }
};

// Helper function to get translation
function getText(key) {
    if (t[key] && t[key][currentLang]) {
        return t[key][currentLang];
    }
    console.warn('Missing translation:', key, currentLang);
    return t[key] ? (t[key]['pl'] || key) : key;
}

// Backward compatibility
const translations = t;
