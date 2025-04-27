<script>
	// @ts-nocheck
    import { onMount } from "svelte";
    import Upper from "$lib/upper.svelte";

    let questions = [];
	let question = '';
	let currentQuestionIndex = 0;
    let option1 = '';
    let option2 = '';
    let option3 = '';
    let answer = '';
    let difficulty = '';
    let score = 0;
    let message = '';
    let selectedOption = null;
    let isDisabled = false;
	let number = 5;
	let showLoginPrompt = false;
	let username = '';
	let password = '';
	let fetchedQuestions = [];

	function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            question = currentQuestion.text;
            option1 = currentQuestion.option1;
            option2 = currentQuestion.option2;
            option3 = currentQuestion.option3;
            answer = currentQuestion.answer;
            difficulty = currentQuestion.difficulty;
			selectedOption = null;
            isDisabled = false;
        } else {
            showLoginPrompt = true;
        }
    }

	async function handleLogin() {
		let loggedInUser = username;
        try {
            const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: loggedInUser,
                password,
            }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                try {
					const response = await fetch('http://localhost:3000/api/saveScore', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ name: loggedInUser, score }),
					});
					if (!response.ok) {
						throw new Error('Failed to save score');
					}
					alert('Score saved successfully!');
					window.location.href = '/';
				} catch (error) {
					console.error('Error saving score:', error);
				}
            } else {
				alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during login');
        }
    }

	async function fetchQuestions() {
        try {
            const response = await fetch('http://localhost:3000/api/getQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ limit: 5, excludeIds: [] }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch questions');
            }

            questions = await response.json();
            loadQuestion(); // Load the first question
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    async function getQuestion() {
        try {
            const response = await fetch('http://localhost:3000/api/getQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ excludeIds: fetchedQuestions }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch question');
            }
            const data = await response.json();
            question = data[0].text;
            option1 = data[0].option1;
            option2 = data[0].option2;
            option3 = data[0].option3;
            answer = data[0].answer;
            difficulty = data[0].difficulty;
            selectedOption = null;
            isDisabled = false;

			fetchedQuestions.push(data[0].id);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    }

    function handleAnswer(selected) {
        if (isDisabled) return;
        isDisabled = true;
        selectedOption = selected;
        if (selected === answer) {
            score++;
            message = 'Correct! Well done.';
        } else {
            message = `Incorrect. The correct answer was: ${answer}`;
        }
        setTimeout(() => {
            message = '';
            currentQuestionIndex++;
            loadQuestion();
        }, 5000);
    }

    onMount(() => {
        fetchQuestions();
    });
</script>

<div class="container">
    <Upper/>
    <div>
        <h1>{question}</h1>
        <div class="horizontal">
            <p>Difficulty: <span class="difficulty_{difficulty.toLowerCase()}">{difficulty}</span></p>
            <p>Score: {score}</p>
        </div>
        <button 
            on:click={() => handleAnswer(1)} 
            class="option {selectedOption === 1 ? (selectedOption === answer ? 'correct' : 'incorrect') : (selectedOption !== null && answer !== 1 ? 'incorrect' : '')}"
            disabled={isDisabled}>
            <h3>{option1}</h3>
        </button>
        <button 
            on:click={() => handleAnswer(2)} 
            class="option {selectedOption === 2 ? (selectedOption === answer ? 'correct' : 'incorrect') : (selectedOption !== null && answer !== 2 ? 'incorrect' : '')}"
            disabled={isDisabled}>
            <h3>{option2}</h3>
        </button>
        <button 
            on:click={() => handleAnswer(3)} 
            class="option {selectedOption === 3 ? (selectedOption === answer ? 'correct' : 'incorrect') : (selectedOption !== null && answer !== 3 ? 'incorrect' : '')}"
            disabled={isDisabled}>
            <h3>{option3}</h3>
        </button>
        <p>{message}</p>
    </div>

	{#if showLoginPrompt}
    <div class="login-prompt">
        <h2>Game Over! Your score is: {score}</h2>
        <p>You can log in to save your score:</p>
        <input type="text" placeholder="Enter your username" bind:value={username} />
		<input type="password" placeholder="Enter your password" bind:value={password} />
        <button on:click={() => handleLogin()}>Save Score</button>
        <button on:click={() => (window.location.href = '/')}>Stay as Guest</button>
    </div>
    {/if}
</div>

<style>
    .container {
        font-family: Arial, sans-serif;
        background-color: rgb(50, 47, 47);
        margin: 0;
        padding: 20px;
        color: white;
    }

    .option {
        display: block;
        width: 100%;
        padding: 15px;
        margin: 10px 0;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .option:disabled {
        background-color: gray;
        cursor: not-allowed;
    }

    .option.correct {
        background-color: green;
    }

    .option.incorrect {
        background-color: rgb(92, 5, 5);
    }

    .option:hover:not(:disabled) {
        background-color: #555;
    }

    p {
        font-size: 20px;
        color: white;
        margin-top: 10px;
        font-weight: bold;
    }

    .difficulty_easy {
        color: green;
    }

    .difficulty_medium {
        color: orange;
    }

    .difficulty_hard {
        color: red;
    }

    .difficulty_extreme {
        color: purple;
    }

    .horizontal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

	.login-prompt {
        background-color: #222;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: 20px;
    }

    .login-prompt input {
        padding: 10px;
        margin: 10px 0;
        width: 80%;
        border: none;
        border-radius: 5px;
    }

    .login-prompt button {
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .login-prompt button:hover {
        background-color: #555;
    }
</style>