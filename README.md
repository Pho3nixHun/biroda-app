
![](https://img.shields.io/github/stars/Pho3nixHun/biroda-app.svg) ![](https://img.shields.io/github/forks/Pho3nixHun/biroda-app.svg) ![](https://img.shields.io/github/tag/Pho3nixHun/biroda-app.svg) ![](https://img.shields.io/github/release/Pho3nixHun/biroda-app.svg)

# Biroda-APP
### Made for
![](https://user-images.githubusercontent.com/4687621/104239311-9cd61e00-545a-11eb-9b1a-29ea3b31c9f6.png)


**Table of Contents**

[TOCM]

[TOC]

### Features

- Movie catalog with sections, carousels, tiles and promotional spot based on latest Angular version.
- Details about the selected movie or TV show
- Live text search
- Caching server based on server responses. (in-memory only)
- Advanced server logging. (Might need some tweaks still)
- Fully configurable server.
- Docker container for development and for production (TODO, based on requirements)
- VSCode configs included


### Images

OnDemand screen

![](https://user-images.githubusercontent.com/4687621/104238662-a7dc7e80-5459-11eb-95c0-289423814231.png)

Details screen

![](https://user-images.githubusercontent.com/4687621/104238646-a6ab5180-5459-11eb-9ec4-84274ec86d96.png)


### How to run the project

>First fill in ```TMDB_API_KEY``` and ```TMDB_ACCESS_TOKEN``` in ```docker.env``` file
>then,
>``` npm run dev ```
> this will build and start a docker container for you
> In the container 
> ```npm i ts-node ts-node-dev tsc typescript -g```
> ```/srv/app/client: npm i && npm run start```
> ```/srv/app/server: npm i && npm run start```
> In case you need to change port or cache or something server related, consult with ```/srv/persistent/config.json```


### TODOS

- [x] Add README.md
- [ ] OnDemand animations
- [ ] Details animations
- [ ] Cleanup types
- [ ] Write tests or invent an AI to write it for me (Maybe GPT3 will worth it) :smiley:
- [ ] Persistent caching on server
- [ ] Setup logs on server side
- [ ] Aggregate data to be able to show movie length on tiles
- [ ] Implement service worker for caching client side
- [ ] Reach PWA status
- [ ] User management
- [ ] Link movies to stream platforms (netflix, amazon, disney, hbo)