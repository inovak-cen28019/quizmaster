import './create-question.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type QuestionApiData, saveQuestion, getQuestionForEdit, updateQuestion } from 'api/quiz-question.ts'

import { ErrorMessage, LoadedIndicator, QuestionLink, EditQuestionLink} from './components'
import { emptyQuestionFormData, QuestionEditForm, toQuestionApiData, toQuestionFormData } from './form'

export function CreateQuestionForm() {
    const params = useParams()
    const questionUid = params.id ? params.id : undefined

    const [questionData, setQuestionData] = useState(emptyQuestionFormData())

    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [linkToEditQuestion, setLinkToEditQuestion] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchQuestion = async () => {
            if (questionUid) {
                const quizQuestion = await getQuestionForEdit(questionUid)
                setQuestionData(toQuestionFormData(quizQuestion))
                setIsLoaded(true)
            }
        }
        fetchQuestion()
    }, [questionUid])

    const postData = async (formData: QuestionApiData) =>
        questionUid
            ? updateQuestion(formData,  questionUid)
                  .then(() => {setLinkToQuestion(`${location.origin}/question/${params.id}`)
                  setLinkToEditQuestion(`${location.origin}/question/${questionUid}/edit`)
                })
                  .catch(error => {
                    setLinkToQuestion(error.message)
                    setLinkToEditQuestion(error.message)
                })
            : saveQuestion(formData)
                  .then(newQuestion => {
                    setLinkToQuestion(`${location.origin}/question/${newQuestion.id}`)
                    setLinkToEditQuestion(`${location.origin}/question/${newQuestion.uid}/edit`)
                    console.log('Question saved')
                }

                )
                  .catch(error => {setLinkToQuestion(error.message)
                                  setLinkToEditQuestion(error.message)}
                )


    const handleSubmit = () => {
        setErrorMessage('')

        const apiData = toQuestionApiData(questionData)

        if (apiData.correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        const answersCount = apiData.answers.length

        for (let i = 0; i < answersCount; i++) {
            if (apiData.answers[i] === '') {
                setErrorMessage('All answers must be filled in')
                return
            }
        }

        let explanationNotEmptyCounter = 0

        const explanationCount = apiData.explanations.length

        for (let i = 0; i < explanationCount; i++) {
            if (apiData.explanations[i] !== '') {
                explanationNotEmptyCounter++
            }
        }
        if (explanationNotEmptyCounter !== 0 && explanationNotEmptyCounter !== explanationCount) {
            setErrorMessage('All or none explanation must be filled in.')
            return
        }

        if (apiData.question === '') {
            setErrorMessage('Question must not be empty.')
            return
        }

        postData(apiData)
    }

    return (
        <div className="question-page">
            <h1>Quiz Question Creation Page</h1>
            <h2>If you're happy and you know it create the question</h2>
            <QuestionEditForm questionData={questionData} setQuestionData={setQuestionData} onSubmit={handleSubmit} />
            <ErrorMessage errorMessage={errorMessage} />
            <QuestionLink url={linkToQuestion} />
            <EditQuestionLink url={linkToEditQuestion} />
            <LoadedIndicator isLoaded={isLoaded} />
        </div>
    )
}
