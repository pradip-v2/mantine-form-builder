export function reorder<T>(
  arr: T[],
  sourceIndex: number,
  destinationIndex: number
): T[] {
  const result = [...arr]; // Create a shallow copy to avoid mutating the original array
  const [movedItem] = result.splice(sourceIndex, 1); // Remove the item from the source index
  result.splice(destinationIndex, 0, movedItem); // Insert it at the destination index
  return result;
}
