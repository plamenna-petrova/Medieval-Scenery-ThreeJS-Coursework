

export class Experience {
    static instance: Experience;
    canvas?: HTMLCanvasElement;

    constructor (canvas: HTMLCanvasElement) {
        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;

        this.canvas = canvas;
    }
}