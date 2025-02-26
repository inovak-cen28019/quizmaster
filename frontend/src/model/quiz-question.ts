// TODO refactor optional params
export interface QuizQuestion {
    readonly id: number
    readonly uid: string
    readonly question: string
    readonly answers: string[]
    readonly explanations: string[]
    readonly questionExplanation: string
    readonly correctAnswers: number[]
}

export interface Answers {
    readonly correctAnswers: readonly number[]
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}
