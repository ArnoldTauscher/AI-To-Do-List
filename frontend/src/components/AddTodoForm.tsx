import { useState } from "react";
import { useCollection } from "@squidcloud/react";
import { Todo } from "../types";
import "./AddTodoForm.css";

// Komponente zum Hinzufügen eines neuen Todos
export const AddTodo = () => {
    // State für das Eingabefeld "Titel"
    const [title, setTitle] = useState("");
    // State für den Status des Todos
    const [status, setStatus] = useState<'offen' | 'in Bearbeitung' | 'erledigt'>("offen");
    // State für die Priorität des Todos
    const [priority, setPriority] = useState("");
    // Zugriff auf die "todos"-Collection in der Datenbank
    const todosCollection = useCollection<Todo>("todos");

    // Funktion zum Hinzufügen eines neuen Todos
    const addTodo = () => {
        // Überprüfen, ob ein Titel eingegeben wurde
        if (!title.trim()) {
            alert("Bitte geben Sie einen Titel ein.");
            return;
        }

        // Erzeuge eine eindeutige ID und das aktuelle Datum
        const todoId = crypto.randomUUID();
        const now = new Date();
        // Füge das neue Todo der Collection hinzu
        todosCollection.doc(todoId).insert({
            id: todoId,
            title: title,
            createDate: now,
            completedDate: null,
            status: status,
            priority: priority === "hoch" || priority === "mittel" || priority === "niedrig" ? priority : "niedrig",
            notes: [],
        })

        // Setze das Formular zurück
        setTitle("");
        setStatus("offen");
        setPriority("");
    }

    return (
        <div className="todo-form-container">
            <h3>Todo hinzufügen</h3>
            <div className="todo-form">
            <div className="todo-form-inputs">
                {/* Eingabefeld für den Titel */}
                    <input
                        type="text"
                        placeholder="Titel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {/* Dropdown für den Status */}
                    <select value={status} onChange={(e) => setStatus(e.target.value as 'offen' | 'in Bearbeitung' | 'erledigt')}>
                        <option value="offen">Offen</option>
                        <option value="in Bearbeitung">In Bearbeitung</option>
                        <option value="erledigt">Erledigt</option>
                    </select>
                    {/* Dropdown für die Priorität */}
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Priorität wählen...</option>
                        <option value="hoch">Hoch</option>
                        <option value="mittel">Mittel</option>
                        <option value="niedrig">Niedrig</option>
                    </select>
                </div>
                {/* Button zum Hinzufügen des Todos */}
                <button onClick={addTodo}>Todo hinzufügen</button>
            </div>
        </div>
    )
}


