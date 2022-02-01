export default function createRange(number: number) {
  if (!Number.isInteger(number)) {
    return []
  }
  return new Array(number)
}
