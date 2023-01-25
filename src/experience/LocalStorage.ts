import Camera from "./Camera";
import { Experience } from "./experience";

export class LocalStorage {
    experience!: Experience;
    camera!: Camera;
    medievalSceneryState!: { [key: string]: string };
    playerState!: { [key: string]: string | number };

    constructor() {
        this.experience = Experience.getInstance();
        this.camera = this.experience.camera;

        this.initPlayerState();
        this.setStateObject();
    }

    initPlayerState(): void {
        this.medievalSceneryState = {
            playerPosition: 'settlement|0|0|0',
            playerRotation: '0|0|0'
        };

        if (
            localStorage.getItem('playerPosition') &&
            localStorage.getItem('playerRotation')
        ) {
            this.medievalSceneryState.playerPosition = localStorage.getItem('playerPosition')!;
            this.medievalSceneryState.playerRotation = localStorage.getItem('playerRotation')!;
        } else {
            localStorage.setItem('playerPosition', this.medievalSceneryState.playerPosition);
            localStorage.setItem('playerRotation', this.medievalSceneryState.playerRotation);
        }
    }

    setLocation(location: string): void {
        this.medievalSceneryState.location = location;
    }

    setStateObject(): void {
        const currentPlayerPosition: string[] =
            this.medievalSceneryState.playerPosition.split('|');
        const currentPlayerRotation: string[] =
            this.medievalSceneryState.playerRotation.split('|');

        this.playerState = {
            location: currentPlayerPosition[0],
            posistionX: Number(currentPlayerPosition[1]),
            positionY: Number(currentPlayerPosition[2]),
            positionZ: Number(currentPlayerPosition[3]),
            rotationX: Number(currentPlayerRotation[0]),
            rotationY: Number(currentPlayerRotation[1]),
            rotationZ: Number(currentPlayerRotation[2])
        }
    }

    updateLocalStorage(): void {
        const playerLocation: string = this.playerState.location as string;
        const perspectiveCameraPositionX: number = this.camera.perspectiveCamera.position.x;
        const perspectiveCameraPositionY: number = this.camera.perspectiveCamera.position.y;
        const perspectiveCameraPositionZ: number = this.camera.perspectiveCamera.position.z;
        const perspectiveCameraRotationX: number = this.camera.perspectiveCamera.rotation.x;
        const perspectiveCameraRotationY: number = this.camera.perspectiveCamera.rotation.y;
        const perspectiveCameraRotationZ: number = this.camera.perspectiveCamera.rotation.z;

        localStorage.setItem(
            "playerPosition",
            `${playerLocation}|`+ 
            `${perspectiveCameraPositionX}|`+
            `${perspectiveCameraPositionY}|`+
            `${perspectiveCameraPositionZ}`
        );
        localStorage.setItem(
            "playerRotation",
            `${perspectiveCameraRotationX}|`+
            `${perspectiveCameraRotationY}|`+
            `${perspectiveCameraRotationZ}`
        );

        this.medievalSceneryState.playerPosition =
            localStorage.getItem("playerPosition")!;
        this.medievalSceneryState.playerRotation =
            localStorage.getItem("playerRotation")!;
    }

    update(): void {
        this.setStateObject();
        this.updateLocalStorage();
    }
}