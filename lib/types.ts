export type userType = {
    id: string;
    email: string;
    token: string;
    total: number;
    streak: number;
    goal: number;
};

export type vocabListType = {
    id: number;
    name: string;
    len: number;
    correct: number;
    color: string;
};

export type folderType = {
    id: number;
    name: string;
    len: number;
    color: string;
};

export type wordType = {
    id: number;
    word: string;
    definition: string;
    learned: boolean;
};
