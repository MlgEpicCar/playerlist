// global variable thingy fr
let players = [];
const membersContainer = document.querySelector('.members');
let displayMode = 'name'; // Default to displaying name


// function that makea da card 
function renderPlayerCards(players) {
    membersContainer.innerHTML = '';    // needed for repainting the cards when sorting

    players.forEach(player => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        memberDiv.style.backgroundImage = `url(${player.backgroundImage})`;

        const displayName = displayMode === 'name' ? player.name : player.gamertag;

        // TODO: don't use HTML in the JS, but create and set the elements directly with JS.
        const playerCard = `
            <img class="img player-skin" src="https://starlightskins.lunareclipse.studio/render/ultimate/${player.gamertag}/full" height="150" alt="${player.name} body">
            <div class="memberinfo">
                <p class="name">${displayName}</p>
                <p><b>Online:</b> ${player.online}</p>
                <p><b>Discord:</b> ${player.discord}</p>
                <p><b>Religion:</b> ${player.religion}</p>
                <p><b>Nation(s):</b> ${player.nations.join(', ')}</p>
            </div>
            <img src="${player.org}" class="icon">
        `;

        memberDiv.innerHTML = playerCard;
        memberDiv.id = player.gamertag;
        membersContainer.appendChild(memberDiv);
    });
}

fetch('../data/players.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        renderPlayerCards(players);
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });

function sortByNations(players) {
    return [...players].sort((a, b) => {
        const nationA = a.nations[0] || '';
        const nationB = b.nations[0] || '';
        const nationComparison = nationA.localeCompare(nationB);

        // if nations are the same, compare by names
        if (nationComparison === 0) {
            return a.name.localeCompare(b.name);
        }
        return nationComparison;
    });
}

// Name or gamertag display toggle
document.getElementById('toggle-display').addEventListener('change', (event) => {
    displayMode = event.target.value;
    renderPlayerCards(players);
});

// Discord sort
document.getElementById('sort-discord').addEventListener('click', () => {
    const sortedPlayers = [...players].sort((a, b) => a.discord.localeCompare(b.discord));
    renderPlayerCards(sortedPlayers);
});

// Nation sort
document.getElementById('sort-nation').addEventListener('click', () => {
    const sortedPlayers = sortByNations(players);
    renderPlayerCards(sortedPlayers);
})

// TODO: Keep sort option on name display update
// Name sort, toggles between name and gamertag
document.getElementById('sort-name').addEventListener('click', () => {
    const sortedPlayers = [...players].sort((a, b) => {
        if (displayMode === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.gamertag.localeCompare(b.gamertag);
        }
    });
    renderPlayerCards(sortedPlayers);
});


/*
NOTE:
This will not work locally because of CORS. Start Chrome from PowerShell with the following command to disable web security.
Start-Process "chrome.exe" -ArgumentList "--user-data-dir=`"C:\Chrome dev session`" --disable-web-security" 

TODO:
Cache player skins locally as calling an API every time is slow, and may be rate limited
*/
