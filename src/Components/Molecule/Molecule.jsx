import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from '../../shaders/circle.vert?raw'
import fragmentShader from '../../shaders/circle.frag?raw'
import { getInitialState, updateState } from './moleculeState'
import { useLocation } from 'react-router-dom'

const MAX_POINTS = 10

// Convert hex to THREE.Vector3 (0-1 range)
function hexToVec3(hex) {
    const n = parseInt(hex.replace('#', ''), 16)
    return new THREE.Vector3(
        (n >> 16 & 255) / 255,
        (n >> 8 & 255) / 255,
        (n & 255) / 255
    )
}

// Create padded arrays for uniforms
function createPaddedArrays(spheres) {
    const colors = []
    const positions = []
    for (let i = 0; i < MAX_POINTS; i++) {
        if (i < spheres.length) {
            const s = spheres[i].lastState
            colors.push(hexToVec3(s.color))
            positions.push(new THREE.Vector3(...s.position))
        } else {
            colors.push(new THREE.Vector3(0, 0, 0))
            positions.push(new THREE.Vector3(0, 0, 0))
        }
    }
    return { colors, positions }
}

// Persistent state outside component to survive re-renders
let persistentMoleculeState = null

function CirclePlane() {
    const meshRef = useRef()
    const { viewport } = useThree()

    // Initialize persistent state only once
    if (!persistentMoleculeState) {
        persistentMoleculeState = getInitialState()
    }

    const moleculeState = useRef(persistentMoleculeState)

    // Create uniforms once with padded arrays
    const { colors, positions } = createPaddedArrays(moleculeState.current.spheres)
    const uniforms = useRef({
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
        uTime: { value: 0 },
        uPointCount: { value: moleculeState.current.spheres.length },
        uColors: { value: colors },
        uPositions: { value: positions },
    })

    // Sync state to existing uniform vectors (mutate, don't replace)
    function syncToUniforms(state, uniforms) {
        uniforms.uPointCount.value = state.spheres.length
        state.spheres.forEach((sphere, i) => {
            const s = sphere.lastState;
            const color = hexToVec3(s.color)
            uniforms.uColors.value[i].copy(color)
            uniforms.uPositions.value[i].set(...s.position)
        })
    }

    useFrame((state, delta) => {
        const { pointer, clock } = state
        delta = Math.min(0.02, delta)
        // 1. Update state
        uniforms.current.uTime.value = clock.elapsedTime
        const uPointer = new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2)
        moleculeState.current = updateState(moleculeState.current, uniforms.current.uTime.value, delta, uPointer)

        // Keep persistent state in sync
        persistentMoleculeState = moleculeState.current

        // 2. Sync to shader (mutate existing uniforms)
        uniforms.current.uMouse.value.copy(uPointer)
        uniforms.current.uResolution.value.set(viewport.width, viewport.height)
        syncToUniforms(moleculeState.current, uniforms.current)
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                uniforms={uniforms.current}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
            />
        </mesh>
    )
}

function Molecule() {
    const location = useLocation()
    const { pathname } = location
    const isDisplay = pathname === '/' || pathname === '/molecule'
    return (
        <div style={{
            display: !isDisplay && 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1,
            pointerEvents: 'none',

        }}>
            <Canvas  orthographic camera={{ zoom: 100, position: [0, 0, 1] }}>
                <CirclePlane />
            </Canvas>
        </div>
    )
}

export default Molecule;
