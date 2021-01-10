import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Cache from 'koa-rest-cache';
import * as cors from '@koa/cors';

import WikiService from '@services/wiki';
import TMDBService from '@services/tmdb';
import OnDemandService from '@services/onDemand';

import LoggerRouteGenerator from '@routes/logger';

export const main = async (config: any) => {
    const wikiService = new WikiService(process.env.WIKI_API, process.env.WIKI_ORIGIN);
    const tmdbService = new TMDBService(process.env.TMDB_API_V3, process.env.TMDB_ACCESS_TOKEN, process.env.TMDB_API_KEY)
    const onDemandService = new OnDemandService(tmdbService, wikiService);

    const app = new Koa();
    const router = new Router();
    const { port, host, api: { cache }, logs, ["persistent-storage"]: storage } = config.server;

    // TODO: Remove in production
    app.use(cors());

    const loggerRoutes = LoggerRouteGenerator(logs, storage);
    loggerRoutes.forEach(route => app.use(route));

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
    router.get('/api/ondemand/layout/:region*', async (ctx: Koa.Context) => {
        //TODO: Resolve region by client's IP
        const { params: { region } } = ctx;
        ctx.type = 'json'
        try {
            ctx.body = await onDemandService.layout(region);
        } catch (ex) {
            ctx.body = ex.message;
            ctx.status = 500;
        }
    })
    router.get('/api/ondemand/section/:id', async (ctx: Koa.Context) => {
        const { params: { id } } = ctx;
        ctx.body = await onDemandService.section(id);
        ctx.type = 'json'
    })
    router.get('/api/ondemand/carousel/:id', async (ctx: Koa.Context) => {
        const { params: { id } } = ctx;
        ctx.body = await onDemandService.details(id);
        ctx.type = 'json'
    })
    router.get('/api/ondemand/details/:id', async (ctx: Koa.Context) => {
        const { params: { id } } = ctx;
        ctx.body = await onDemandService.details(id);
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
