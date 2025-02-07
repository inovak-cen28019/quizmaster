import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { CreateQuestionForm } from 'pages/create-question'
import { HomePage } from 'pages/home'
import { QuizScore, FakeLastQuestion } from 'pages/quiz-score'
import { FakeCreateQuiz } from 'pages/create-quiz'
import { Quiz } from 'pages/quiz'

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionForm />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/fakeLast" element={<FakeLastQuestion />} />
            <Route path="/quiz/score" element={<QuizScore />} />
            <Route path="/quiz/fakeCreate" element={<FakeCreateQuiz />} />
            <Route path="/question/:id/edit" element={<CreateQuestionForm />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
)
