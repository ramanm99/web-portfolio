import { ScrollSmoother } from 'gsap/ScrollSmoother'

const HEADER_HEIGHT = 80

export function scrollToSection(href: string) {
  const smoother = ScrollSmoother.get()

  if (href === '#' || href === '#hero') {
    if (smoother) {
      smoother.scrollTo(0, true)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    history.pushState(null, '', location.pathname)
    return
  }

  const target = document.querySelector(href)
  if (!target) return

  if (smoother) {
    smoother.scrollTo(target, true, `top top+=${HEADER_HEIGHT}`)
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
  history.pushState(null, '', href)
}

export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  e.preventDefault()
  scrollToSection(href)
}
