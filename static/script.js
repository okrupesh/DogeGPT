document.addEventListener('DOMContentLoaded', () => {
    const answerButton = document.querySelector('.answer-button');
    const questionForm = document.querySelector('.question-form');
    const questionInput = document.querySelector('.question-input');
    const counter = document.querySelector('.counter');
    let currentCounter = parseInt(counter.innerText.split(':')[1].trim());

    answerButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const question = questionInput.value;
        if (question.trim() === '') return;
        
        const response = await fetch('/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        displayAnswer(data.response);
        questionForm.reset();
        updateCounter();
    });

    function displayAnswer(answer) {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');

        const questionText = document.querySelector('.question-text');
        const question = questionText.textContent;
        const questionElement = document.createElement('p');
        questionElement.classList.add('question-text');
        questionElement.textContent = question;

        const answerElement = document.createElement('p');
        answerElement.classList.add('answer-text');
        answerElement.textContent = '';

        answerContainer.appendChild(questionElement);
        answerContainer.appendChild(answerElement);
        document.body.appendChild(answerContainer);

        setTimeout(() => {
            questionElement.classList.add('animate-up');
            answerElement.classList.add('animate-writing');
        }, 100);

        const answerText = answer.trim() === '' ? 'woof woof!' : answer;
        animateWriting(answerText, answerElement);
    }

    function animateWriting(text, element) {
        const characters = text.split('');
        let index = 0;
        let writingInterval;

        writingInterval = setInterval(() => {
            if (index < characters.length) {
                element.textContent += characters[index];
                index++;
            } else {
                clearInterval(writingInterval);
                animateBarks(element);
            }
        }, 100);
    }

    function animateBarks(element) {
        const numBarks = getRandomNumber(3, 5); // Randomize number of barks
        let barkCount = 0;

        const barkInterval = setInterval(() => {
            if (barkCount < numBarks) {
                element.textContent += ' bhow!';
                barkCount++;
            } else {
                clearInterval(barkInterval);
                removeAnswer(element);
            }
        }, 400);
    }

    function removeAnswer(element) {
        setTimeout(() => {
            const answerContainer = element.parentNode;
            answerContainer.remove();
        }, 1500);
    }

    function updateCounter() {
        currentCounter += 1;
        counter.innerText = `Questions answered: ${currentCounter}`;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});