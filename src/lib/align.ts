/**
 * Lining a heading up with its link in a sticky list (the case study table of contents, the homepage process steps),
 * so the two read as one line.
 */

// Where a line of text sits: the middle of its first line
export const firstLineMiddle = (el: Element) => el.getBoundingClientRect().top + parseFloat(getComputedStyle(el).lineHeight) / 2

// Scroll so `heading` sits level with `label`, a line inside the sticky element `sticky`. Measured where the label will be
// once `sticky` is stuck, which it may not be yet near the top of the page. `shift`: how far the heading still has to move
// on its own (a scroll reveal partway through), so it lines up where it lands.
export function alignWith(heading: Element, label: Element, sticky: Element, behavior: ScrollBehavior, shift = 0) {
  const stuckTop = parseFloat(getComputedStyle(sticky).top)
  const labelWhenStuck = stuckTop + (firstLineMiddle(label) - sticky.getBoundingClientRect().top)
  window.scrollTo({ top: window.scrollY + firstLineMiddle(heading) + shift - labelWhenStuck, behavior })
}
