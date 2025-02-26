package cz.scrumdojo.quizmaster.question;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Integer> {

    Optional<QuizQuestion> findByUid(String uid);
}
