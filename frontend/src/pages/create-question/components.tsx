export const LoadedIndicator = ({ isLoaded }: { isLoaded: boolean }) => (
    <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
)

export const QuestionLink = ({ url }: { url: string }) => url && <span id="question-link">{url}</span>
export const EditQuestionLink = ({ url }: { url: string }) => url && <span id="edit-link">{url}</span>


export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) =>
    errorMessage && <span id="error-message">{errorMessage}</span>

// export const OKStr = ({ okStr }: { okStr: string }) => okStr && <span id="ok-str">{okStr}</span>

// export const EmptyQuestionErrorMessage = ({ emptyQuestionErrorMessage }: { emptyQuestionErrorMessage: string }) => emptyQuestionErrorMessage && <span id="nok-emptyquestion">{emptyQuestionErrorMessage}</span>
