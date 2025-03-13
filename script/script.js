let partecipanti = [];

function aggiungiNome() {
    const input = document.getElementById('nomeInput');
    const nome = input.value.trim();
    
    if (nome) {
        partecipanti.push(nome);
        aggiornaRiepilogo();
        input.value = '';
        input.focus();
    }
}

function rimuoviPartecipante(index) {
    partecipanti.splice(index, 1);
    aggiornaRiepilogo();
}

function rimuoviPartecipante(index) {
    const badge = document.querySelectorAll('.badge')[index];
    if (badge) {
        badge.style.animation = 'badge-out 0.3s ease forwards';
        setTimeout(() => {
            partecipanti.splice(index, 1);
            aggiornaRiepilogo();
        }, 250);
    }
}

document.getElementById('nomeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') aggiungiNome();
});

document.addEventListener('DOMContentLoaded', aggiornaRiepilogo);

function redirectToSorteggio() {
    if(partecipanti.length === 0) {
        alert('Aggiungi almeno un guidatore prima di sorteggiare!');
        return;
    }
    
    localStorage.setItem('partecipanti', JSON.stringify(partecipanti));
    window.location.href = 'sorteggio.html';
}

function aggiornaRiepilogo() {
    const riepilogoDiv = document.getElementById('riepilogoNomi');
    const messaggioVuoto = document.getElementById('messaggioVuoto');

    riepilogoDiv.innerHTML = partecipanti
        .map((nome, index) => `
            <div class="badge" style="animation: badge-in 0.3s ease">👤
                ${nome}
                <span class="remove-btn" onclick="rimuoviPartecipante(${index})">×</span>
            </div>
        `).join('');

    messaggioVuoto.style.display = partecipanti.length > 0 ? 'none' : 'block';
    
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('animationend', (e) => {
            if (e.animationName === 'badge-out') {
                badge.remove();
            }
        });
    });
    
    const sorteggiaBtn = document.getElementById('sorteggiaBtn');
    sorteggiaBtn.disabled = partecipanti.length === 0;
}

document.addEventListener('DOMContentLoaded', () => {
    aggiornaRiepilogo();
});