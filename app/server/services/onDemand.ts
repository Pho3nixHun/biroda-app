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
                    id: 'popular',
                    name: 'Popular',
                    aspot: { 
                        image: 'https://image.tmdb.org/t/p/w1920/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
                        defaultImage: 'https://image.tmdb.org/t/p/w500/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
                        id: 464052,
                        title: 'Wonder Woman 1984'
                    }
                },
                { id: 'toprated', name: 'Top Rated' },
                { id: 'comedy', name: 'Comedy' },
                { id: 'action', name: 'Action' },
                { id: 'drama', name: 'Drama' },
                { id: 'kids', name: 'Kids' },
                { id: 'adult', name: 'Adult' }
            ],
            sections: [
                {
                    id: 'popular',
                    collections: [ 5 ]
                }
            ]
        }
    }
}

export default class OnDemandService {
    constructor (private tmdbService: TmdbService, private wikiService: WikiService) {
        
    }

    async section(id: string, region: REGION = REGION.HU) {
        const { collections } = DB.regions[region]?.sections.find(layout => layout.id === id);
        const response = await Promise.all(collections.map(list => this.tmdbService.list(list)));
        return response;
    }

    async layout(region: REGION = REGION.HU) {
        return DB.regions[region]?.layout;
    }

    async carousel(id: string) {
        return this.tmdbService.list(id);
    }

    async details(id: string) {
        return this.tmdbService.details(id);
    }
}