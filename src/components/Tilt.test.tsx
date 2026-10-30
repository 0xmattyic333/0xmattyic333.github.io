import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tilt from './Tilt'
import { mockMedia, resetMedia } from '../test/media'

afterEach(resetMedia)

function setup() {
  const onClick = vi.fn((e: Event) => e.preventDefault())
  render(
    <Tilt>
      <a href="#x" onClick={onClick as never}>
        inside
      </a>
    </Tilt>,
  )
  const wrapper = screen.getByText('inside').parentElement!
  // jsdom has no layout, so give the wrapper a size.
  wrapper.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100 }) as DOMRect
  return { wrapper, onClick }
}

it('does not tilt on touch devices', () => {
  mockMedia({ canHover: false })
  const { wrapper } = setup()
  fireEvent.pointerMove(wrapper, { clientX: 200, clientY: 50 })
  expect(wrapper.style.transform).toBe('')
})

it('does not tilt when reduced motion is preferred', () => {
  mockMedia({ canHover: true, reduceMotion: true })
  const { wrapper } = setup()
  fireEvent.pointerMove(wrapper, { clientX: 200, clientY: 50 })
  expect(wrapper.style.transform).toBe('')
})

it('leans toward the pointer and resets when it leaves', () => {
  mockMedia({ canHover: true })
  const { wrapper } = setup()
  fireEvent.pointerMove(wrapper, { clientX: 200, clientY: 50 })
  expect(wrapper.style.transform).toContain('rotateY(')
  fireEvent.pointerLeave(wrapper)
  expect(wrapper.style.transform).toBe('')
})

it('keeps links inside clickable', async () => {
  mockMedia({ canHover: true })
  const { onClick } = setup()
  await userEvent.click(screen.getByText('inside'))
  expect(onClick).toHaveBeenCalled()
})
