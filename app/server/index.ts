import { main, beforeExit } from '@app';

(async (configPath: string ) => {
    const config: any | Boolean = await import(configPath)
        .catch(() => false);
    const server = config && main(config);

    const exit = async ({ exit, signal }) => {
        await beforeExit({ exit, signal });
        process.exit(0);
    }

    process.once('exit', exit.bind(null, {exit: true}));
    process.once('SIGINT', exit.bind(null, {signal: true}));
    process.once('SIGUSR1', exit.bind(null, {signal: true}));
    process.once('SIGUSR2', exit.bind(null, {signal: true}));

})(process.argv.slice(2).pop());