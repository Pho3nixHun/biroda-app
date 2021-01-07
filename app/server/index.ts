import { main, beforeExit } from '@app';

(async (configPath: string ) => {
    const config: any | Boolean = await import(configPath)
        .catch(() => false);
    const server = config && main(config);

    process.once('exit', beforeExit.bind(null, {exit: true}));
    process.once('SIGINT', beforeExit.bind(null, {signal: true}));
    process.once('SIGUSR1', beforeExit.bind(null, {signal: true}));
    process.once('SIGUSR2', beforeExit.bind(null, {signal: true}));

})(process.argv.slice(2).pop());