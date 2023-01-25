import { EventEmitter } from 'events';

export class Sizes extends EventEmitter {
    width!: number;
    height!: number;
    aspect!: number;
    pixelRatio!: number;

    constructor() {
        super();
        this.handleSizes();
        window.addEventListener('resize', () => {
            this.handleSizes();
            this.emit('resize');
        });
    }

    handleSizes(): void {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    }
}