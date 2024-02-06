export default abstract class SurveyQuestion {

    question: string;

    /**
     * @param question The question for the user
     */
    protected constructor(question: string) {
        this.question = question;
    }

    /**
     * Compares two answers to the question and returns a number, roughly 0 to 1,
     * representing how compatible the answers are. Higher numbers means that the
     * users are more compatible with eachother.
     *
     * @param a The first answer
     * @param b The second answer
     */
    abstract compareAnswers(a: any, b: any): number;
}



class MultipleChoiceQuestion extends SurveyQuestion {

    answers: string[];
    importance: number;

    /**
     * @param question The question for the user
     * @param answers The possible answers
     * @param importance A number representing how important the question is
     */
    constructor(question: string, answers: string[], importance: number) {
        super(question);
        this.answers = answers;
        this.importance = importance;
    }

    compareAnswers(a: any, b: any): number {
        return a === b ? this.importance : 0;
    }
}


class MultiSelectQuestion extends SurveyQuestion {

    answers: string[];
    importance: number;

    /**
     * @param question The question for the user
     * @param answers The possible answers
     * @param importance A number representing how important the question is
     */
    constructor(question: string, answers: string[], importance: number) {
        super(question);
        this.answers = answers;
        this.importance = importance;
    }

    compareAnswers(a: any, b: any): number {
        return a.filter((x: any) => b.includes(x)).length / Math.max(a.length, b.length) * this.importance;
    }
}


class ScalarQuestion extends SurveyQuestion {

    min: number;
    max: number;
    scoreFunction: (a: any, b: any) => number;

    /**
     * @param question The question for the user
     * @param min The minimum value for the answer
     * @param max The maximum value for the answer
     * @param scoreFunction A function that compares two answers and returns a number
     */
    constructor(question: string, min: number, max: number, scoreFunction: (a: any, b: any) => number) {
        super(question);
        this.min = min;
        this.max = max;
        this.scoreFunction = scoreFunction;
    }

    compareAnswers(a: any, b: any): number {
        return this.scoreFunction(a, b);
    }
}



let questions: SurveyQuestion[] = [

    // Similar ages score closer to 1. Ages further apart score closer to 0.
    new ScalarQuestion(
        "How old are you?",
        12,
        100,
        (a, b) => (36.0 - Math.min(Math.abs(a - b), 6.0) ** 2.0) / 36.0
    ),

    new MultipleChoiceQuestion(
        "What kind of relationship are you looking for?",
        [
            "Friendship",
            "Hookup",
            "Casual",
            "Dating",
        ],
        1.0
    ),

    new MultipleChoiceQuestion(
        "What best describes where you see yourself in the next 5 years?",
        [
            "Focusing on career goals",
            "Focusing on hobbies and interests, or traveling",
            "Focusing on family and friends",
            "Focusing on a relationship",
        ],
        1.0
    ),

    new MultipleChoiceQuestion(
        "What best describes your ideal date?",
        [
            "Going to a fancy restaurant",
            "Going to a movie",
            "Going to a concert",
            "Staying in and watching TV",
        ],
        1.0
    ),

    new MultiSelectQuestion(
        "What are your hobbies?",
        [
            "Video games",
            "Reading",
            "Gym",
            "Martial arts",
            "Watching Sports",
            "Playing Sports",
            "Theater",
            "Dancing",
            "Exploring the city",
            "Music",
            "Cooking",
            "Art",
            "Traveling",
            "Hiking",
            "Photography",
            "Hating everything",
            "Partying",
        ],
        5.0
    ),

    new MultipleChoiceQuestion(
        "What religion are you?",
        [
            "Atheist",
            "Christian",
            "Muslim",
            "Jewish",
            "Hindu",
            "Buddhist",
            "Other",
            "Who cares?"
        ],
        1.0
    ),

    new MultipleChoiceQuestion(
        "What is your political affiliation?",
        [
            "Liberal",
            "Conservative",
            "I don't think I'm either",
            "I am not interested in politics",
        ],
        1.0
    ),

    new MultipleChoiceQuestion(
        "What is the square root of 4?",
        [
            "2",
            "±2"
        ],
        0.2
    ),

    new MultipleChoiceQuestion(
        "What annoys you the most in a relationship?",
        [
            "Mixed messages",
            "Emotional unavailability",
            "Someone who lacks ambition",
            "Someone who lacks motivation",
        ],
        1.0
    ),

    new ScalarQuestion(
        "How important is physical attraction to you? (1 being not important, 5 being very important)",
        1,
        5,
        (a, b) => 1 - Math.abs(a - b) / 5
    ),

    new ScalarQuestion(
        "How important is emotional connection to you? (1 being not important, 5 being very important)",
        1,
        5,
        (a, b) => 1 - Math.abs(a - b) / 5
    ),

    new ScalarQuestion(
        "How important is intelligence to you? (1 being not important, 5 being very important)",
        1,
        5,
        (a, b) => 1 - Math.abs(a - b) / 5
    ),

    new MultipleChoiceQuestion(
        "What sounds like the best first date?",
        [
            "Dinner and a movie",
            "Arcade",
            "Going to a museum",
            "Going to a concert",
        ],
        1.0
    )
];

