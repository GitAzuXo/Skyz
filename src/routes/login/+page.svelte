<script>
    // @ts-nocheck
    
    let username = '';
    let password = '';
    let email = '';
    let loggedInUser = null;
    let errorMessage = '';
    let successMessage = '';
    let question = '';
    let answer = '';
    let option1 = '';
    let option2 = '';
    let option3 = '';
    let difficulty = '';
    
    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password,
            }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                loggedInUser = result.user.name;
                errorMessage = '';
            } else {
                errorMessage = result.message || 'Invalid username or password';
                loggedInUser = null;
            }
        } catch (error) {
            console.error(error);
            errorMessage = 'An error occurred during login';
            loggedInUser = null;
        }
    }
    
    async function handleRegister(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email,
                password,
            }),
            });
            if (!response.ok) {
            // If the response is not OK, parse the error message
            const errorResult = await response.json();
            errorMessage = errorResult.error || 'Registration failed';
            successMessage = '';
            return;
            }

            const result = await response.json();
            successMessage = 'User registered successfully!';
            errorMessage = '';
        } catch (error) {
            console.error(error);
            errorMessage = 'An error occurred during registration';
            successMessage = '';
        }
    }

    async function handleAddQuestion(event) {
    event.preventDefault();

    // Validate fields
    if (!question || !answer || !difficulty || !option1 || !option2 || !option3) {
        alert('All fields are required!');
        return;
    }

    try {
        const payload = {
            question,
            answer: parseInt(answer, 10), // Ensure answer is a number
            difficulty,
            option1,
            option2,
            option3
        };

        console.log('Payload being sent:', payload); // Debugging log

        const response = await fetch('http://localhost:3000/api/addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Convert payload to JSON
        });

        if (!response.ok) {
            const errorResult = await response.json();
            alert('Failed to add question: ' + errorResult.error);
            return;
        }

        const result = await response.json();
        alert('Question added successfully!');

        // Clear the form fields
        question = '';
        answer = '';
        difficulty = '';
        option1 = '';
        option2 = '';
        option3 = '';
    } catch (error) {
        console.error('Error:', error);
        errorMessage = 'An error occurred while adding the question';
        successMessage = '';
    }
}
    </script>
    
    <h2>Login</h2>
    <form on:submit|preventDefault={handleLogin}>
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required />
    
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    
      <button type="submit">Login</button>
    </form>
    
    {#if loggedInUser}
      <p>Welcome, {loggedInUser}!</p>
    {:else if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
    
    <h2>Register</h2>
    <form on:submit|preventDefault={handleRegister}>
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required />
    
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    
      <button type="submit">Register</button>
    </form>
    
    {#if successMessage}
      <p style="color: green;">{successMessage}</p>
    {:else if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}

    {#if loggedInUser == 'Admin'}
        <h2>Admin Panel</h2>
        <p>Welcome to the admin panel !</p>
        <form on:submit|preventDefault={handleAddQuestion}>
            <label for="question">Question:</label>
            <input type="text" id="question" bind:value={question} required />

            <label for="answer">Answer:</label>
            <input type="number" id="answer" bind:value={answer} required />

            <label for="difficulty">Difficulty:</label>
            <input type="text" id="difficulty" bind:value={difficulty} required />

            <label for="Option 1">Option 1:</label>
            <input type="text" id="Option 1" bind:value={option1} required />
            <label for="Option 2">Option 2:</label>
            <input type="text" id="Option 2" bind:value={option2} required />
            <label for="Option 3">Option 3:</label>
            <input type="text" id="Option 3" bind:value={option3} required />

            <button type="submit">Add Question</button>
        </form>
    {/if}