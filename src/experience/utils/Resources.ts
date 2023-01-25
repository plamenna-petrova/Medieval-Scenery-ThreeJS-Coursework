import { EventEmitter } from "events";
import { TextureLoader } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Loaders } from "./Loaders";

export class Resources extends EventEmitter {
    items!: any;
    assets!: any;
    location!: any;
    loaded!: number;
    queue!: any;
    loaders!: {
        cubeTextureLoader: THREE.CubeTextureLoader,
        gltfLoader: GLTFLoader,
        dracoLoader: DRACOLoader,
        textureLoader: TextureLoader
    };

    constructor(assets: any) {
        super();

        this.items = {};
        this.assets = assets;
        this.location = null;

        this.loaders = new Loaders().loaders;
    }

    determineLoad(location: any): void {
        this.location = location;

        if (!this.items.hasOwnProperty(this.location)) {
            this.items[this.location] = {};
            this.startLoading();
        } else {
            this.emitReady();
        }
    }

    emitReady(): void {
        this.emit("ready");
    }

    startLoading(): void {
        this.loaded = 0;
        this.queue = this.assets[0][this.location].assets.length;

        for (const asset of this.assets[0][this.location].assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file: any) => {
                    this.loadSingleAsset(asset, file);
                });
            } else if (asset.type === "imageTexture") {
                this.loaders.textureLoader.load(asset.path, (file: any) => {
                    this.loadSingleAsset(asset, file);
                });
            } else if (asset.type === "cubeTexture") {
                this.loaders.cubeTextureLoader.load(asset.path, (file: any) => {
                    this.loadSingleAsset(asset, file);
                });
            }
        }
    }

    loadSingleAsset(asset: { name: string; }, file: any): void {
        this.items[this.location][asset.name] = file;
        this.loaded++;

        if (this.loaded === this.queue) {
            this.emitReady();
        }
    }
}