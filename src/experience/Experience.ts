import * as THREE from 'three';

import { Sizes } from "./utils/Sizes";
import { Time } from "./utils/Time";

export class Experience {
    static instance: Experience;
    canvas!: HTMLCanvasElement;
    sizes!: Sizes;
    time!: Time;
    scene!: THREE.Scene;

    constructor (canvas: HTMLCanvasElement) {
        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;
        this.canvas = canvas;

        this.sizes = new Sizes();
        this.time = new Time();

        this.sizes.on('resize', () => {
            this.onResize();
        });
    }

    setScene(): void {
        this.scene = new THREE.Scene();
    }

    setCamera(): void {

    }

    setRenderer(): void {

    }

    setLocalStorage(): void{

    }

    setResources(): void {

    }

    setWorld(): void {
        
    }

    onResize(): void {

    }
}