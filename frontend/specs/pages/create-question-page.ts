import type { Page } from '@playwright/test'

export class CreateQuestionPage {
    constructor(private page: Page) {}

    gotoNew = () => this.page.goto('/question/new')
    gotoEdit = (url: string) => this.page.goto(`${url}/edit`, { waitUntil: 'networkidle' })

    waitForLoaded = () => this.page.isHidden('#is-loaded[value="loaded"]')

    private questionLocator = () => this.page.locator('#question-text')
    enterQuestion = (question: string) => this.questionLocator().fill(question)
    questionValue = () => this.questionLocator().inputValue()

    private multipleChoiceLocator = () => this.page.locator('#is-multiple-choice')
    isMultipleChoice = () => this.multipleChoiceLocator().isChecked()
    setMultipleChoice = () => this.multipleChoiceLocator().check()
    setSingleChoice = () => this.multipleChoiceLocator().uncheck()

    isCorrectCheckboxLocator = (answerText: string) =>
        this.page.locator(`[id^=answer-text-][value="${answerText}"]+[id^=answer-checkbox-]`)

    isCorrectCheckboxesLocator = () => this.page.locator('[id^=answer-checkbox-]')

    answerTextLocator = (index: number) => this.page.locator(`#answer-text-${index}`)

    enterAnswer = async (index: number, value: string, correct: boolean, explanation: string) => {
        await this.answerTextLocator(index).fill(value)

        if (explanation) await this.page.fill(`#answer-explanation-${index}`, explanation)

        if (correct) await this.page.check(`#answer-checkbox-${index}`)
    }

    private questionExplanationLocator = () => this.page.locator('#question-explanation')
    enterQuestionExplanation = (question: string) => this.questionExplanationLocator().fill(question)

    addAnswer = async (idx: number) => {
        await this.page.locator('button#add-answer').click()
        await this.page.waitForSelector(`#answer-text-${idx}`)
    }

    submit = () => this.page.locator('button[type="submit"]').click()

    private questionUrlLocator = () => this.page.locator('#question-link')
    questionUrl = () => this.questionUrlLocator().textContent()
    private editUrlLocator = () => this.page.locator('#edit-link')
    editUrl = () => this.editUrlLocator().textContent()
    errorMessage = () => this.page.textContent('#error-message')
}
