import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Cache from 'koa-rest-cache';

import WikiService from '@services/wiki';
import TMDBService from '@services/tmdb';

export const main = async (config: any) => {
    const wikiService = new WikiService(process.env.WIKI_API, process.env.WIKI_ORIGIN);
    const tmdbService = new TMDBService(process.env.TMDB_API_V3, process.env.TMDB_ACCESS_TOKEN, process.env.TMDB_API_KEY)
    
    const app = new Koa();
    const router = new Router();
    const { port, host, api: { cache } } = config.server;

    router.get('/api/wiki/:title/:sentences*', async (ctx: Koa.Context) => {
        const { params: { title, sentences } } = ctx;
        const [page] = await wikiService.search(title);
        const summary = await wikiService.getPageSummary(page.title, sentences);
        ctx.body = summary;
    });
    
    router.get('/api/tmdb/popular', async (ctx: Koa.Context) => {
        const { params: { title } } = ctx;
        ctx.body = await tmdbService.popular();
        ctx.type = 'json'
    })
    router.get('/api/tmdb/toprated', async (ctx: Koa.Context) => {
        const { params: { title } } = ctx;
        ctx.body = await tmdbService.topRated();
        ctx.type = 'json'
    })
    router.get('/api/tmdb/movie/:id', async (ctx: Koa.Context) => {
        const { params: { id } } = ctx;
        ctx.body = await tmdbService.details(id);
        ctx.type = 'json'
    })

    const server = app
        .use(Cache(cache))
        .use(router.routes())
        .use(Static(config.server.public))
        .listen(port, host, console.log.bind(console, `Listening on port ${host}:${port}`));

    return server;
}

export const beforeExit = async ({ exit = false, signal = false }) => {
    if (exit) {
        console.log('Clean exit, cleaning up...')
    } else if (signal) {
        console.log('Dirty exit, cleaning up...')
    }
}
