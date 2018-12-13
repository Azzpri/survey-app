let previousQuestion;
let previousValue;

/**
 * Показать вопросы
 */
function showQuestions() {
    const emailLabel = document.querySelector(".email-error");
    const emailInput = document.querySelector("input[type=email]");

    if (!emailInput.validity.valid) {
        emailLabel.className = emailLabel.className.replace("d-none", "");
        return;
    }

    let questionBlock = document.getElementById("question-block");
    let emailBlock = document.getElementById("email-block");
    emailBlock.className = "d-none";
    questionBlock.className = questionBlock.className.replace("d-none", "");
}

/**
 * Выбор значения
 * @param questionId
 * @param value
 * @param e
 */
function selectRange(questionId, value, e) {
    console.log(e);
    e.target.className += " active";

    // Присвоение значений к формам
    let input = document.getElementById("question_" + questionId);
    input.value = value;

    // удалить ошибку если есть
    const query = ".question_" + questionId + "_error";
    let errorLabel = document.querySelector(query);
    if (errorLabel.className.indexOf("d-none") < 0) {
        errorLabel.className += " d-none";
    }

    /**
     * Акттивная шкала
     */
    if (previousQuestion === questionId) {
        let previousBtn = document.getElementById("question-" + previousQuestion + "-btn-" + previousValue);
        previousBtn.className = previousBtn.className.replace("active", "");
    }

    previousQuestion = questionId;
    previousValue = value;
}

/**
 * Валидация полкй
 * @param e
 */
function validate(e) {
    const form = document.querySelectorAll("form input");

    /**
     * Показывает error тексты
     */
    form.forEach(item => {
        if (item.value === "") {
            e.preventDefault();
            const query = "." + item.id + "_error";
            let errorLabel = document.querySelector(query);
            errorLabel.className = errorLabel.className.replace("d-none", "");
        }

        const img = document.getElementById("selected_image").src;
        if (img === "") {
            const query = ".photo_error";
            let errorLabel = document.querySelector(query);
            errorLabel.className = errorLabel.className.replace("d-none", "");
        }

    });

    /**
     * Скролл к ошибкам
     */
    form.forEach(item => {
        if (item.value === "") {
            e.preventDefault();
            const errorPosition = document.getElementById(item.id).offsetTop;

            window.scrollTo(
                {
                    behavior: "smooth",
                    top: errorPosition,
                    left: 0
                }
            );
            return;
        }
    });

}

function previewImg(e) {
    let input = e.target || e.srcElement;

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (ev) {
            document.getElementById("selected_image").src = ev.target.result;
            // удалить ошибку если есть
            const query = ".photo_error";
            let errorLabel = document.querySelector(query);
            if (errorLabel.className.indexOf("d-none") < 0) {
                errorLabel.className += " d-none";
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}