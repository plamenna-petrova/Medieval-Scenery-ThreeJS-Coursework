import * as THREE from 'three';
import { EventEmitter } from "events";
import { Group, Texture } from "three";
import { LocalStorage } from "../LocalStorage";
import { Resources } from "../utils/Resources";

export class World extends EventEmitter {
    resources!: Resources;
    localStorage!: LocalStorage;
    playerState!: { [key: string]: string | number };
    landscape!: Group;
    landscapeTexture!: Texture;
    scene!: THREE.Scene;

    constructor() {
        super();
    }

    onReadyResouces(): void {
        this.resources.on('ready', () => {
            this.setMaterials();
        });
    }

    setMaterials(): void {
        this.landscape = this.resources.items.settlement.landscape.scene;
        this.landscapeTexture = this.resources.items.settlement.landscapeTexture;

        this.landscapeTexture.flipY = false;
        this.landscapeTexture.encoding = THREE.sRGBEncoding;

        console.log('landscape children');
        console.log(this.landscape.children);

        this.landscape.children.find((child: any) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.landscapeTexture
            });
            console.log('child material');
            console.log(child.material);
        });

        this.scene.add(this.landscape);
    }
}