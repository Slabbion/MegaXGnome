const solisQuotes = [
    "“The light shines in the darkness, and the darkness has not overcome it.” — John 1:5",
    "“To everything there is a season, and a time for every purpose under heaven.” — Ecclesiastes 3:1",
    "“As above, so below.” — Hermetic Texts",
    "“Let there be light.” — Genesis 1:3",
    "“He who knows others is wise; he who knows himself is enlightened.” — Lao Tzu",
    "“You are the light of the world. A city on a hill cannot be hidden.” — Matthew 5:14",
    "“The lips of wisdom are closed, except to the ears of understanding.” — The Kybalion",
    "“With Him are wisdom and strength, He has counsel and understanding.” — Job 12:13"
  ];

  function getSolisQuote() {
    const quote = solisQuotes[Math.floor(Math.random() * solisQuotes.length)];
    document.getElementById("solis-quote").textContent = quote;
  }