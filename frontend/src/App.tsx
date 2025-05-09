import { useCollection, useQuery } from '@squidcloud/react';
import './App.css';
import { AddTodo } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import AskAI from './components/AskAI';
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const collection = useCollection<Todo>('todos');
  // Hole alle Todos aus der Datenbank und speichere sie in der Variable "todos"
  const todos = useQuery(collection.query());

  // Hilfsfunktion, um ein Todo zu finden, das bearbeitet werden soll (z. B. um eine Notiz hinzuzufügen oder zu löschen)
  const findTodoToModify = (id: string) => {
    return todos.data.find((todos) => todos.data.id === id);
  };

  // Todo löschen
  const onDeleteTodo = (id: string) => {
    // Finde das zu löschende Todo
    const todo = findTodoToModify(id);
    // Lösche das Todo aus der Datenbank
    if (todo) todo.delete();
  };

  // Status eines Todos aktualisieren
  const onUpdateStatus = (todoId: string, newStatus: string) => {
    const todo = findTodoToModify(todoId);
    if (!todo) return;
    const updates: Partial<Todo> = { status: newStatus as Todo['status'] };
    if (newStatus === 'erledigt' && todo.data.status !== 'erledigt') {
        updates.completedDate = new Date();
    }
    todo.update(updates);
  };

  // Notiz zu einem Todo hinzufügen
  const onAddNote = (todoId: string, note: string) => {
    // Finde das Todo, zu dem die Notiz hinzugefügt werden soll
    const todo = findTodoToModify(todoId);
    if (!todo) return;
    const notes = todo.data.notes;
    notes.push(note);
    // Aktualisiere das Todo mit der neuen Notiz
    todo.update({ notes: notes });
  };

  // Notiz von einem Todo löschen
  const onDeleteNote = (todoId: string, noteIndex: number) => {
    const todo = findTodoToModify(todoId);
    if (!todo) return;
    const notes = todo.data.notes;
    // Aktualisiere das Todo ohne die gelöschte Notiz
    todo.update({ notes: notes.filter((_, index) => index !== noteIndex) });
  };

  return (
    <div className="app-container">
      <AskAI />
      <AddTodo />
      {/* Zeige einen Ladeindikator, solange die Daten geladen werden */}
      {todos.loading ? (
        <LoadingIndicator />
      ) : (
        <TodoList
          todos={todos.data.map((todo) => todo.data)}
          onDeleteTodo={onDeleteTodo}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
}

export default App;