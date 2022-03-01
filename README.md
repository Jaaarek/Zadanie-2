## Zadanie 2
0. Przeczytaj slajd o obiektach (strukturach) jak coś nie jasne to się odezwij
1. Wczytaj dane sportowców z pliku `dane.json` w folderze `input` za pomocą przygotowanej przeze mnie funkcji `readFile`. (Uwaga plik to w końcu text więc jeden wielki string, musisz wymyślić albo poszukać w necie jak go zamienić na obiekty)
2. Zaiplementuj walidację wejściowych danych, zbierz wszystkie błędy które zawiera plik i wypisz użytkownikowi. Nie procesuj dalej tych rekordów które nie przeszły walidacji. Zwróć uwagę na dozwolne wartości, na struktuę, na klucze, oraz na to że dany zawodnik może tylko raz występować w zestawieniu.
3. Przerób istaniejący kod tak aby operował na strukturach a nie zagnieżdżonych tablicach
4. Wynik działania w postaci listy obiektów:
```
{
 name: string,
 salary: number
}
```
  zapisz do pliku `pensje.json` w folderze `output` za pomocą funkcji `writeFile`. (Uwaga pamiętaj że do pliku można zapisać tylko tekst.)