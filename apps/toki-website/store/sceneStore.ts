import { create } from 'zustand'

export type SceneMode = 'immersive' | 'content'

export interface SceneAlphaTargets {
  grid: number
  train: number
  wireframe: number
}

const ALPHA_TARGETS: Record<SceneMode, SceneAlphaTargets> = {
  immersive: { grid: 0.1, train: 1.0, wireframe: 0.08 },
  content: { grid: 0, train: 0, wireframe: 0 },
}

interface SceneStore {
  mode: SceneMode
  targets: SceneAlphaTargets
  setMode: (mode: SceneMode) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  mode: 'immersive',
  targets: ALPHA_TARGETS.immersive,
  setMode: (mode) => set({ mode, targets: ALPHA_TARGETS[mode] }),
}))
