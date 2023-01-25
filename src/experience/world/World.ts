import { EventEmitter } from "events";
import { Experience } from "../experience";
import { LocalStorage } from "../LocalStorage";
import { Resources } from "../utils/Resources";

export class World extends EventEmitter {
    experience!: Experience;
    resources!: Resources;
    localStorage!: LocalStorage;
    playerState!: { [key: string]: string | number };

    constructor() {
        super();
        this.experience = Experience.getInstance();
    }

}