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
      
      const items = [...partecipanti, ...partecipanti, ...partecipanti];
      items.forEach(name => {
        const div = document.createElement('div');
        div.className = 'slot-item';
        div.textContent = name;
        inner.appendChild(div);
      });
      
      reel.appendChild(inner);
      return reel;
    };

    for(let i = 0; i < 3; i++) {
      slotMachine.insertBefore(createReel(), spinBtn);
    }

    let isSpinning = false;
    
    spinBtn.addEventListener('click', () => {
      if (isSpinning || partecipanti.length < 2) return;
      
      isSpinning = true;
      result.style.opacity = '0';
      
      const winnerIndex = Math.floor(Math.random() * partecipanti.length);
      const winner = partecipanti[winnerIndex];
      
      const extraCycles = 2;
      const targetIndex = (partecipanti.length * extraCycles) + winnerIndex;
      const targetPosition = -(targetIndex * 200);

      const reels = document.querySelectorAll('.reel-inner');
      reels.forEach((reel) => {
        reel.style.transform = 'translateY(0)';
        void reel.offsetHeight;
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