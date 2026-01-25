# 📊 Ankieta: Wpływ OpenTelemetry na MTTD i MTTR

Interaktywna ankieta online do pracy magisterskiej badającej wpływ standaryzacji OpenTelemetry na skrócenie czasu detekcji (MTTD) i rozwiązania (MTTR) incydentów w środowiskach chmurowych.

## 🔗 Link do ankiety

**[https://michalbojkogdansk.github.io/opentelemetry-mttd-mttr-survey](https://michalbojkogdansk.github.io/opentelemetry-mttd-mttr-survey)**

---

## 📋 Informacje o badaniu

### Tytuł pracy
„Wpływ standaryzacji OpenTelemetry na skrócenie czasu detekcji (MTTD) i rozwiązania (MTTR) incydentów w środowiskach chmurowych"

### Cel badania
Zbadanie związku między wdrożeniem OpenTelemetry a poprawą kluczowych metryk observability (MTTD/MTTR) w organizacjach wykorzystujących środowiska chmurowe.

### Grupy respondentów
- **Amatorzy** – ≤ 2 lata doświadczenia w DevOps/SRE/Backend
- **Specjaliści** – ≥ 3 lata doświadczenia lub formalna rola SRE/DevOps

### Minimalna próba
60 respondentów (30 na grupę)

---

## 🏗️ Struktura ankiety

| Sekcja | Tytuł | Liczba pytań |
|--------|-------|--------------|
| I | Informacje demograficzne | 5 |
| II | Obecne praktyki monitoringu | 4 |
| III | MTTD i MTTR – samoocena | 5 |
| IV | Wpływ OpenTelemetry | 5-8* |
| V | Ocena użyteczności elementów OTel | 5* |
| VI | Wiedza i satysfakcja | 4 |
| VII | Pytania otwarte | 4 |

*\* Sekcje warunkowe – wyświetlane w zależności od statusu wdrożenia OTel*

### Czas wypełnienia
**6-8 minut**

---

## ⚙️ Funkcjonalności

### Logika warunkowa
- Automatyczne wykrywanie grupy respondenta (amator/specjalista)
- Dynamiczne wyświetlanie pytań w zależności od statusu OTel
- Pominięcie pytań MTTD/MTTR dla osób nie zbierających danych

### Walidacja
- Wymagane pola oznaczone gwiazdką (*)
- Walidacja zakresów dla pól liczbowych
- Limit wyboru dla pytań wielokrotnego wyboru

### UX
- Responsywny design (mobile-first)
- Pasek postępu
- Interaktywny ranking (drag & drop)
- Liczniki znaków dla pól tekstowych

---

## 🚀 Wdrożenie

### GitHub Pages

1. Upewnij się, że repozytorium jest publiczne
2. Przejdź do Settings → Pages
3. Wybierz Source: Deploy from a branch
4. Branch: `main`, Folder: `/ (root)`
5. Zapisz i poczekaj na deployment

### Integracja z backendem (opcje)

#### Google Forms
Odkomentuj funkcję `submitToGoogleForms()` w `js/survey.js` i uzupełnij mapowanie pól.

#### Google Sheets (Apps Script)
1. Utwórz nowy Google Sheet
2. Otwórz Apps Script (Rozszerzenia → Apps Script)
3. Wklej kod:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  const row = Object.values(data);
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({status: 'ok'}));
}
```

4. Wdróż jako aplikację webową
5. Wklej URL do `submitToGoogleSheets()` w survey.js

#### Formspree
1. Załóż konto na [formspree.io](https://formspree.io)
2. Utwórz nowy formularz
3. Wklej ID formularza do `submitToFormspree()` w survey.js

---

## 📁 Struktura plików

```
/
├── index.html          # Główna strona ankiety
├── css/
│   └── styles.css      # Style CSS
├── js/
│   └── survey.js       # Logika JavaScript
└── README.md           # Dokumentacja
```

---

## 📊 Eksport danych

### Z localStorage (testowanie)
W konsoli przeglądarki:
```javascript
exportResponses()
```

### Z Google Sheets
Pobierz jako CSV/XLSX z menu Plik → Pobierz

---

## 🧪 Test pilotażowy

### Checklist przed uruchomieniem
- [ ] Przetestuj na 5 osobach (2-3 amatorów, 2-3 specjalistów)
- [ ] Zmierz rzeczywisty czas wypełnienia
- [ ] Sprawdź działanie na mobile
- [ ] Zweryfikuj logikę warunkową
- [ ] Upewnij się, że dane docierają do backendu
- [ ] Sprawdź czy wszystkie pytania są zrozumiałe

### Feedback do zebrania
1. Czy instrukcje są jasne?
2. Czy pytania są jednoznaczne?
3. Czy skala Likerta jest intuicyjna?
4. Czy czas wypełnienia był akceptowalny?
5. Czy coś sprawiło trudność?

---

## 📈 Analiza statystyczna

### Rekomendowane testy
| Analiza | Test statystyczny |
|---------|------------------|
| Porównanie grup (amatorzy vs specjaliści) | Test t-Studenta / Mann-Whitney U |
| Korelacje (skale Likerta) | Współczynnik Spearmana |
| Różnice w proporcjach | Test chi-kwadrat |
| Wpływ OTel na MTTD/MTTR | ANOVA / Kruskal-Wallis |

### Narzędzia
- SPSS / JASP
- R / RStudio
- Python (pandas, scipy, statsmodels)

---

## 🔒 Prywatność i RODO

- Ankieta jest **anonimowa**
- Dane wykorzystywane **wyłącznie do celów naukowych**
- Respondent może w każdej chwili przerwać wypełnianie
- Email na wyniki jest **opcjonalny**

### Klauzula informacyjna
Dołączona na końcu ankiety oraz w stopce.

---

## 📅 Harmonogram badania

| Tydzień | Aktywność |
|---------|-----------|
| 1 | Test pilotażowy i korekty |
| 2-4 | Zbieranie odpowiedzi |
| 5 | Zamknięcie i czyszczenie danych |
| 6-7 | Analiza i interpretacja |

---

## 📞 Kanały dystrybucji

### Rekomendowane
- LinkedIn: DevOps Polska, SRE Poland, Kubernetes Poland
- Reddit: r/devops, r/sre
- Discord/Slack: Polskie społeczności DevOps
- Konferencje: DevOpsDays, Cloud Native Warsaw
- Bezpośredni kontakt z firmami technologicznymi

---

## 🤝 Kontakt

W razie pytań dotyczących badania:
- **Email**: [twój email]
- **GitHub Issues**: W tym repozytorium

---

## 📄 Licencja

Projekt udostępniony na potrzeby pracy magisterskiej.
© 2026
