https://kryzys.networkmanager.pl/

Front-End dla Projektu końcowego MegaK.

OPIS APKI:
* Projekt końcowy to aplikacja do zarządzania Wyścigiem Głównym (Main Race) podczas tegorocznych Mistrzostw Polski Kurierów Rowerowych (tak, istnieje coś takiego), które organizuję w sierpniu. Zawodnicy jadąc na punkt kontrolny proszą o kod weryfikacyjny, który wpisują w apce. Poprawny odblokowuje im możliwość wpisania kodu na kolejnym punkcie. Wpisanie drugiego kodu skutkuje zamknięciem zadania, dodaniem punktów na ich konto. Niezamknięte zadania skutkują minusowymi punktami.

BACK-END:
* Repozytorium Back-Endowe znajduje się tutaj: https://github.com/xkrsx/main-race-be

WIDOKI:
* Home: link do strony głównej mistrzostw https://pcmc2023.pl/

![Screen Shot 2023-04-13 at 01 29 08](https://user-images.githubusercontent.com/98549349/231608201-6cec106e-22e6-4649-9d1f-c7a5ef802292.png)
![Screen Shot 2023-04-13 at 01 29 23](https://user-images.githubusercontent.com/98549349/231608105-ef4dff66-6001-4f6a-b5be-579a3e99fbb4.png)

* Login: strona główna aplikacji oraz docelowa po kliknięciu w 'Race' - służy logowaniu do widoku Race. Zawodnicy mogą się logować przy pomocy wybranego przez siebie numeru startowego oraz (docelowo) losowo wybranego 4-cyfrowego pinu/hasła (przykładowane dane poniżej). 

![Screen Shot 2023-04-13 at 01 30 29](https://user-images.githubusercontent.com/98549349/231608241-808e6885-a2cf-4bd4-b1fd-f79258276e74.png)

* Race: Po zalogowaniu widok na czas wyścigu: losowanie kolejnego zadania (max. 5 otwartych), lista otwartych i ukończonych zadań, krótkie info o zawodniku (numer, * imię, kategoria, punkty).

![Screen Shot 2023-04-13 at 01 33 42](https://user-images.githubusercontent.com/98549349/231608322-a2ca4df7-16a2-43f9-9d29-889dc2b5c175.png)

* Results: odświeżana na żywo (co 5 minut) lista wyników.

* Admin (w budowie): dodawanie nowych zawodników, nowych zadań, nowych punktów kontrolnych.

DZIAŁAJĄCE DANE DO LOGOWANIA (tabela 'couriers'):
![Screen Shot 2023-04-13 at 01 07 39](https://user-images.githubusercontent.com/98549349/231605610-0c581f95-41aa-4e2e-9d06-6cc22a82d724.png)

KODY WALIDACYJNE DLA ZADAŃ (tabela 'jobs'):
![Screen Shot 2023-04-13 at 01 07 25](https://user-images.githubusercontent.com/98549349/231605733-3bcec061-dfc4-43c6-854b-009d6e05866e.png)

WIDOK PRZYDZIELONEGO ZADANIA (tabela 'couriers_jobs'):
![Screen Shot 2023-04-13 at 01 07 51](https://user-images.githubusercontent.com/98549349/231607004-4f1acddf-1435-4d5a-90e5-efad4eb20aa8.png)

PROBLEMY:
* LOGOWANIE: Niestety, ze względu na sprawy rodzinne (diagnoza ostrego nowotworu w najbliższej rodzinie dwa tygodnie przed terminem końcowym) musiałem podjąć decyzję, by skupić się bardziej na projekcie, a nie etapie z Nesta. Dlatego logowanie i walidacja użytkownika jest dość banalna, ale działa. :) Podanie błędnych danych nie przepuszcza do widoku wyścigu. Błędne dane w url strony zwracają panel logowania.
docelowo chcę projekt przepisać i dodać porządne logowanie. na tę chwilę (a może nawet na tenże wyścig) to wystarcza.
* NOWE ZADANIE: najważniejsza funkcja, czyli pobieranie nowego zadania (dodawanie go do listy, bazy danych) po wrzuceniu na hosting nie działa, w przeciwieństwie do lokalnego testowania. niestety, kilkugodzinna walka z networkhostingiem sprawiła, że udało mi się uruchomić i wysłać projekt chwilę przed północą, więc nie zdążyłem już się temu przyjrzeć.
* co idzie za powyższym, jeśli nie ma zadań, nie można zrobić walidacji kodu A, który automatycznie odblokowuje input kodu B. po poprawnym uzupełnieniu kodu B zadanie trafia do zakończonych, punkty karne są odejmowane z kolumny kary, punkty zadania dodawane do kolumny punktów oraz finalnie jest liczona różnica między punktami a karami i uzupełniana w kolumnie 'sum' w tabeli zawodnicy. Aby zrobić 'demo' dodałem kilka zadań ręcznie ze strony bazy danych.
* ADMIN: w związku z sytuacją rodzinną niestety tylko rozpocząłem pracę w BE nad 'adminem', gdzie docelowo będą formularze dodawania zawodników oraz zadań. Ten widok jest na razie pusty.

ROZWÓJ:
* zaawansowane logowanie
* widok admina
* optymalizacja kodu
* RWD i mobile-first
* dwa języki: angielski i polski

PODSUMOWANIE
* Projekt końcowy na kurs, ale na pewno będę dalej nad nim pracował, zwłaszcza korygował powyższe problemy już on-line. Dodaję to, żeby nie było, że oszukuję i wysłałem projekt. Owszem, będę go sobie dłubał, ale nie dlatego, że oszukałem termin. Możliwe, że wydłubię problem zanim przejrzycie kod. :)
* Dzięki za zrozumienie i z niecierpliwością czekam na ocenę!
