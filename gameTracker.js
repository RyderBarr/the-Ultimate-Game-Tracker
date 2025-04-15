let playerCount = 0;

let player1 = new Set()
let player2 = new Set()
let player3 = new Set()

let players = new Map()

let gameScores = [
    
]

let games = ['stardew valley','cod', 'minecraft', 'snake', 'metal gear solid', 'binding of issac','inscription','supermario','sonic.exe','there is no game']

// adds scores to each player for each game they play the score is random
    function addScores()
    {

        // clears the gameScores list
        delete gameScores
        gameScores = []
        
        // goes through all the players 
            for(player of players)
            {

                let tempList = [player[0]]
                
                // goes through all the games of the player
                    for (game of player[1])
                    {
                        
                        tempList.push(game[1])
                    
                    }
                
                // adds a spot for the avarage
                    tempList.push(0)

                // adds this list to the gameScores list
                    gameScores.push(tempList)
            
            }

    }

// adds a random game to the set
    function addGameRandomly(player){
        
        // get a random index number
            let index = Math.floor(Math.random() * games.length)

        // makes sure the player doesn't have the game already
            if(!player.has(games[index]))
            {

                // adds a random score to the game then adds them to the player
                    player.add([games[index], Math.floor(Math.random() * 40 + 50)])
            
            }
            else
            {
                // calls this functions again
                addGameRandomly(player) 

            }

    }

// use to add a game to the set, with the name of the game
    function addGame(player, game, score)
    {
 
        // checks if the game is not in the set already
            if(!player.has(game))
            {

                player.add([game, score])
            
            }
            else
            {

                return 

            }

        // this is to add any new games to the games array
            let strHasGame = false

            // goes through games to see if the game is in there
                for ( let i = 0; i < games.length; i++ )
                {

                    if (games[i] == game)
                    {
                        strHasGame == true
                    }

                }

            // if it is not it adds it to the list of games
                if(!strHasGame)
                {

                    games.push(game)

                }

    }

// use to add a player to the map
    function newPlayer(database = users, player, playerName){

        // makes sure the map doesn't already have the player
            if(!database.has(playerName))
            {
                
                playerCount++
                // adds the player to the users
                    database.set(playerName ,player)
            
            }
            else
            {

                return
            
            }

    }

// adds three RANDOM games to player1
    addGameRandomly(player1);addGameRandomly(player1);addGameRandomly(player1)

// adds three RANDOM games to player2
    addGameRandomly(player2);addGameRandomly(player2);addGameRandomly(player2)

// adds three RANDOM games to player3
    addGameRandomly(player3);addGameRandomly(player3);addGameRandomly(player3)

// adds all the players to the map
    newPlayer(players, player1,'master chief');newPlayer(players, player2, 'markaplier');newPlayer(players, player3, 'ryder barr')

// makes a list with all the scores
    addScores()

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

console.log('player Game Summary:')

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

        console.log(names.substring(0,names.length-2))

    }

console.log('\nScore Summary:')

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

        console.log(score)

    }

console.log('\nPlayers Sorted by Average Score:')

let sortByAverage = []
sortByAverage.push([gameScores[0][0], gameScores[0][gameScores[0].length-1]])
// goes through the scores skips first one
    for(let i = 1; i < gameScores.length;i++)
    {        

        for(let j = 0; j <= sortByAverage.length; j++)
        {
            if(j==sortByAverage.length)
            {
                
                sortByAverage.push([gameScores[i][0],gameScores[i][gameScores[i].length-1]])
                break

            }

            if(sortByAverage[j][1] > gameScores[i][gameScores[i].length-1])
            {

                continue

            }
            else
            {

                sortByAverage.splice(j,0,[gameScores[i][0],gameScores[i][gameScores[i].length-1]])
                break

            }

        }

    }

//each in the sort by average list
    for(let i = 0; i < sortByAverage.length; i++)
    {

        console.log(sortByAverage[i][0] + ' - Avrage score: ' + sortByAverage[i][1])

    }

// goes through all the players 
    for(player of players)
    {
        
        // goes through all the games of the player
            for (game of player[1])
            {
                
                
                
            }

    }