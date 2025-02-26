package cz.scrumdojo.quizmaster.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuizQuestionController {

    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    public QuizQuestionController(
        QuizQuestionRepository quizQuestionRepository) {

        this.quizQuestionRepository = quizQuestionRepository;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable Integer id) {

        return response(findQuestion(id));
    }

    @Transactional
    @GetMapping("/quiz-question/{uid}/edit")
    public ResponseEntity<QuizQuestion> getQuestion(@PathVariable String uid) {

        return response(findQuestionForEdit(uid));
    }

    @Transactional
    @PostMapping("/quiz-question")
    public ResponseEntity<Map<String, String>> saveQuestion(@RequestBody QuizQuestion question) {
        var response = new HashMap<String, String>();
        var uid = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        question.setUid(uid);
        var questionRepository = quizQuestionRepository.save(question);
        response.put("id", questionRepository.getId().toString());
        response.put("uid", questionRepository.getUid());
        return ResponseEntity.ok(response);
    }

    @Transactional
    @PatchMapping("/quiz-question/{uid}")
    public Integer updateQuestion(@RequestBody QuizQuestion question, @PathVariable String uid) {
        var id = findQuestionForEdit(uid).map(QuizQuestion::getId).orElseThrow();
        question.setId(id);
        System.out.println("Updating question: " + question);
        quizQuestionRepository.save(question);
        return id;
    }

    @Transactional
    @GetMapping("/quiz-question/{id}/answers")
    public ResponseEntity<Answers> getAnswers(@PathVariable Integer id) {
        return response(findQuestion(id).map(Answers::from));
    }

    private Optional<QuizQuestion> findQuestion(Integer id) {
        return quizQuestionRepository.findById(id);
    }

    private Optional<QuizQuestion> findQuestionForEdit(String uid) {
        return quizQuestionRepository.findByUid(uid);
    }

    private <T> ResponseEntity<T> response(Optional<T> entity) {
        return entity
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
