import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Static from 'koa-static';
import * as Cache from 'koa-rest-cache';


export const main = async (config: any) => {
    const app = new Koa();
    const router = new Router();
    const { port, host, api: { cache } } = config.server;

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
