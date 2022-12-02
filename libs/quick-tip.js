export let clicks = 0

export const addClicks = () => {
  if (clicks >= 20) {
    clicks = 0
  } else {
    clicks++
  }
}
