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
        console.log('from experience');
        console.log(this.localStorage);
        this.setResources();
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

    setScene(): void {
        this.scene = new THREE.Scene();
    }

    setCamera(): void {
        this.camera = new Camera();
        console.log('camera');
        console.log(this.camera);
    }

    setRenderer(): void {
        this.renderer = new Renderer();
        console.log('renderer');
        console.log(this.renderer);
    }

    setLocalStorage(): void {
        this.localStorage = new LocalStorage();
        console.log('local storage');
        console.log(this.localStorage);
    }

    setResources(): void {
        this.resources = new Resources(assets);
        console.log('resources');
        console.log(this.resources);
    }

    setWorld(): void {
        this.world = new World();
        this.world.localStorage = this.localStorage;
        this.world.playerState = this.localStorage.playerState;
        this.world.resources = this.resources;
        this.world.resources.determineLoad(this.world.playerState.location);
        this.world.resources.on('ready', () => {
            console.log('test resources loading');
            const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
            const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
        });
        console.log('the worldo');
        console.log(this.world);
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