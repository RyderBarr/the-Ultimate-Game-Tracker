// JQuery

    let playerCount = 0;

    let players = new Map()

    let gameScores = [
        
    ]

    let empty = new Set()

    let games = ['stardew valley','cod', 'minecraft', 'snake', 'metal gear solid', 'binding of issac','inscription','supermario','sonic.exe','there is no game']

    //
        function populateDisplay()
        {

            $('.displayBox').html('')

            for(player of players)
            {

                $('.displayBox').append(player[0] + "<br>")
            
            }
        
        } 

    // adds scores to each player for each game they play the score is random
        function addScores(score)
        {
            playerName = document.getElementById('playerSelect').value
            
            for(player of players)
            {
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
                            for(let i = 1; i < gameScores.length;i++)
                            {
        
                                avergeScore += avergeScore[i] 
                        
                            }
        
                        tempList.push(Math.round( avergeScore/(tempList.length-1)))
        
        
                    // adds this list to the gameScores list
                        gameScores.push(tempList)

                }
            
            }

        }

    // adds a random game to the set
        function addGame(){
            
            let game = document.getElementById('gameSelect').value
            console.log(game)

            let playerName = document.getElementById('playerSelect').value

            for(player of players)
            {
                if(player[0] == playerName)
                {
                        
                    if (!player[1].has(game))
                    {

                        player[1].add(game)

                        console.log(player)

                    }

                }
            
            }

        }

    // use to add a player to the map
        function newPlayer(database = players, player=empty, playerName=document.getElementById('playerName').value){

            if(playerName == '')
            {
                return
            }

            // makes sure the map doesn't already have the player
                if(!database.has(playerName))
                {
                    playerCount++
                    
                    // adds the player to the users
                        database.set(playerName ,player)

                    $('.displayBox').append(playerName + "<br>")

                }
                else
                {

                    return
                
                }

        }

    function gameSummary()
    {

        let retVal = 'player Game Summary:\n'

        // each player
            for(player of players)
            {

                let names = ''

                // player name
                names+= player[0] + ', '

                // each game of that player
                    for (game of player[1])
                    {

                        // game name
                        names += game[0] + ', '

                    }

                retVal +=  names.substring(0,names.length-2)+'\n'

            }
        
        return retVal

    }

    function scoreSummary()
    {

        let retVal = '\nScore Summary:'

        // goes through the scores
            for(let i = 0; i < gameScores.length;i++)
            {

                let score = ''

                // first item of each row is the players name
                    score += gameScores[i][0] + ' - Scores: '
                
                let tempList = []

                // skips the first and last of each row
                    for(let j = 1; j < gameScores[i].length-1;j++)
                    {

                        tempList.push(gameScores[i][j])

                    }

                // the last item of each row is the average score
                    score += tempList + ' | Average: ' + gameScores[i][gameScores[i].length-1]

                retVal += score

            }

        return retVal

    }

    function sortPlayersByScore()
    {
        let retVal = '\nPlayers Sorted by Average Score:'

        // varible to hold the placements
            let sortByAverage = []

        // addes the first value [playerName, avrScore] 
            sortByAverage.push([gameScores[0][0], gameScores[0][gameScores[0].length-1]])
        
        // goes through the scores skips first one
            for(let i = 1; i < gameScores.length;i++)
            {        

                // go for each of the new list
                for(let j = 0; j <= sortByAverage.length; j++)
                {

                    // if at the end of the list and its not added put at the back
                    if(j==sortByAverage.length)
                    {
                        
                        sortByAverage.push([gameScores[i][0],gameScores[i][gameScores[i].length-1]])
                        // break because this could add another loop of the list by increasing size
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

                retVal += sortByAverage[i][0] + ' - Avrage score: ' + sortByAverage[i][1]

            }

        return retVal

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


        function playerPopulate()
        {
            let playerOptions = ''

            // add each of the players to the html
                for(player of players)
                {
                
                    playerOptions += `<option value="${player[0]}">${player[0]}</option>`
                
                }

            // add each of the players
                $(`.playerSelect`).html(playerOptions)
        }

        setInterval(playerPopulate,100)

    })

// JQuery