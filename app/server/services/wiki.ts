import Service from './service';
import * as querystring from 'querystring';
import fetch from 'node-fetch';

const removeUndefined = (obj: {[key: string]: any}): {[key: string]: any} => {
    return Object.keys(obj).reduce((acc, key) => {
        (obj[key] ?? true) && (acc[key] = obj[key]);
        return acc;
    }, {});
}

export default class WikiService implements Service {

    private get fetchOptions() {
        return {
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            headers: {
        
            }
        }
    }

    constructor(private readonly apiUrl, private readonly origin = '*') {

    }

    async read(params): Promise<any> {
        const qs: any = removeUndefined(
            Object.assign(
                {
                    format: 'json',
                    action: 'query',
                    redirects: '',
                },
                params,
                {
                    origin: this.origin
                }
            )
        );
        const url = `${this.apiUrl}?${querystring.stringify(qs)}`;
        const response = await fetch(
            url,
            this.fetchOptions
        )
        const result = await response.json();
        if (result.error) {
            throw new Error(result.error.info);
        }
        return result;
    }

    private handleRedirect = (res) => {
        if (res.query.redirects && res.query.redirects.length === 1) {
			return this.read({
				prop: 'info|pageprops',
				inprop: 'url',
				ppprop: 'disambiguation',
				titles: res.query.redirects[0].to
			});
		}
		return res;
    }

    async search(query: string, limit:number = 1) {
        const result = await this.read({
            list: 'search',
            srsearch: query,
            srlimit: limit
        }).catch(err => err);
        if (result instanceof Error && result.message === '"text" search is disabled.') {
            return this.openSearch(query, limit);
        }
        return result?.query?.search;
    }

    async openSearch(query: string, limit: number = 1) {
        const result = await this.read({
            search: query,
            limit,
            namespace: 0,
            action: 'opensearch'
        });
        return result[1];
    }

    async getPageSummary(title: string, sentences?) {
        const result = await this.read({
            prop: 'info|pageprops',
			inprop: 'url',
			ppprop: 'disambiguation',
			titles: title
        }).then(this.handleRedirect);
        const id = Object.keys(result.query.pages)[0];
        if (!id || id === '-1') {
            throw new Error('No such article');
        }
        
        return this.summary(result.query.pages[id], sentences);
    }

    private async summary(pageInfo, sentences) {
        const readConfig = {
			prop: 'extracts',
			explaintext: '',
			exintro: '',
			titles: pageInfo.title
		}
        sentences && Object.assign(readConfig, { exsentences: sentences })
        const result = await this.read(readConfig);
        return result.query.pages[pageInfo.pageid].extract;
    }
}
