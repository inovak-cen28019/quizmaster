import type { QuizQuestion } from 'model/quiz-question.ts'
import { fetchJson, postJson, patchJson } from './helpers.ts'
import { Params } from 'react-router-dom'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export const getQuestionForEdit = async (questionUid: string | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionUid}/edit`)
export type QuestionApiData = Omit<QuizQuestion, 'uid'>

export const saveQuestion = async (question: QuestionApiData) =>
    await postJson<QuestionApiData, Readonly<Params<string>>>('/api/quiz-question', question)

export const updateQuestion = async (question: QuestionApiData, id: string) =>
    await patchJson<QuestionApiData, string>(`/api/quiz-question/${id}`, question)
