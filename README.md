# Medieval-Scenery-ThreeJS-Coursework

## Table of Contents

- [Idea and Implementation](#idea-and-implementation)
- [Startup](#startup)
- [Features and installed modules](#features-and-installed-modules)
- [Deployment](#deployment)
- [Controls](#controls)
- [Presentation Images](#presentation-images)

## Idea and Implementation

The project represents an interactable medieval scenery with exported .glb models, made in Blender, and their corresponding textures (base or baked). 
All these assets are loaded with the help of the Three.js DRACOLoader, which is copied from the Three.js submodules location to the application's public directory.
The scenery is also interactable - a Three.js capsule object is created, serving as the concept for a player in a first-person mode. 
Moreover, functionalities for the player's movement in all directions and camera rotations are implemented via a DOM events handling logic. 
The philosophy behind the walk / sprint / jump mechanics can be ascribed to the precise calcultations of time deltas / vectors and matrix world updates. 
The Three.js perspective camera is set at an initial spawning position inside the virtual settlement. 
Any out-of-bounds occurrences will thence respawn the player at the preset position. The player's position coordinates are saved to the local storage and can be fetched
upon the project's restart. A CSS loader will be visible, until all asset files are successfully rendered and added to the main scene. The collision detection 
system works both for the move (slow or fast) and jump actions, for which intersections with the objects are prevented from the landscape collider. 

## Startup

As the application makes use of the Vite frontend build tool, after the cloning / download of the repository, the following commands need to be applied on an opened
cmd / code editor terminal:

```
npm install
npm run dev
```

## Features and installed modules

- TypeScript 
- vite
- vite-plugin-glsl
- Three.js with its internal WebGLRenderer
- @types/three
- Draco Decoder
- Blender models and textures
- OctreeHelper (Three example)
- Vercel (for production builds)

## Deployment

The project can be accessed on :

```
https://medieval-scenery-three-js-coursework.vercel.app/
```

## Controls

Use the following keys, in order to move around the medieval scenery:

- WASD - walk in forward, left, backward and right directions respectively
- W + Left Shift - sprint
- Space bar - jump
- Esc - lock / unlock pointer

Click with the left mouse button to start the session.

## Presentation Images

Link to the subfolder, containing images, focusing on important aspects of the project:

```
https://github.com/plamenna-petrova/Medieval-Scenery-ThreeJS-Coursework/tree/master/src/presentation-images
```
