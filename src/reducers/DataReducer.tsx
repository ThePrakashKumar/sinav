import { State } from "../types/ContextTypes";
import { Action } from "../types/ContextTypes";

import scoreKeeper from "../utils/scoreKeeper";

const reducer = (initialState: State, action: Action) => {
    switch (action.type) {
        case "INI_QUIZ":
            return {
                ...initialState,
                quiz: initialState.allQuiz[action.payload.quizId - 1],
            };
        case "CHECK_ANSWER":
            const evaluatedScore = scoreKeeper(
                initialState.score,
                action.payload.selectedOption
            );

            return {
                ...initialState,
                buttonDisabled: true,
                score: evaluatedScore,
                selectedAnswer: [
                    ...initialState.selectedAnswer,
                    action.payload.selectedId,
                ],
            };
        case "ENABLE_BUTTON":
            return {
                ...initialState,
                buttonDisabled: false,
            };
        case "NEXT_QUESTION":
            return {
                ...initialState,
                questionNumber: initialState.questionNumber + 1,
            };
        case "RESET":
            return {
                ...initialState,
                score: 0,
                quiz: null,
                buttonDisabled: false,
                questionNumber: 0,
                selectedAnswer: [],
            };
    }
};

export default reducer;
