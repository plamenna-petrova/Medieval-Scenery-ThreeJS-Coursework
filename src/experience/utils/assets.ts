
export const assets = [
    {
        settlement: {
            assets: [
                {
                    name: "land",
                    type: "glbModel",
                    path: "../../assets/models/land_w_collider.glb",
                },
                {
                    name: "items",
                    type: "glbModel",
                    path: "../../assets/models/land_items.glb",
                },
                {
                    name: "buildings",
                    type: "glbModel",
                    path: "../../assets/models/buildings.glb",
                },
                {
                    name: "interactions",
                    type: "glbModel",
                    path: "../../assets/models/outside_interactions.glb",
                },
                {
                    name: "walls",
                    type: "glbModel",
                    path: "../../assets/models/walls.glb",
                },
                {
                    name: "buildings_texture",
                    type: "imageTexture",
                    path: "../../assets/textures/buildings.webp",
                },
                {
                    name: "items_texture",
                    type: "imageTexture",
                    path: "../../assets/textures/items.webp",
                },
                {
                    name: "land_texture",
                    type: "imageTexture",
                    path: "../../assets/textures/land.webp",
                },
                {
                    name: "walls_texture",
                    type: "imageTexture",
                    path: "../../assets/textures/walls_baked.webp",
                },
                {
                    name: "skyBoxTexture",
                    type: "cubeTexture",
                    path: [
                        "../../assets/textures/skybox/px.webp",
                        "../../assets/textures/skybox/nx.webp",
                        "../../assets/textures/skybox/py.webp",
                        "../../assets/textures/skybox/ny.webp",
                        "../../assets/textures/skybox/pz.webp",
                        "../../assets/textures/skybox/nz.webp",
                    ],
                },
            ],
        },
        castleInterior: {
            assets: [
                {
                    name: "castle",
                    type: "glbModel",
                    path: "../../assets/models/interior_w_collider.glb",
                },
                {
                    name: "interactions",
                    type: "glbModel",
                    path: "../../assets/models/interior_interactions.glb",
                },
                {
                    name: "castle_texture",
                    type: "imageTexture",
                    path: "../../assets/textures/interior_baked.webp",
                },
            ],
        },
    }, 
];