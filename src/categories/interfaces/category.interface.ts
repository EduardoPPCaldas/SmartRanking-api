import { Document } from "mongoose";
import { Player } from "src/players/interfaces/players.interface";

export interface Category extends Document {
    readonly category: string;
    description: string;
    categoryEvents: Array<CategoryEvent>;
    players: Array<Player>;
}

export interface CategoryEvent {
    name: string;
    operation: string;
    value: number;
}