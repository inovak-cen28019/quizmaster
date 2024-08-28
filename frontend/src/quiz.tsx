import { createSignal, For, onMount, Show } from 'solid-js'

interface QuizQuestion {
    readonly question: string
    readonly answers: readonly string[]
}

const Answer = (answer: string) =>
    <li>{ answer }</li>

const Question = ({ question, answers }: QuizQuestion) => <>
    <h1>{ question }</h1>
    <ul>
        <For each={ answers } children={ Answer }/>
    </ul>
</>

export const Quiz = () => {
    const [quizQuestion, setQuizQuestion] = createSignal<QuizQuestion | null>(null)

    onMount(async () => {
        const response = await fetch('/api/quiz-question')
        const data = await response.json()
        setQuizQuestion(data)
    })

    return <Show when={ quizQuestion() } children={ Question } keyed/>
}
