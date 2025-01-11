import rss, { pagesGlobToRssItems } from "@astrojs/rss";

async function GET(context) {
    return rss({
        title: 'Astro Learner | Blog',
        description: 'My journey learning Astro',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob("../pages/posts/*.md")),
        customData: `<language>en-us</language>`,
    });
}

export default GET;