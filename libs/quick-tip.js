export let clicks = 0

export const addClicks = () => {
  if (clicks >= 10) {
    clicks = 0
  } else {
    clicks++
  }
}
