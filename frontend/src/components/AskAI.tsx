import { useState } from "react";
import { useSquid } from "@squidcloud/react";
import "./AskAI.css";
import LoadingIndicator from "./LoadingIndicator";

// Komponente, die eine Frage an eine KI stellt und die Antwort anzeigt
function AskAI() {
    // State für das Eingabefeld (Fragetext)
    const [text, setText] = useState("");
    // State für das Ergebnis (Antwort der KI)
    const [result, setResult] = useState("");
    // State für den Ladezustand
    const [loading, setLoading] = useState(false);

    // Initialisiere das SquidCloud SDK für clientseitige Funktionen
    const squid = useSquid(); // Dies ist das clientseitige SDK für die Interaktion mit SquidCloud
    
    // Wird aufgerufen, wenn der "Ask"-Button gedrückt wird
    const askPressed = async () => {
        if (!text) return; // Falls das Eingabefeld leer ist, tue nichts
        setLoading(true); // Ladeanzeige aktivieren
        const result = await squid.executeFunction("askQuestion", text); // Rufe die Serverfunktion "askQuestion" mit dem eingegebenen Text auf
        setResult(result); // Speichere die erhaltene Antwort
        setText(""); // Leere das Eingabefeld
        setLoading(false); // Ladeanzeige deaktivieren
    };

    // Schließt das Ergebnisfeld
    const closeResult= () => {
        setResult("");
    }

    return (
        <div className="ask-ai-container">
            <h3>Stelle eine Frage an die KI zu den Todos!</h3>
            <p>(Englische Fragen bearbeitet die KI effizienter.)</p>
            {/* Eingabefeld für die Frage */}
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {/* Zeige Ladeanzeige oder Button, je nach Zustand */}
            {loading ? <LoadingIndicator /> : <button onClick={askPressed}>Fragen</button>}
            {/* Zeige das Ergebnis, wenn vorhanden */}
            {result && <div className="result-container">
                <textarea value={result} readOnly rows={4} />
                <button onClick={closeResult} className="close-button">Schließen</button>
            </div> }
        </div>
    )
}

export default AskAI;
