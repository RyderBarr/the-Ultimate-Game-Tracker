// JQuery

    let playerCount = 0;

    let player1 = new Set();let player2 = new Set();let player3 = new Set()

    let players = new Map()

    let gameScores = [
        
    ]

    let games = ['stardew valley','cod', 'minecraft', 'snake', 'metal gear solid', 'binding of issac','inscription','supermario','sonic.exe','there is no game']

    //
    function populateDisplay()
    {
        $('.displayBox').html('')
        for(player of players){
            $('.displayBox').append(player[0] + "<br>")
        }
    } 

    // adds scores to each player for each game they play the score is random
        function addScores(player,score1,score2,score3)
        {

            let tempList = [player[0]]
                    
            // goes through all the games of the player
        
                tempList.push(score1)
                tempList.push(score2)
                tempList.push(score3)
                    
                // adds a spot for the avarage
                    tempList.push(0)

                // adds this list to the gameScores list
                    gameScores.push(tempList)

            
            // skips the first and last of each row
                for(let i = 0; i < gameScores.length;i++)
                {
                
                    let avergeScore = 0

                    // goes through the cols of each row that the above for loop goes through
                        for(let j = 1; j < gameScores[i].length-1;j++)
                        {

                            avergeScore += gameScores[i][j] 
                
                        }

                    // addes the avarege score to the end of the each row
                        gameScores[i][gameScores[i].length-1] = Math.round( avergeScore/(gameScores[i].length-2))
                    
                }

        }

    // adds a random game to the set
        function addGame(player){
            
            // get a random index number
                let index = Math.floor(Math.random() * games.length)

            // makes sure the player doesn't have the game already
                if(!player.has(games[index]))
                {

                    // adds a random score to the game then adds them to the player
                        player.add(games[index])
                
                }
                else
                {
                    // calls this functions again
                    addGame(player) 

                }

        }

    // use to add a player to the map
        function newPlayer(database = players, player=null, playerName=document.getElementById('playerName').value){

            // makes sure the map doesn't already have the player
                if(!database.has(playerName))
                {
                    
                    playerCount++
                    // adds the player to the users
                        database.set(playerName ,player)
                    
                    
                    $('.displayBox').append(player[0] + "<br>")
                    

                }
                else
                {

                    return
                
                }

        }

    // adds three RANDOM games to player1
        addGame(player1);addGame(player1);addGame(player1)
        addScores(player1)

    // adds three RANDOM games to player2
        addGame(player2);addGame(player2);addGame(player2)
        addScores(player2)

    // adds three RANDOM games to player3
        addGame(player3);addGame(player3);addGame(player3)
        addScores(player3)

    // adds all the players to the map
        newPlayer(players, player1,'master chief');newPlayer(players, player2, 'markaplier');newPlayer(players, player3, 'ryder barr')

    // makes a list with all the scores
        



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
    gameSummary()

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

    scoreSummary()

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
    sortPlayersByScore()


    $(document).ready(function(){

        let gameOptions = ``

        populateDisplay()

        // add each game to the string in the form of options
            for(let i = 0; i < games.length; i++)
            {

                gameOptions += `<option value="${i}">${games[i]}</option>`

            }

        // add each of the games to the html
            $('.selectGames').html(

                `
                <label>Choose Game:</label>
                <select id="gameSelect">
                ${gameOptions}
                </select>
                <button onclick="assignGame()">Assign Game to Player</button>
                `

            )

    })

// JQuery