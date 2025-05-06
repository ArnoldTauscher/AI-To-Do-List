import { useState } from "react";
import { Todo } from "../types";
import "./Todo.css";

// Definiert die Props, die die TodoCard-Komponente erwartet
type Props = {
    todo: Todo; // Das einzelne Todo-Objekt
    index: number; // Index des Todos in der Liste
    onDeleteTodo: (id: string) => void; // Funktion zum Löschen des Todos
    onAddNote: (todoId: string, note: string) => void; // Funktion zum Hinzufügen einer Notiz
    onDeleteNote: (todoId: string, noteIndex: number) => void; // Funktion zum Löschen einer Notiz
    onUpdateStatus: (todoId: string, newStatus: string) => void; // Funktion zum Aktualisieren des Status
}

// Komponente, die eine einzelne Todo-Karte darstellt
export const TodoCard = ({ todo, index, onDeleteTodo, onAddNote, onDeleteNote, onUpdateStatus }: Props) => {
    // State für das Eingabefeld einer neuen Notiz
    const [newNote, setNewNote] = useState("");

    // Handler zum Hinzufügen einer Notiz, ruft die übergebene Funktion auf und leert das Eingabefeld
    const handleAddNote = (todoId: string, note: string) => {
        if (note.trim() !== "") {
            onAddNote(todoId, note.trim());
            setNewNote("");
        }
    }

    return (
        // Hauptcontainer der Todo-Karte, erhält eine spezielle Klasse, wenn das Todo erledigt ist
        <div className={`todo-card ${todo.status === 'erledigt' ? 'todo-done' : ''}`} key={index}>
            <div className="todo-info">
                {/* Titel und Metainformationen des Todos */}
                <h4>{todo.title}</h4>
                <p>Erstellt am: {todo.createDate.toLocaleDateString()}</p>
                <p>Priorität: {todo.priority}</p>
                <p>Status:&nbsp;
                    {/* Dropdown zum Ändern des Status */}
                    <select 
                        value={todo.status} 
                        onChange={(e) => onUpdateStatus(todo.id, e.target.value)}
                    >
                        <option value="offen">Offen</option>
                        <option value="in Bearbeitung">In Bearbeitung</option>
                        <option value="erledigt">Erledigt</option>
                    </select>
                </p>
                {/* Anzeige des Abschlussdatums, falls erledigt */}
                {todo.status === 'offen' && todo.completedDate && (
                    <p>Abgeschlossen am: {todo.completedDate.toLocaleDateString()}</p>
                )}
            </div>

            {/* Bereich für Notizen */}
            <div className="notes-section">
                <h4>Notizen:</h4>
                <ul>
                    {/* Liste aller Notizen mit Lösch-Button */}
                    {todo.notes.map((note, noteIndex) => (
                        <li key={noteIndex} className="note">
                            {note}
                            <button className="delete-button" onClick={() => onDeleteNote(todo.id, noteIndex)}>X</button>
                        </li>
                    ))}
                </ul>
                {/* Formular zum Hinzufügen einer neuen Notiz */}
                <div className="note-form">
                    <input 
                        type="text"
                        className="note-input" 
                        value={newNote} 
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Neue Notiz hinzufügen"
                    />
                    <button
                        className="add-note-button"
                        onClick={() => handleAddNote(todo.id, newNote)}
                    >
                        Notiz hinzufügen
                    </button>
                </div>
            </div>

            {/* Button zum Löschen des gesamten Todos */}
            <div className="delete-section">
                <button className="delete-button" onClick={() => onDeleteTodo(todo.id)}>Todo löschen</button>
            </div>
        </div>
    )
}