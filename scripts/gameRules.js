export const gameRules = {
    easy: {
        speedThreshold: 10,
        levelUpScore: 20,
        nextLevel: "medium",
        gameOverThreshold: -5,
        powerUpProbability: 0.2,
        caughtProbability: 0.2,
        score: 0,
        cash: 0,
        intoxication: 0,
        poison: 0,
        playing: false
    },
    medium: {
        speedThreshold: 8,
        levelUpScore: 40,
        nextLevel: "hard",
        gameOverThreshold: -2,
        caughtProbability: 0.05,
        powerUpProbability: 0.1,
        score: 0,
        cash: 0,
        intoxication: 0,
        poison: 0,
        playing: false
    },
    hard: {
        speedThreshold: 6,
        levelUpScore: null,
        gameOverThreshold: -1,
        caughtProbability: 0.09,
        powerUpProbability: 0.1,
        score: 0,
        cash: 0,
        intoxication: 0,
        poison: 0,
        playing: false
    }
};
