/**
 * Returns a number representing the match score between two players. Higher
 * numbers mean that the match is better. The match score is calculated by
 * comparing the responses of the two players to the survey questions.
 *
 * @param a The first player
 * @param b The second player
 * @param questions The survey questions
 */
function calculateMatchScore(a: Player, b: Player, questions: SurveyQuestion[]): number {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        score += questions[i].compareAnswers(a.responses[i], b.responses[i])
    }

    return score;
}

/**
 * Matches players based on their responses to the survey questions.
 *
 * @param players The players to match
 * @param questions The survey questions
 */
function findMatches(players: Player[], questions: SurveyQuestion[]): [Player, Player][] {
    let pairs: [Player, Player][] = [];
    let scores: Map<Player, [Player, number][]> = new Map();

    for (let i = 0; i < players.length; i++) {
        scores.set(players[i], []);

        for (let j = 0; j < players.length; j++) {
            // Don't compare a player to themselves
            if (i == j)
                continue;

            // Make sure sexuality is compatible. Check both players' preferences
            if (players[i].gender != players[j].preference || players[j].preference != players[i].gender)
                continue;

            scores.get(players[i])!.push([players[j], calculateMatchScore(players[i], players[j], questions)]);
        }

        // Sort the scores for each player, so their best matches are first
        scores.get(players[i])!.sort((a, b) => b[1] - a[1]);
    }

    // At this point, we have a map of players to their best matches. Even if
    // the match score is low, they will be included in the list.

    // @ts-ignore
    for (let [player, playerScores] of scores) {
        for (let playerScore of playerScores) {
            // Only try to match when this player has NOT already been matches
            if (!pairs.find(pair => pair.includes(player) || pair.includes(playerScore[0]))) {
                pairs.push(playerScore[1] > playerScore[0] ? [player, playerScore[0]] : [playerScore[0], player]);
                break;
            }
        }
    }

    return pairs;
}