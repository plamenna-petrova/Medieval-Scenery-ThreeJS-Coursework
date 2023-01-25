import * as THREE from "three";
import Camera from "./Camera";
import { Experience } from "./Experience";
import { Sizes } from "./utils/Sizes";

export default class Renderer {
    experience!: Experience;
    sizes!: Sizes;
    scene!: THREE.Scene;
    canvas?: HTMLCanvasElement;
    camera!: Camera;
    renderer!: THREE.WebGLRenderer;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.setRenderer();
    }

    setRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    onResize(): void {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(): void {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
    }
}