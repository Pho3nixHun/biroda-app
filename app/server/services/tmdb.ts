import Service from './service';
import fetch from 'node-fetch';
import * as querystring from 'querystring';

export enum RESOURCE {
    POPULAR = 'movie/popular',
    TOP_RATED = 'movie/top_rated',
    DETAILS = 'movie',
    LIST = 'list'
}

export default class TMDBService implements Service {

    private get fetchOptions() {
        return {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${this.token}`
            }
        }
    }

    constructor (private apiUrl: string, private token: string, private key: string) {
        
    }

    async read(resource:string, params = {}) {
        const qs = Object.assign({
            language: 'us-EN',
            api_key: this.key
        }, params)
        const url = `${this.apiUrl}${resource}?${querystring.stringify(qs)}`;
        const response = await fetch(url);
        return response.json();
    }

    async topRated(page=1, language?) {
        return this.read(RESOURCE.TOP_RATED, {page, language})
    }

    async popular(page=1, language?) {
        return this.read(RESOURCE.POPULAR, {page, language})
    }

    async details(movieId, language?) {
        return this.read(`${RESOURCE.DETAILS}/${movieId}`, { language });
    }

    async list(listId: string | number, language?) {
        return this.read(`${RESOURCE.LIST}/${listId}`, { language });
    }
}