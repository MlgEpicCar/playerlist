// hi brandonusa i used chatgpt for parts of this, it's sad but chatgpt enanbles me to be able to google the questions that i can't translate into words
// note: idk how to comment like a pro this is hella informal

// global variable thingy fr
let players = [];
const membersContainer = document.querySelector('.members');

// function that makea da card 
function renderPlayerCards(players) {

    // eraser
    membersContainer.innerHTML = '';

    players.forEach(player => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        memberDiv.style.backgroundImage = `url(${player.backgroundImage})`;

        const playerCard = `
            <p><img class="img" src="https://starlightskins.lunareclipse.studio/render/ultimate/${player.gamertag}/full" height="150" alt="${player.name} body"></p>
            <p><img src="${player.org}" class="icon"></p>
            <div class="memberinfo">
                <p class="name"><img class="img" src="https://mc-heads.net/avatar/${player.gamertag}" height="30" width="30"> ${player.name}</p>
                <p><b>Online:</b> ${player.online}</p>
                <p><b>Discord:</b> ${player.discord}</p>
                <p><b>Gamertag:</b> ${player.gamertag}</p>
                <p><b>Religion:</b> ${player.religion}</p>
                <p><b>Nation(s):</b> ${player.nations.join(', ')}</p>
            </div>
        `;

        memberDiv.innerHTML = playerCard;
        memberDiv.id = player.name;
        document.querySelector('.members').appendChild(memberDiv);
    });
}
function sortByNations(players) {
    return [...players].sort((a, b) => {
        const nationA = a.nations[0] || '';
        const nationB = b.nations[0] || '';
        const nationComparison = nationA.localeCompare(nationB);

        //if nations are the same, compare by names
        if (nationComparison === 0) {
            return a.name.localeCompare(b.name);
        }

        return nationComparison;
    });
}

// real code starts
fetch('../data/players.json')
    .then(response => response.json())
    .then(data => {
        players = data.players;
        renderPlayerCards(players);
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });


// GRAHHH SORT

//name
document.getElementById('sort-name').addEventListener('click', () => {
    const sortedPlayers = [...players].sort((a, b) => a.name.localeCompare(b.name));
    renderPlayerCards(sortedPlayers);
});
//gamertag
document.getElementById('sort-gamertag').addEventListener('click', () => {
    const sortedPlayers = [...players].sort((a, b) => a.gamertag.localeCompare(b.gamertag));
    renderPlayerCards(sortedPlayers);
});
//discord
document.getElementById('sort-discord').addEventListener('click', () => {
    const sortedPlayers = [...players].sort((a, b) => a.discord.localeCompare(b.discord));
    renderPlayerCards(sortedPlayers);
});
//nations
document.getElementById('sort-nation').addEventListener('click', () => {
    const sortedPlayers = sortByNations(players);
    renderPlayerCards(sortedPlayers);
});

/*is this the true power of sex mode?*/


/*
NOTE:
This will not work locally because of CORS. Start a Chrome from PowerShell with the following command to disable web security.
Start-Process "chrome.exe" -ArgumentList "--user-data-dir=`"C:\Chrome dev session`" --disable-web-security" 

TODO:
Move background image to players.json so this file can create it, and not have it be hard coded
Cache player heads locally as calling an API every time is slow, and may be rate limited
Don't use HTML in the JS, but create and set the elements directly with JS.
*/