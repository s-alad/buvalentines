class SurveyQuestion {
    question: string;
    responses: string[];
    importance: number;

    /**
     *
     * @param question The question for the user
     * @param responses The possible responses to the question
     * @param importance How important this question is in matching
     */
    constructor(question: string, responses: string[], importance: number) {
        this.question = question;
        this.responses = responses;
        this.importance = importance;
    }
}

let questions: SurveyQuestion[] = [
    new SurveyQuestion(
        "What best describes your year?",
        ["Freshman", "Sophomore", "Junior", "Senior"],
        0.75
    ),
    new SurveyQuestion(
        "What is your major?",
        ["Computer Science", "Something else"],
        1.0
    ),
];

