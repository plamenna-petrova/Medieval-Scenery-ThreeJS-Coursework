import * as THREE from 'three';
import { EventEmitter } from "events";
import { Group, Texture } from "three";
import { LocalStorage } from "../LocalStorage";
import { Resources } from "../utils/Resources";

import { Octree } from "three/examples/jsm/math/Octree";

import { Player } from './Player';
import Camera from '../Camera';
import { Time } from '../utils/Time';

export class World extends EventEmitter {
    resources!: Resources;
    localStorage!: LocalStorage;
    playerState!: { [key: string]: string | number };
    landscape!: Group;
    landscapeTexture!: Texture;
    buildings!: Group;
    buildingsTexture!: Texture;
    items!: Group;
    itemsTexture!: Texture;
    walls!: Group;
    wallsTexture!: Texture;
    skyboxTexture!: Texture;
    scene!: THREE.Scene;
    octree!: Octree;
    time!: Time;
    camera!: Camera;
    player!: Nullable<Player>;

    constructor() {
        super();
        this.octree = new Octree();
    }

    onReadyResouces(): void {
        this.player = null;

        this.resources.on('ready', () => {
            if (this.player === null) {
                this.player = new Player();
                this.player.time = this.time;
                this.player.camera = this.camera;
                this.player.octree = this.octree;
                this.player.initPlayer();
                this.player.initControls();
                this.player.addEventListeners();
            }
            this.setMaterials();
            this.setLanscapeCollider();
        });
    }

    setMaterials(): void {
        this.landscape = this.resources.items.settlement.landscape.scene;
        this.landscapeTexture = this.resources.items.settlement.landscapeTexture;
        this.landscapeTexture.flipY = false;
        this.landscapeTexture.encoding = THREE.sRGBEncoding;

        this.landscape.children.find((child: any) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.landscapeTexture
            });
        });

        this.buildings = this.resources.items.settlement.buildings.scene;
        this.buildingsTexture = this.resources.items.settlement.buildingsTexture;
        this.buildingsTexture.flipY = false;
        this.buildingsTexture.encoding = THREE.sRGBEncoding;

        this.buildings.children.find((child: any) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.buildingsTexture,
            });
        });

        this.items = this.resources.items.settlement.items.scene;
        this.itemsTexture = this.resources.items.settlement.itemsTexture;
        this.itemsTexture.flipY = false;
        this.itemsTexture.encoding = THREE.sRGBEncoding;

        this.items.children.find((child: any) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.itemsTexture,
            });
        });

        this.walls = this.resources.items.settlement.walls.scene;
        this.wallsTexture = this.resources.items.settlement.wallsTexture;
        this.wallsTexture.flipY = false;
        this.wallsTexture.encoding = THREE.sRGBEncoding;

        this.walls.children.find((child: any) => {
            child.material = new THREE.MeshBasicMaterial({
                map: this.wallsTexture,
            });
        });

        this.skyboxTexture = this.resources.items.settlement.skyBoxTexture;
        this.skyboxTexture.encoding = THREE.sRGBEncoding;

        this.scene.add(this.landscape);
        this.scene.add(this.buildings);
        this.scene.add(this.items);
        this.scene.add(this.walls);
        this.scene.background = this.skyboxTexture;
    }

    setLanscapeCollider(): void {
        const collider = this.landscape.getObjectByName('collider')! as any;
        this.octree.fromGraphNode(collider);
        collider.removeFromParent();
        collider.geometry.dispose();
        collider.material.dispose();

        // set on / off octree helper visibility
        // const helper = new OctreeHelper(this.octree, '#00FF00');
        // helper.visible = true;
        // this.scene.add(helper);
    }

    update(): void {
        if (this.player) {
            this.player.update();
        }
    }
}

export type Nullable<T> = T | null;