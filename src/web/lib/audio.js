
export function play(url) {
  // const audio = document.createElement('audio')
  const audio = new Audio()
  audio.src = url
  audio.play()
}
