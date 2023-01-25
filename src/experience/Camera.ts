
import * as THREE from "three";
import { Experience } from './Experience';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sizes } from "./utils/Sizes";

export default class Camera {
    experience!: Experience;
    sizes!: Sizes;
    scene!: THREE.Scene;
    canvas?: HTMLCanvasElement;
    params: { [key: string]: number };
    perspectiveCamera!: THREE.PerspectiveCamera;
    controls!: OrbitControls;

    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.params = {
            fov: 75,
            aspect: this.sizes.aspect,
            near: 0.01,
            far: 1000,
        };

        this.setPerspectiveCamera();
        this.setOrbitControls();
    }

    setPerspectiveCamera(): void {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            this.params.fov,
            this.params.aspect,
            this.params.near,
            this.params.far
        );

        this.perspectiveCamera.position.set(12.64, 1.7, 64.0198);

        this.scene.add(this.perspectiveCamera);
    }

    setOrbitControls(): void {
        this.controls = new OrbitControls(this.perspectiveCamera as THREE.Camera, this.canvas);
        this.controls.enableDamping = true;
    }

    onResize(): void {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update(): void {
        this.controls.update();
    }
}