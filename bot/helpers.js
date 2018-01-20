export function superSplit(string, n) {
  return Array(Math.ceil(string.length / n))
    .fill()
    .map((a, i) => [...string].slice(i * n, i * n + n).join(""))
}

export function superArraySplit(array, n) {
  let T = array.join("\n")
  return Array(Math.ceil(T.length / n))
    .fill()
    .map((a, i) => array.slice(i * n, i * n + n).join(""))
}

export function regexSplit(string, n) {
  return string.match(new RegExp(`[\\s\\S]{1,${n}}`, "g")) || []
}
