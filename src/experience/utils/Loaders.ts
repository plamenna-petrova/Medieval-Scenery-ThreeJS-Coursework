import * as THREE from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { TextureLoader } from "three";

export class Loaders {
    loaders!: { 
        cubeTextureLoader: THREE.CubeTextureLoader, 
        gltfLoader: GLTFLoader, 
        dracoLoader: DRACOLoader,
        textureLoader: TextureLoader  
    };

    constructor() {
        this.loaders = {} as any;
        this.setLoaders();
    }

    setLoaders(): void {
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();

        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

        this.loaders.textureLoader = new THREE.TextureLoader();
    }
}