import Service from './service';
import TmdbService from './tmdb';
import WikiService from './wiki';

export type Section = {
    name: string,
    id: string,
    aspot?: {
        image: string,
        defaultImage: string
    }
}

export enum REGION {
    HU = 'HU'
}

// TODO: Replace with proper database
const DB = {
    regions: {
        'HU': {
            layout: [
                { 
                    id: 'comics',
                    name: 'DC vs. Marvel',
                    aspot: { 
                        image: 'https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
                        defaultImage: 'https://image.tmdb.org/t/p/w200/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
                        id: 464052,
                        title: 'Wonder Woman 1984'
                    }
                },
                {
                    id: 'popular',
                    name: 'Popular',
                    aspot: {
                        image: 'https://www.themoviedb.org/t/p/original/rLJaTJSuRHhRiLIKMMedfHM8KQR.jpg',
                        defaultImage: 'https://www.themoviedb.org/t/p/w200/rLJaTJSuRHhRiLIKMMedfHM8KQR.jpg',
                        id: 527774,
                        title: 'Raya and the Last Dragon'
                    }
                },
                { id: 'toprated', name: 'Top Rated' },
                {
                    id: 'comedy',
                    name: 'Sit Coms',
                    aspot: { 
                        image: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/ngoiHQul4QetfA62SdmZZOdDFAP.jpg',
                        id: '1418-the-big-bang-theory',
                        title: 'The Big Bang Theory'
                    }
                },
                { id: 'oscars', name: 'Oscars' },
                { id: 'tv', name: 'TV Shows' },
                { id: 'horror', name: 'Horror' },
                { id: 'kids', name: 'Kids' }
            ],
            sections: [
                {
                    id: 'popular',
                    collections: [ 1, 3, 2 ]
                },
                {
                    id: 'oscars',
                    collections: [ 10291, 10288, 2278, 2, 4 ]
                },
                {
                    id: 'comics',
                    collections: [ 1, 3, 5 ]
                },
                {
                    id: 'toprated',
                    collections: [ 5, 22347, 4 ]
                },
                {
                    id: 'comedy',
                    collections: [ 7071907, 7071905, 22347 ]
                },
                {
                    id: 'tv',
                    collections: [ 22347, 7071907, 22343 ]
                },
                {
                    id: 'horror',
                    collections: [ 122354, 3, 5 ]
                },
                {
                    id: 'kids',
                    collections: [ 1, 3, 5 ]
                }
            ]
        }
    }
}

const POSTER_PREFIX_W200 = "https://www.themoviedb.org/t/p/w200";
const POSTER_PREFIX_W400 = "https://www.themoviedb.org/t/p/w400";
const BACKDROP_PREFIX = "https://www.themoviedb.org/t/p/original";

export default class OnDemandService {
    constructor (private tmdbService: TmdbService, private wikiService: WikiService) {
        
    }

    async section(id: string, region: REGION = REGION.HU) {
        const { collections } = DB.regions[region]?.sections.find(layout => layout.id === id);
        const response = await Promise.all(collections.map(list => this.carousel(list)));
        return response;
    }

    async layout(region: REGION = REGION.HU) {
        return DB.regions[region]?.layout;
    }

    async carousel(id: string|number) {
        const list = await this.tmdbService.list(id);
        (list.items || []).forEach(item => {
            item.poster_path = `${POSTER_PREFIX_W200}${item.poster_path}`;
            item.backdrop_path = `${BACKDROP_PREFIX}${item.backdrop_path}`;
        });
        return list;
    }

    async details(id: string) {
        const [tmdbResult, tmdbRecommendations ] = await Promise.all([
            this.tmdbService.details(id),
            this.tmdbService.recommendations(id)
        ]);
        const [page] = await this.wikiService.search(tmdbResult.title);
        const summary = await this.wikiService.getPageSummary(page.title, 5);
        tmdbResult.poster_path = `${POSTER_PREFIX_W400}${tmdbResult.poster_path}`;
        tmdbResult.backdrop_path = `${BACKDROP_PREFIX}${tmdbResult.backdrop_path}`;
        tmdbResult.wiki = {
            page, summary
        };
        tmdbResult.recommendations = {
            items: tmdbRecommendations
                .results
                .map(item =>
                    Object.assign(item, { 
                        poster_path: `${POSTER_PREFIX_W200}${item.poster_path}`,
                        backdrop_path: `${BACKDROP_PREFIX}${item.backdrop_path}`
                    })
                ),
            title: 'Recommendations'
        };
        return tmdbResult;
    }
    async search(query: string) {
        const result = await this.tmdbService.search(query);
        return result.results.map(item => {
            return {
                title: item.title,
                id: item.id
            }
        })
    }
}