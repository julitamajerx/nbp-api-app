# NBP Currency Tracker & Calculator

Głównym celem projektu było zaprezentowanie moich umiejętności pracy z biblioteką **Angular Material**. Posiadam doświadczenie w pracy z innymi rozwiązaniami, takimi jak Tailwind CSS, Bootstrap oraz Telerik UI, dlatego zdecydowałam się poszerzyć swój warsztat o natywne rozwiązanie proponowane przez zespół Angulara.

Wykorzystanie Angular Material:

- MatTable & MatPaginator:

  - Obsługa dynamicznych tabel z funkcjami filtrowania, sortowania oraz paginacji danych.

  - Implementacja search baru, który umożliwia filtrowanie walut po nazwie lub kodzie.

  - Wbudowany mechanizm empty search – w przypadku braku wyników, użytkownik otrzymuje czytelny komunikat z możliwością szybkiego wyczyszczenia wyszukiwania.

- MatSideNav i MatTree:

  - Dynamiczne menu boczne, służące do wygodnej nawigacji między różnymi typami tabel NBP (A, B, C) i kalkulatorem.

- MatDialog & Chart.js:

  - Wykorzystanie dialogów do prezentowania szczegółowej historii kursów wybranej waluty.

  - Wizualizacja danych historycznych za pomocą interaktywnego wykresu liniowego stworzonego w bibliotece Chart.js.

- MatFormField & Reactive Forms:

  - Obsługa kalkulatora walut z pełną walidacją formularzy.

- MatSpinner & Interceptor:

  - Globalny loader informujący o pobieraniu danych.

  - Zastosowanie Interceptora z logiką opóźnienia, co pozwala uniknąć efektu migania spinnera przy bardzo szybkich odpowiedziach z API.

- MatSnackBar:

  - Obsługa komunikatów o błędach (np. problemów z połączeniem z API) wyświetlanych w formie estetycznych powiadomień w prawym dolnym rogu ekranu.

- Responsywność (RWD):
  - Aplikacja została dostosowana do urządzeń mobilnych. Zastosowano elastyczne layouty, a boczna nawigacja (MatDrawer) na mniejszych ekranach zmienia tryb działania. Zamiast pojawiać się po lewej stronie, drawer po rozwinięciu zajmuje 100% szerokości ekranu, co znacznie poprawia wygodę korzystania z menu na małych wyświetlaczach.
 
Dodatkowo w celu zachowania dobrych praktych TS i estetycznego wygladu kodu, dodalam Prettier i ESLint.

### Co wynioslam z projektu?

Przy tworzeniu kalkulatora stanęłam przed problemem połączenia danych z dwóch osobnych endpointów. Rozwiązałam to za pomocą operatora **forkJoin**, co pozwoliło na sprawne zasilenie listy walut z różnych tabel NBP jednocześnie.
