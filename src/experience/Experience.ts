import * as THREE from 'three';
import Camera from './Camera';
import { LocalStorage } from './LocalStorage';
import { Renderer } from './Renderer';
import { Resources } from './utils/Resources';

import { Sizes } from "./utils/Sizes";
import { Time } from "./utils/Time";

import { assets } from './utils/assets';

export class Experience {
    private static instance: Experience;
    canvas!: HTMLCanvasElement;
    sizes!: Sizes;
    time!: Time;
    scene!: THREE.Scene;
    camera!: Camera;
    renderer!: Renderer;
    localStorage!: LocalStorage;
    resources!: Resources;

    constructor(canvas: HTMLCanvasElement) {
        if (Experience.instance) {
            console.log('has instance');
            console.log(Experience.instance);
            return Experience.instance;
        }

        Experience.instance = this;
        this.canvas = canvas;

        this.sizes = new Sizes();
        this.time = new Time();

        this.setScene();
        this.setCamera();
        this.setRenderer();
        this.setLocalStorage();
        this.setResources();
        this.setWorld();

        this.sizes.on('resize', () => {
            this.onResize();
        });

        this.update();
    }

    public static getInstance(): Experience {
        const canvasExperienceHTMLElement = document.querySelector('canvas.experience-canvas') as HTMLCanvasElement;

        if (!Experience.instance) {
            Experience.instance = new Experience(canvasExperienceHTMLElement);
        }

        return Experience.instance;
    }

    setScene(): void {
        this.scene = new THREE.Scene();
    }

    setCamera(): void {
        this.camera = new Camera();
    }

    setRenderer(): void {
        this.renderer = new Renderer();
    }

    setLocalStorage(): void {
        this.localStorage = new LocalStorage();
    }

    setResources(): void {
        this.resources = new Resources(assets);
    }

    setWorld(): void {

    }

    onResize(): void {
        this.camera.onResize();
        this.renderer.onResize();
    }

    update() {
        if (this.camera) {
            this.camera.update();
        }
        if (this.renderer) {
            this.renderer.update();
        }
        if (this.time) {
            this.time.update();
        }

        window.requestAnimationFrame(() => {
            this.update();
        });
    }
}