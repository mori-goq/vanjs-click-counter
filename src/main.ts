import van from 'vanjs-core'

import { useTimeLeft } from './useTimeLeft'

const TIME_LEFT = 10

function App() {
  const { h1, div, p, button } = van.tags

  // クリック数
  const count = van.state(0)
  // 残り時間、アクティブかどうか、スタートとリセットの関数オブジェクト
  const [timeLeft, isActiveInterval, handler] = useTimeLeft(TIME_LEFT)

  // 一秒間にクリックした回数の平均値
  const clicksPerSecond = van.derive(() => {
    return timeLeft.val === 0 ? count.val / TIME_LEFT : 0
  })

  // クリック数と残り時間をリセット
  const handleReset = () => {
    count.val = 0
    handler.reset()
  }

  return div(
    { class: 'click-counter' },
    h1({ class: 'title' }, 'VanJS Click Counter'),
    p({ class: 'text' }, 'Clicks: ', count),
    p({ class: 'text' }, 'Time Left: ', timeLeft, ' seconds'),
    p({ class: 'text' }, 'Average Clicks Per Second: ', () =>
      timeLeft.val === 0 ? clicksPerSecond.val.toFixed(2) : '',
    ),
    div(() =>
      isActiveInterval.val
        ? // アクティブの時はクリックでカウントを増やせるように
          button(
            {
              class: 'action-button',
              onclick: () => count.val++,
            },
            'Click',
          )
        : // アクティブでない時は計測スタートできるように
          button(
            {
              class: 'action-button',
              onclick: () => handler.start(),
              disabled: () => timeLeft.val === 0,
            },
            'Start',
          ),
    ),
    button(
      {
        class: 'reset-button',
        disabled: isActiveInterval,
        onclick: () => handleReset(),
      },
      'Reset',
    ),
  )
}

van.add(document.getElementById('app')!, App())
