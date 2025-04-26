<script>
    // @ts-ignore
    const navigate = (path) => {
        window.location.href = path;
    };
</script>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #292a2c;
        color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    h1 {
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0;
    }

    nav {
        display: flex;
        gap: 1rem;
    }

    button {
        background-color: #5a6266;
        color: #ffffff;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0f0f0f;
    }

    button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
</style>

<header>
    <h1>Skyz</h1>
    <nav>
        <button on:click={() => navigate('/')}>Home</button>
        <button on:click={() => navigate('/quiz')}>Quiz</button>
        <button on:click={() => navigate('/login')}>Login/Register</button>
    </nav>
</header>