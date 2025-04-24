<script>
    // @ts-nocheck
    
    let username = '';
    let password = '';
    let email = '';
    let loggedInUser = null;
    let errorMessage = '';
    let successMessage = '';
    
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