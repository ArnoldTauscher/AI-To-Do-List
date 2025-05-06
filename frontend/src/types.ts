export type Todo = {
    id: string;
    title: string;
    createDate: Date;
    completedDate: Date | null;
    status: 'offen' | 'in Bearbeitung' | 'erledigt';
    priority: 'hoch' | 'mittel' | 'niedrig';
    notes: string[];
};
