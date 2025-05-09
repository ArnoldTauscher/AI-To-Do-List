# KI-gestützte To-Do-Liste mit SquidCloud

Dieses Projekt ist eine **React + TypeScript**-Anwendung, die mit **SquidCloud** integriert ist, um eine To-Do-Liste zu verwalten. Benutzer können Aufgaben hinzufügen, aktualisieren und löschen sowie eine KI nutzen, um Fragen zu ihren Aufgaben zu stellen.

## Funktionen

- **Aufgaben hinzufügen, aktualisieren und löschen**: Einfache Verwaltung von Aufgaben.
- **Prioritäts- und Statusverwaltung**: Prioritäten zuweisen und den Status von Aufgaben aktualisieren.
- **Notizen für Aufgaben**: Notizen zu einzelnen Aufgaben hinzufügen und löschen.
- **KI-Integration**: Fragen zur To-Do-Liste an eine KI stellen, die SquidCloud-Serverfunktionen nutzt.
- **Echtzeit-Datenbank**: Nahtlose Datenverwaltung mit SquidCloud.

## Projektstruktur

```
src/
├── App.tsx                   # Hauptlogik der Anwendung
├── App.css
├── main.tsx                  # Einstiegspunkt der Anwendung
├── components/               # Wiederverwendbare Komponenten
│   ├── AddTodoForm.tsx       # Formular zum Hinzufügen von Aufgaben
│   ├── AddTodoForm.css
│   ├── AskAI.tsx             # KI-Integration für Fragen
│   ├── AskAI.css
│   ├── LoadingIndicator.tsx  # Ladeindikator für Ladezustände
│   ├── LoadingIndicator.css
│   ├── Todo.tsx              # Darstellung einzelner Aufgaben
│   ├── Todo.css
│   ├── TodoList.tsx          # Liste aller Aufgaben
├── types.ts                  # Definition der Typen (z. B. Todo)
├── index.css
```

### Wichtige Dateien

- **`App.tsx`**: Enthält die Hauptlogik der Anwendung und die Integration mit SquidCloud.
- **`components/`**: Beinhaltet wiederverwendbare Komponenten wie `AddTodoForm`, `TodoList` und `AskAI`.
- **`main.tsx`**: Einstiegspunkt der Anwendung, der die SquidCloud-Konfiguration enthält.

## Erste Schritte

### Voraussetzungen

- **Node.js** (Version 16 oder höher)
- **npm** oder **yarn**
- Ein SquidCloud-Konto mit einer konfigurierten App.

### Installation

1. Repository klonen:

   ```bash
   git clone https://github.com/ArnoldTauscher/AI-To-Do-List
   cd ai-todo-list
   ```

2. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

3. Umgebungsvariablen einrichten:

   Erstelle eine `.env.local`-Datei im Projektverzeichnis und füge folgende Variablen hinzu:

   ```
   VITE_SQUID_APP_ID=deine-app-id
   VITE_SQUID_REGION=deine-region
   VITE_SQUID_ENVIRONMENT_ID=deine-umgebungs-id
   ```

### Anwendung starten

- Entwicklungsserver starten:

  ```bash
  npm run dev
  ```

- Öffne deinen Browser und navigiere zu `http://localhost:5173`.

### Für Produktion bauen

Um die Anwendung für die Produktion zu bauen:

```bash
npm run build
```

Die gebauten Dateien befinden sich im `dist/`-Verzeichnis.

## Komponentenübersicht

### `AddTodoForm`

- Ermöglicht das Hinzufügen neuer Aufgaben mit Titel, Status und Priorität.
- Nutzt SquidClouds `useCollection`, um Aufgaben in die Datenbank einzufügen.

### `TodoList`

- Zeigt eine Liste von Aufgaben an.
- Nutzt `TodoCard`, um Aktionen wie Statusaktualisierung oder Notizlöschung zu handhaben.

### `AskAI`

- Bietet eine Schnittstelle, um KI-Fragen zu Aufgaben zu stellen.
- Nutzt SquidClouds `executeFunction`, um serverlose Funktionen aufzurufen.

### `LoadingIndicator`

- Ein einfacher Ladeindikator für Ladezustände.

## Technologien

- **React**: Frontend-Bibliothek für Benutzeroberflächen.
- **TypeScript**: Statisch typisierte Sprache für bessere Entwicklererfahrung.
- **Vite**: Schnelles Build-Tool für moderne Webprojekte.
- **SquidCloud**: Backend-as-a-Service für Echtzeitdaten und serverlose Funktionen.

## Umgebungsvariablen

| Variable                    | Beschreibung                         |
|-----------------------------|--------------------------------------|
| `VITE_SQUID_APP_ID`         | Deine SquidCloud-App-ID              |
| `VITE_SQUID_REGION`         | Region deiner SquidCloud-App         |
| `VITE_SQUID_ENVIRONMENT_ID` | Umgebungs-ID für SquidCloud          |

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe die [LICENSE](LICENSE)-Datei für Details.

## Danksagungen

- [SquidCloud](https://squidcloud.io) für die Bereitstellung der Backend-Dienste.
- [Vite](https://vitejs.dev) für die schnelle Entwicklungsumgebung.
- [React](https://reactjs.org) für das UI-Framework.
```