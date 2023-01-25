
export class Time {
    start: number;
    current: number;
    elapsed: number;
    delta: number;

    constructor() {
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
    }

    update(): void {
        const currentTime: number = Date.now();
        this.delta = (currentTime - this.current) / 1000;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
    }
}