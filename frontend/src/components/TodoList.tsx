import { Todo } from "../types";
import { TodoCard } from "./Todo";

// Definiert die Props, die die TodoList-Komponente erwartet
type Props = {
    todos: Todo[]; // Liste aller Todos
    onDeleteTodo: (id: string) => void; // Funktion zum Löschen eines Todos
    onAddNote: (todoId: string, note: string) => void; // Funktion zum Hinzufügen einer Notiz zu einem Todo
    onDeleteNote: (todoId: string, noteIndex: number) => void; // Funktion zum Löschen einer Notiz eines Todos
    onUpdateStatus: (todoId: string, newStatus: string) => void; // Funktion zum Aktualisieren des Status eines Todos
}

// Komponente, die eine Liste von TodoCards rendert
export const TodoList = ({ todos, onDeleteTodo, onAddNote, onDeleteNote, onUpdateStatus }: Props) => {
    return (
        <div className="todo-card-container">
            {/* Für jedes Todo wird eine TodoCard-Komponente gerendert */}
            {todos && todos.map((todo, index) => <TodoCard
                key={index}
                todo={todo}
                index={index}
                onDeleteTodo={onDeleteTodo}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                onUpdateStatus={onUpdateStatus}
            />)}
        </div>
    )
}