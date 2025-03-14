document.addEventListener('DOMContentLoaded', () => {
  const partecipanti = JSON.parse(localStorage.getItem('partecipanti')) || [];
  const slotMachine = document.getElementById('slotMachine');
  const spinBtn = document.getElementById('spinBtn');
  const result = document.getElementById('result');

  const createReel = () => {
    const reel = document.createElement('div');
    reel.className = 'reel';
    const inner = document.createElement('div');
    inner.className = 'reel-inner';

    const repetitions = 15;
    for (let i = 0; i < repetitions; i++) {
      partecipanti.forEach(name => {
        const div = document.createElement('div');
        div.className = 'slot-item';
        div.textContent = name;
        inner.appendChild(div);
      });
    }

    reel.appendChild(inner);
    return reel;
  };

  for (let i = 0; i < 3; i++) {
    slotMachine.insertBefore(createReel(), spinBtn);
  }

  let isSpinning = false;

  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    result.style.opacity = '0';
    result.classList.remove('winner');

    const itemHeight = document.querySelector('.slot-item').offsetHeight;

    const winnerIndex = Math.floor(Math.random() * partecipanti.length);
    const winner = partecipanti[winnerIndex];

    const extraCycles = 2;
    const targetIndex = (partecipanti.length * extraCycles) + winnerIndex;

    const targetPosition = -(targetIndex * itemHeight);

    const reels = document.querySelectorAll('.reel-inner');
    reels.forEach((reel) => {
      reel.style.transition = 'none';
      reel.style.transform = 'translateY(0)';

      void reel.offsetWidth;

      reel.style.transition = 'transform 8s cubic-bezier(0.1, 0.3, 0.1, 1)';
      reel.style.transform = `translateY(${targetPosition}px)`;
    });

    setTimeout(() => {
      isSpinning = false;
      result.textContent = `VINCITORE: ${winner}`;
      result.style.opacity = '1';
      result.classList.add('winner');
    }, 8000);
  });
});
