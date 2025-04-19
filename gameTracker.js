
    let playerCount = 0;

    let players = new Map()

    let gameScores = [
        
    ]

    let empty = new Set()

    let games = ['stardew valley','cod', 'minecraft', 'snake', 'metal gear solid', 'binding of issac','inscription','supermario','sonic.exe','there is no game']

    // displays each player in the player box
        function populateDisplay()
        {

            for(player of players)
            {

                // adds the player name to the displayBox
                $('.displayBox').html(player[0] + "<br>")
            
            }
        
        } 

    // adds scores to each player for each game they play the score is random
        function addScores()
        {

            score = document.getElementById('scoreInput').value

            // gets sellected player
                playerName = document.getElementById('playerSelect2').value
            
            // each player
                for(player of players)
                {

                    // checks that this is the selected player
                        if(player[0] == playerName)
                        {
                                
                            // add player name
                                let tempList = [player[0]]
                        
                            let commaLocations = [-1]
                            
                            // locates the commas seperating the scores
                                for (x in score)
                                {
                                
                                    if (score[x] == ',')
                                    {
                                
                                        commaLocations.push(x)
                                
                                    }
                                
                                }
                
                            // adds the scores to the templist
                                for(let i = 1; i <= commaLocations.length; i++)
                                {
                
                                    tempList.push(score.substring(commaLocations[i-1]/1+1,commaLocations[i]))
                
                                }
                                    
                            // adds average
                
                                let avergeScore = 0
                
                                // skips first
                                    for(let i = 1; i < tempList.length;i++)
                                    {
                
                                        avergeScore += tempList[i]/1 
                                
                                    }
                
                                tempList.push(Math.round( avergeScore/(tempList.length-1)))
                
                                // adds the average score to the players card
                                    $(`#${playerName}Score`).html('average score: ' + Math.round( avergeScore/(tempList.length-1)))
                
                            // adds this list to the gameScores list
                                gameScores.push(tempList)

                        }
                
                }

        }

    // adds a random game to the set
        function addGame(){
            
            // get the user sellected varibles
                let game = document.getElementById('gameSelect').value

                let playerName = document.getElementById('playerSelect').value
            
            // each player 
                for(player of players)
                {

                    // check that this is the right player
                        if(player[0] == playerName)
                        {

                            // check if player has the game
                                if (!player[1].has(game))
                                {

                                    player[1].add(game)

                                    // adds the game to the players card
                                        $(`#${playerName}`).append(`<li>${game}</li>`)

                                }

                        }
                
                }

        }

    // use to add a player to the map
        function newPlayer(database = players, playerName=document.getElementById('playerName').value){

            // no blank name
                if(playerName == '')
                {

                    return
                
                }

            // makes sure the map doesn't already have the player
                if(!database.has(playerName))
                {
                    playerCount++
                    
                    let player = new Set();

                    // adds the player to the users
                        database.set(playerName ,player)

                    // adds the players card 
                        $('.displayBox').append(
                        `   <section id='${playerName}'>
                                
                                <h3>${playerName}</h3>
                        
                                <div id='${playerName}Score'>

                                </div>

                            </section>`)

                    let playerOptions = ''

                    // add each of the players to the html
                        for(player of players)
                            {
                
                                playerOptions += `<option value="${player[0]}">${player[0]}</option>`
                

                            }

                        // add each of the players
                            $(`.playerSelect`).html(playerOptions)

                }
                else
                {

                    return
                
                }

        }

    function gameSummary()
    {

        let retVal = '<h2>player Game Summary</h2>'

        // each player
            for(player of players)
            {

                let names = ''

                // adds the player add the games to the html
                    names+= '<h3>' + player[0] + '</h3><ul>'

                    // each game of that player
                        for (game of player[1])
                        {

                            names += '<li>' + game + ',</li>'

                        }

                    retVal +=  names.substring(0,names.length-6)+'</li></ul>'

            }
        
        $('.displayGames').html(retVal)        

    }

    function scoreSummary()
    {

        let retVal = '<h2>Score Summary:</h2>'

        // goes through the scores
            for(let i = 0; i < gameScores.length;i++)
            {

                let score = ''

                // first item of each row is the players name
                    score += '<h3>' + gameScores[i][0] + '</h3> '
                
                let tempList = []

                // skips the first and last of each row
                    for(let j = 1; j < gameScores[i].length-1;j++)
                    {

                        tempList.push(gameScores[i][j])

                    }

                // the last item of each row is the average score
                    score += '<p>' + tempList + '<p> <h4> Average: ' + gameScores[i][gameScores[i].length-1]

                retVal += score + '</h4>'

            }

        $('.displayScore').html(retVal)        

    }

    function sortPlayersByScore()
    {
        let retVal = '<h2>Players Sorted by Average Score:</h2>'

        let sortByAverage = []

        // addes the first value for player1 [playerName, avrScore] 
            sortByAverage.push([gameScores[0][0], gameScores[0][gameScores[0].length-1]])
        

        // goes through the scores skips first one
            for(let i = 1; i < gameScores.length;i++)
            {        

                for(let j = 0; j <= sortByAverage.length; j++)
                {

                    // if at the end of the list and its not added put at the back
                    if(j==sortByAverage.length)
                    {
                        sortByAverage.push([gameScores[i][0],gameScores[i][gameScores[i].length-1]])
                        break

                    }

                    // if score is less then this value go to the next on
                    if(sortByAverage[j][1] > gameScores[i][gameScores[i].length-1])
                    {

                        continue

                    }
                    else
                    {

                        // adds this score before the current loop
                        sortByAverage.splice(j,0,[gameScores[i][0],gameScores[i][gameScores[i].length-1]])
                        // break, so it doesn't add it twice
                        break

                    }

                }

            }

        //each in the sort by average list
            for(let i = 0; i < sortByAverage.length; i++)
            {

                retVal += '<h3>' + sortByAverage[i][0] + '</h3> <li> Avrage score: ' + sortByAverage[i][1] + '</li>'

            }

        $('.displaySort').html(retVal)        

    }


    $(document).ready(function(){

        let gameOptions = ``

        populateDisplay()

        // add each game to the string in the form of options
            for(let i = 0; i < games.length; i++)
            {

                gameOptions += `<option value="${games[i]}">${games[i]}</option>`

            }

        // add each of the games to the html
            $('.selectGames').html(

                `
                <label>Choose Game:</label>
                <select id="gameSelect">
                ${gameOptions}
                </select>
                <select id="playerSelect" class="playerSelect">

                </select>
                <button onclick="addGame()">Assign Game to Player</button>
                `

            )

    })