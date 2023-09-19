import van from 'vanjs-core'

export const useTimeLeft = (initialNumber: number) => {
  const intervalId = van.state(0)
  // 残り時間
  const timeLeft = van.state(initialNumber)
  // アクティブかどうか
  const isActiveInterval = van.state(false)

  // 残り時間が0になったら、setIntervalを止める
  van.derive(() => {
    if (timeLeft.val === 0) {
      clearInterval(intervalId.val)
      isActiveInterval.val = false
    }
  })

  // スタート
  const start = () => {
    isActiveInterval.val = true

    // １秒毎に残り時間を減らす
    intervalId.val = setInterval(() => {
      timeLeft.val--
    }, 1000)
  }

  // リセット
  const reset = () => {
    timeLeft.val = initialNumber
    isActiveInterval.val = false
  }

  return [
    timeLeft,
    isActiveInterval,
    {
      start,
      reset,
    },
  ] as const
}
