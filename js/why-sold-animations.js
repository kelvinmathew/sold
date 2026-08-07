document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('ws-cards-stack');
  if (!stack) return;

  const cards = stack.querySelectorAll('.ws-info-card');
  if (cards.length !== 3) return;

  let activeIdx = 0;

  setInterval(() => {
    let prevActive = activeIdx;
    activeIdx = (activeIdx + 1) % 3;
    let waitingIdx = (activeIdx + 1) % 3;

    let waitingCard = cards[waitingIdx];

    // If on desktop where animations apply, warp the card from tucked to waiting invisibly
    if (window.innerWidth >= 992) {
      waitingCard.classList.remove('ws-card-tucked');
      waitingCard.classList.add('ws-card-hidden');

      // Force reflow to apply the hidden warp immediately without transition
      void waitingCard.offsetWidth;

      waitingCard.classList.remove('ws-card-hidden');
      waitingCard.classList.add('ws-card-waiting');
    } else {
      waitingCard.classList.remove('ws-card-tucked', 'ws-card-hidden');
      waitingCard.classList.add('ws-card-waiting');
    }

    // Set the new active card
    cards[activeIdx].classList.remove('ws-card-waiting', 'ws-card-tucked', 'ws-card-hidden');
    cards[activeIdx].classList.add('ws-card-active');

    // Set the previously active card to tucked
    cards[prevActive].classList.remove('ws-card-active', 'ws-card-waiting', 'ws-card-hidden');
    cards[prevActive].classList.add('ws-card-tucked');

  }, 4000);
});
