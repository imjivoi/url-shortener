export default function toObject<T extends string | number>(arr: T[]) {
  return arr.reduce((a, v) => ({ ...a, [v]: v }), {})
}
