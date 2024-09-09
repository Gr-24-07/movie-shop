
export type Genre = {
    id: string;
    name: string;
    deletedDate: Date | null; 
    movies: { id: string; title: string }[];
};