import { EventEmitter } from "events";
import Camera  from "../Camera";
import { Octree } from "three/examples/jsm/math/Octree";
import { Time } from "../utils/Time";
import * as THREE from "three";
import { Capsule } from "three/examples/jsm/math/Capsule";
import { Vector3 } from "three";

export class Player extends EventEmitter {
    time!: Time;
    camera!: Camera;
    octree!: Octree;
    player = {} as any;
    actions!: any;
    currentIntersectObject: any;
    previousIntersectObject: any;

    constructor() {
        super();
    }

    initPlayer(): void {
        this.player.body = this.camera.perspectiveCamera;

        this.player.onFloor = false;
        this.player.gravity = 60;

        this.player.spawn = {
            position: new THREE.Vector3(),
            rotation: new THREE.Euler(),
            velocity: new THREE.Vector3()
        };

        this.player.raycaster = new THREE.Raycaster();
        this.player.raycaster.far = 5;

        this.player.height = 1.7;
        this.player.position = new THREE.Vector3();
        this.player.rotation = new THREE.Euler();
        this.player.rotation.order = "YXZ";

        this.player.velocity = new THREE.Vector3();
        this.player.direction = new THREE.Vector3();

        this.player.speedMultiplier = 1.5;

        this.player.collider = new Capsule(
            new THREE.Vector3(),
            new THREE.Vector3(),
            0.35
        );
    }

    initControls(): void {
        this.actions = {};
    }

    addEventListeners(): void {
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("pointermove", this.onDesktopPointerMove);
        document.addEventListener("pointerdown", this.onPointerDown);
    }

    update(): void {
        this.updateMovement();
        this.updateRaycaster();
    }

    detectPlayerCollisions(): void {
        const result = this.octree.capsuleIntersect(this.player.collider);
        this.player.onFloor = false;

        if (result) {
            this.player.onFloor = result.normal.y > 0;

            this.player.collider.translate(
                result.normal.multiplyScalar(result.depth)
            );
        }
    }

    getForwardVector(): any {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();

        return this.player.direction;
    }

    getSideVector(): any {
        this.camera.perspectiveCamera.getWorldDirection(this.player.direction);
        this.player.direction.y = 0;
        this.player.direction.normalize();
        this.player.direction.cross(this.camera.perspectiveCamera.up);

        return this.player.direction;
    }

    spawnPlayerOutOfBounds(): void {
        const spawnPosition: Vector3 = new THREE.Vector3(12.64, 1.7 + 10, 64.0198);
        this.player.velocity = this.player.spawn.velocity;
        this.player.body.position.copy(spawnPosition);

        this.player.collider.start.copy(spawnPosition);
        this.player.collider.end.copy(spawnPosition);

        this.player.collider.end.y += this.player.height;
    }

    updateMovement(): void {
        const speed: number =
            (this.player.onFloor ? 1.75 : 0.2) *
            this.player.gravity *
            this.player.speedMultiplier;

        let speedDelta: number = this.time.delta * speed;

        if (this.actions.run) {
            speedDelta *= 1.6;
        }
        if (this.actions.forward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(speedDelta)
            );
        }
        if (this.actions.backward) {
            this.player.velocity.add(
                this.getForwardVector().multiplyScalar(-speedDelta * 0.5)
            );
        }
        if (this.actions.left) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(-speedDelta * 0.75)
            );
        }
        if (this.actions.right) {
            this.player.velocity.add(
                this.getSideVector().multiplyScalar(speedDelta * 0.75)
            );
        }

        if (this.player.onFloor) {
            if (this.actions.jump) {
                this.player.velocity.y = 30;
            }
        }

        let damping: number = Math.exp(-15 * this.time.delta) - 1;

        if (!this.player.onFloor) {
            this.player.velocity.y -= this.player.gravity * this.time.delta;
            damping *= 0.1;
        }

        this.player.velocity.addScaledVector(this.player.velocity, damping);

        const deltaPosition = this.player.velocity
            .clone()
            .multiplyScalar(this.time.delta);

        this.player.collider.translate(deltaPosition);
        this.detectPlayerCollisions();

        this.player.body.position.copy(this.player.collider.end);
        this.player.body.updateMatrixWorld();

        if (this.player.body.position.y < -20) {
            this.spawnPlayerOutOfBounds();
        }
    }

    getCameraLookAtDirectionalVector(): any {
        const direction: Vector3 = new THREE.Vector3(0, 0, -1);
        return direction.applyQuaternion(
            this.camera.perspectiveCamera.quaternion
        );
    }

    updateRaycaster() {
        this.player.raycaster.ray.origin.copy(
            this.camera.perspectiveCamera.position
        );

        this.player.raycaster.ray.direction.copy(
            this.getCameraLookAtDirectionalVector()
        );

        // const intersects = this.player.raycaster.intersectObjects(
        //     this.player.interactionObjects.children
        // );

        // if (intersects.length === 0) {
        //     this.currentIntersectObject = "";
        // } else {
        //     this.currentIntersectObject = intersects[0].object.name;
        // }

        // if (this.currentIntersectObject !== this.previousIntersectObject) {
        //     this.previousIntersectObject = this.currentIntersectObject;
        // }
    }

    private onKeyDown = (event: any): void => {
        if (document.pointerLockElement !== document.body) {
            return;
        }

        if (event.code === "KeyW") {
            this.actions.forward = true;
        }
        if (event.code === "KeyS") {
            this.actions.backward = true;
        }
        if (event.code === "KeyA") {
            this.actions.left = true;
        }
        if (event.code === "KeyD") {
            this.actions.right = true;
        }

        if (event.code === "ShiftLeft") {
            this.actions.run = true;
        }

        if (event.code === "Space") {
            this.actions.jump = true;
        }
    }

    private onKeyUp = (event: any): void => {
        if (document.pointerLockElement !== document.body) {
            return;
        }

        if (event.code === "KeyW") {
            this.actions.forward = false;
        }
        if (event.code === "KeyS") {
            this.actions.backward = false;
        }
        if (event.code === "KeyA") {
            this.actions.left = false;
        }
        if (event.code === "KeyD") {
            this.actions.right = false;
        }

        if (event.code === "ShiftLeft") {
            this.actions.run = false;
        }

        if (event.code === "Space") {
            this.actions.jump = false;
        }
    }

    private onDesktopPointerMove = (event: any): void => {
        if (document.pointerLockElement != document.body) {
            return;
        }

        this.player.body.rotation.order = this.player.rotation.order;

        this.player.body.rotation.x -= event.movementY / 500;
        this.player.body.rotation.y -= event.movementX / 500;

        this.player.body.rotation.x = THREE.MathUtils.clamp(
            this.player.body.rotation.x,
            -Math.PI / 2,
            Math.PI / 2
        );
    }

    private onPointerDown = (event: any): void => {
        if (event.pointerType === "mouse") {
            document.body.requestPointerLock();
            return;
        }
    }
}