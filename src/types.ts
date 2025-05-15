export interface ITask{
    id: string;
    title: string;
    done: boolean
}

export type TTaskFilter = "all" | "todo" | "done";