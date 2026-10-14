(async function () {
    const container = document.querySelector(".news-container");
    if (!container) return;

    const originalCards = container.innerHTML;
    const feedUrl = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml";

    try {
        const response = await fetch(feedUrl);

        if (!response.ok) throw new Error("News feed request failed");

        const data = await response.json();

        if (data.status !== "ok" || !Array.isArray(data.items) || data.items.length === 0) {
            throw new Error("No news items found");
        }

        const articles = data.items.slice(0, 3);

        container.innerHTML = articles.map(function (article) {
            const title = String(article.title || "World News");
            const link = String(article.link || "");
            const date = article.pubDate
                ? new Date(article.pubDate).toLocaleDateString()
                : "";

            const safeTitle = title.replace(/[&<>"']/g, function (char) {
                return {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                }[char];
            });

            const safeLink = /^https:\/\/www\.bbc\.co\.uk\/news\//.test(link)
                ? link.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
                : "https://www.bbc.co.uk/news";

            return `
                <article class="news-card">
                    <div class="news-content">
                        <span class="category">WORLD</span>
                        <h3>${safeTitle}</h3>
                        <p>${date ? "Published: " + date : "Latest world news from BBC."}</p>
                        <a href="${safeLink}" target="_blank" rel="noopener noreferrer">
                            Read Original Story &rarr;
                        </a>
                    </div>
                </article>
            `;
        }).join("");
    } catch (error) {
        container.innerHTML = originalCards;
        console.warn("Live news feed unavailable; showing existing news cards.", error);
    }
})();
