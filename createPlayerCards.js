fetch('players.json')   // This will be an API endpoint at some point. Currently it just reads players.json
    .then(response => response.json())
    .then(data => {
        const players = data.players;
        players.forEach(player => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member');

            const playerCard = `
           
                <img src="https://starlightskins.lunareclipse.studio/render/walking/${player.name}/full" height="150">
                <div class="memberinfo">
                    <p class="name"><img src="https://mc-heads.net/avatar/${player.name}" height="30" width="30"> ${player.name}</p>
                    <p><b>Online:</b> ${player.online}</p>
                    <p><b>Discord:</b> ${player.discord}</p>
                    <p><b>Nickname(s):</b> ${player.nicknames.join(', ')}</p>
                    <p><b>Religion:</b> ${player.religion}</p>
                    <p><b>Nation(s):</b> ${player.nations.join(', ')}</p>
                </div>
            `;

            memberDiv.innerHTML = playerCard;
            document.querySelector('.members').appendChild(memberDiv);
        });
    })
    .catch(error => {
        console.error('Error loading player data:', error);
    });



/*
NOTE:
This will not work locally because of CORS. Start a Chrome from PowerShell with the following command to disable web security.
Start-Process "chrome.exe" -ArgumentList "--user-data-dir=`"C:\Chrome dev session`" --disable-web-security" 

TODO:
Move background image to players.json so this file can create it, and not have it be hard coded
Cache player heads locally as calling an API every time is slow, and may be rate limited
Don't use HTML in the JS, but create and set the elements directly with JS.
*/