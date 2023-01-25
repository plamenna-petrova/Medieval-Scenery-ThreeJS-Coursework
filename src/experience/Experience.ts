import * as THREE from 'three';
import Camera from './Camera';
import { LocalStorage } from './LocalStorage';
import { Renderer } from './Renderer';
import { Resources } from './utils/Resources';

import { Sizes } from "./utils/Sizes";
import { Time } from "./utils/Time";

import { assets } from './utils/assets';
import { World } from './world/World';

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
    world!: World;

    constructor(canvas: HTMLCanvasElement) {
        if (Experience.instance) {
            return Experience.instance;
        }

        Experience.instance = this;

        this.canvas = canvas;

        this.sizes = new Sizes();
        this.time = new Time();

        this.setLocalStorage();
        this.setWorld();

        this.sizes.on('resize', () => {
            this.onResize();
        });

        this.update();
    }

    public static getInstance(): Experience {
        const canvasExperienceHTMLElement =
            document.querySelector('canvas.experience-canvas') as HTMLCanvasElement;

        if (!Experience.instance) {
            Experience.instance = new Experience(canvasExperienceHTMLElement);
        }

        return Experience.instance;
    }

    setRenderer(): void {
        this.renderer = new Renderer();
    }

    setLocalStorage(): void {
        this.localStorage = new LocalStorage();
    }

    setWorld(): void {
        this.resources = new Resources(assets)
        this.world = new World();
        this.world.localStorage = this.localStorage;
        this.world.playerState = this.localStorage.playerState;
        this.world.resources = this.resources;
        this.scene = new THREE.Scene();
        this.world.scene = this.scene;
        this.world.resources.determineLoad(this.world.playerState.location);
        this.world.onReadyResouces();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.renderer.camera = this.camera;
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