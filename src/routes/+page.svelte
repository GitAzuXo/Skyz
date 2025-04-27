<Upper />

<script>
    import Upper from '$lib/upper.svelte';
</script>

  
<style>
      
    header, footer {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    main {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    h1, h2 {
      color: #2e7d32;
      text-align: center;
    }
  
    .start-button {
      display: flex;
      margin-top: 1.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #2e7d32;
      color: #fff;
      justify-content: center;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-left: auto; 
      margin-right: auto; 
      align-items: center;
    }
  
    .start-button:hover {
      background-color: #1b5e20;
    }
  
    ul {
      padding-left: 1.2rem;
    }
</style>
  
<header>
    <h1>Test your knowledge about Green IT and sustainability!</h1>
</header>
  
<main>
    <section>
      <h2>About the Project</h2>
      <p>
        Skyz is a fun and educational quiz designed to raise awareness about Green IT, sustainable technology, and eco-friendly practices.
        We built this website with an environmental mindset: using lightweight code, optimized resources, and minimal environmental impact.
      </p>
    </section>
  
    <section>
      <h2>Meet the Team</h2>
      <p>We worked as a team and co-developed this quiz by developing the website, designing it, and creating the questions. Each member contributed to different aspects of the project: web development, visual design, content writing, and ensuring the site stays lightweight and environmentally friendly.
        Our goal was to build an educational and fun experience while respecting the principles of Green IT.</p>
      <ul>
        <li>Louis Hislaire--Lafon - Developer</li>
        <li>Gaspard Brom - Developer</li>
        <li>Baptiste Fargetton - Developer</li>
        <li>Coline Sorin - Developer</li>
      </ul>
    </section>
  
    <section>
      <h2>How to Play</h2>
      <ul>
        <li>Click "Start Quiz" to begin.</li>
        <li>Answer multiple-choice questions about Green IT and sustainability.</li>
        <li>Challenge yourself and learn new tips to protect our planet!</li>
      </ul>
      <a href="/quiz" class="start-button">Start Quiz</a>
    </section>
</main>
  
<footer>
    <p>Created with love for the planet. 🌍</p>
</footer>
  