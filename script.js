let playerCount = 0;

let player1 = new Set()
let player2 = new Set()
let player3 = new Set()

let players = new Map()

let gameScores = [
    
]

let games = ['stardew valley','cod', 'minecraft', 'snake', 'metal gear solid', 'binding of issac','inscription','supermario','sonic.exe','there is no game']

// not fully commented 
// adds scores to each player for each game they play the score is random
    function addScores()
    {
        for(player of players)
        {
            tempList = [player[0]]
            for (game of player[1])
            {
                tempList.push(game[1])
            }
            tempList.push(0)
            gameScores.push(tempList)
        }

    }

// not fully commented 
// adds a random game to the set
    function addGameRandomly(player){
        
        // get a random index number
        let index = Math.floor(Math.random() * games.length)

        if(!player.has(games[index])){
            player.add([games[index], Math.floor(Math.random() * 40 + 50)])
        }
        else{
            addGameRandomly(player) 
        }
    }

// not fully commented 
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

                addGame(player) 

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

// not fully commented 
// use to add a player to the map
    function newPlayer(database = users, player, playerName){

        // makes sure the map doesn't already have the player
            if(!database.has(playerName))
            {
                
                playerCount++
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


    addScores()

// skips the first and last of each row
    for(let i = 0; i < gameScores.length;i++)
    {
        
        let avergeScore = 0

        // goes through the cols of each row that the above for loop goes through
            for(let j = 1; j < gameScores[i].length-1;j++)
            {

                avergeScore += gameScores[i][j] 
                console.log(gameScores[i][j])
            }

        // addes the avarege score to the end of the each row
            gameScores[i][gameScores[i].length-1] = Math.floor( avergeScore/gameScores[i].length-2)
            
    }

// test area

    console.log(gameScores)


