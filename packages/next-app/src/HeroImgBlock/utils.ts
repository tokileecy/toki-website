export const getDuration = (
  fromPos: THREE.Vector3,
  toPos: THREE.Vector3,
  speed: number
): number => {
  const distance = fromPos.distanceTo(toPos)
  return distance / speed
}
