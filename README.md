# BudgetApp

## Wprowadzenie
BudgetApp to aplikacja backendowa napisana w Javie, przeznaczona do zarządzania budżetem osobistym lub domowym. Umożliwia dodawanie transakcji, generowanie raportów finansowych, definiowanie i śledzenie celów finansowych oraz kategoryzację transakcji na różne typy, takie jak jedzenie, subskrypcje i elektronika. Aplikacja została zbudowana przy użyciu Spring Boot i wykorzystuje architekturę warstwową z kontrolerami, serwisami i warstwą bazy danych.

## Wymagania
Przed rozpoczęciem upewnij się, że masz zainstalowane następujące elementy w swoim systemie:
- Java 11 lub nowsza
- Maven 3.6 lub nowszy
- Dowolne IDE (np. IntelliJ IDEA, Eclipse)

## Pierwsze kroki

### Konfiguracja projektu
1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/w65458/budget.git
2. Przejdź do katalogu projektu:
   ```bash
   cd budget
3. Uruchom projekt:
   * Za pomocą Maven:
      ```bash
       mvn spring-boot:run
   * Za pomocą IDE:
     - Uruchom klasę `BudgetApplication` w swoim IDE.
     

4. Otwórz przeglądarkę i przejdź do adresu `http://localhost:8080`.

## Korzystanie z konsoli bazy danych H2
Aby uzyskać dostęp do konsoli H2 i zarządzać bazą danych w pamięci:

Otwórz przeglądarkę internetową i przejdź do http://localhost:8080/h2-console
Użyj następującego adresu URL JDBC: jdbc:h2:mem:testdb, nazwa użytkownika sa i pozostaw puste hasło.

## Dokumentacja API
Po uruchomieniu aplikacji możesz sprawdzić dokumentację API, przechodząc do http://localhost:8080/swagger-ui.html.
