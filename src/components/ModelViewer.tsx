// System Imports
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'


interface GLTFResult {
    nodes: {
        [name: string]: THREE.Mesh & { geometry: THREE.BufferGeometry }
    }
    materials: {
        [name: string]: THREE.Material
    }
}


export function ModelViewer(props: React.ComponentProps<'group'>) {

    const { nodes, materials } = useGLTF('model/bedroom.glb') as unknown as GLTFResult;
    const { camera, size } = useThree();

    const modelRef = React.useRef<THREE.Group | null>(null);
    const bed = React.useRef<THREE.Group | null>(null);

    React.useEffect(() => {
        const perspectiveCamera = camera as THREE.PerspectiveCamera

        if (size.width < 640) {
            perspectiveCamera.position.set(0, 1.75, 6);
            modelRef.current?.position.set(0, -2, -8);
            bed.current?.position.set(-32, 0, -16);
        } else if (size.width < 1024) {
            perspectiveCamera.position.set(0, 2, 10);
            modelRef.current?.position.set(0, 0, -2);
            bed.current?.position.set(-10, 0, -8);
        } else {
            perspectiveCamera.position.set(0, 5, 12);
            modelRef.current?.position.set(0, 0, 0);
            bed.current?.position.set(-2, 0, -8);
        }
        perspectiveCamera.fov = 45;
        perspectiveCamera.updateProjectionMatrix()
    }, [camera, size]);

    useFrame(() => {
    if (size.width >= 1024) {
      camera.rotation.set(Math.PI / 3, 0, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  })

    React.useEffect(() => {
        camera.lookAt(new THREE.Vector3(0, 0, 0))
    }, [camera]);


    return (
        <group {...props} dispose={null}>
            <group ref={modelRef} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={0.22}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={940}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0001.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0002.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0003.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0004.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0005.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0006.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Carpet_0007.geometry}
                            material={materials.Carpet}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Cupboards_0.geometry}
                            material={materials.Cupboards}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Emission_0.geometry}
                            material={materials.Emission}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_EndTables_0.geometry}
                            material={materials.EndTables}
                            position={[-0.01, 0, 0]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Light_0.geometry}
                            material={materials.Light}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Painting_0.geometry}
                            material={materials.Painting}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Modern_Bedroom_Structure_0.geometry}
                            material={materials.Structure}
                        />
                    </group>
                </group>
            </group>
            <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={0.25}>
                <group ref={bed} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Bedframe_LPFBXASC058Material_003.geometry}
                        material={materials.Bedframe_LPFBXASC058Material_003}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Bedsheet_LPFBXASC058Material_002.geometry}
                        material={materials.Bedsheet_LPFBXASC058Material_002}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Bottom_Duvet_LPFBXASC058Material_006.geometry}
                        material={materials.Bottom_Duvet_LPFBXASC058Material_006}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Pillows_LP1FBXASC058Default_002.geometry}
                        material={materials.Pillows_LP1FBXASC058Default_002}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Top_Duvet_LP2FBXASC058defaultMat1.geometry}
                        material={materials.Top_Duvet_LP2FBXASC058defaultMat1}
                    />
                </group>
            </group>
        </group>
    )
}
useGLTF.preload('/model/bedroom.glb');

