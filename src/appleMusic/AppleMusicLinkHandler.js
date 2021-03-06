import { MusicInformation } from "../core/MusicInformation";
import axios from 'axios';

class AppleMusicLinkHandler {
    httpClient;
    musicKit;

    constructor() {
        let developerToken = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijg5N0E1RkE4WkEifQ.eyJpYXQiOjE1MzAxMDUwNjQsImV4cCI6MTU0NTY1NzA2NCwiaXNzIjoiWkY5OUdFOVI1VyJ9.JRN6e__NCO8Yjhj2ynJV20RbPOuNDo9WLcR_lYg1B348ea4BembEqraV53MF-c14jxKYk_0pRjjJlhmF3lkmdw";
        
        this.httpClient = axios.create({
            baseURL: "https://api.music.apple.com/",
            headers: {
                "Authorization": "Bearer " + developerToken    
            }
        });
        this.musicKit = window.MusicKit.getInstance();
    }

    getLink(information) {
        let searchTerm = information.artist;
        let searchType = "artists";
        if (information.mediaType === "album") {
            searchType = "albums"
            searchTerm += " "+information.album;
        }
        else if (information.mediaType === "song") {
            searchType = "songs"
            searchTerm += " "+information.album;
            searchTerm += " "+information.song;
        }

        return new Promise((resolve, reject) => {
            let musicKit = window.MusicKit.getInstance();
            musicKit.api.search(searchTerm, {
                types: searchType,
                limit: "1"
            }).then((response) => {
                let searchResults = response.songs.data;
                if (searchResults.length > 0) {
                    let searchResult = searchResults[0];
                    let link = searchResult.attributes.url;

                    resolve(link);
                    return;
                }
                resolve();
            }).catch((reason) => {
                reject(reason);
            });
        });

        // return new Promise((resolve, reject) => {
        //     this.httpClient.get("/v1/catalog/de/search", {
        //         params: {
        //             term: searchTerm,
        //             limit: "1",
        //             types: searchType
        //         },
        //         paramsSerializer: null
        //     }).then(function(response) {
        //         let searchResults = response.data.data;
        //         if (searchResults.length > 0) {
        //             let searchResult = searchResults[0];
        //             let link = searchResult.attributes.url;

        //             resolve(link);
        //             return;
        //         }
        //         resolve(null);
        //     }).catch(() => {
        //         reject();
        //     });
        // });
    }

    getInformations(link) {
        let url = new URL(link);
        if (this.isArtistLink(url)) {
            return this.searchArtist(url);
        }
        else if (this.isAlbumLink(url)) {
            return this.searchAlbum(url);
        }
        else if (this.isSongLink(url)) {
            return this.searchSong(url);
        }

        return null;
    }
    // Artist
    isArtistLink(url) {
        return url.pathname.includes("artist");
    }

    getArtistId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    searchArtist(url) {
        let artistId = this.getArtistId(url);
        return new Promise((resolve, reject) => {
            this.httpClient.get("/v1/catalog/de/artists/" + artistId).then(function(response) {
                let appleMusicArtist = response.data.data[0];

                let information = new MusicInformation();
                information.mediaType = "artist";
                information.artist = appleMusicArtist.attributes.name;
                resolve(information);
            }).catch(() => {
                reject();
            });
        });
    }

    // Album
    isAlbumLink(url) {
        let isAlbum = url.pathname.includes("album");
        let isSong = url.searchParams.get("i") != null;

        return isAlbum && !isSong;
    }

    getAlbumId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    searchAlbum(url) {
        let albumId = this.getAlbumId(url);
        return new Promise((resolve, reject) => {
            this.httpClient.get("/v1/catalog/de/albums/" + albumId).then(function(response) {
                let appleMusicAlbum = response.data.data[0];

                let information = new MusicInformation();
                information.mediaType = "album";
                information.artist = appleMusicAlbum.attributes.artistName;
                information.album = appleMusicAlbum.attributes.name;
                resolve(information);
            }).catch(() => {
                reject();
            });
        });
    }

    // Song
    isSongLink(url) {
        let isAlbum = url.pathname.includes("album");
        let isSong = url.searchParams.get("i") != null;

        return isAlbum && isSong;
    }

    getSongId(url) {
        return url.searchParams.get("i");
    }

    searchSong(url) {
        let songId = this.getSongId(url);
        return new Promise((resolve, reject) => {
            this.httpClient.get("/v1/catalog/de/songs/" + songId).then(function(response) {
                let appleMusicSong = response.data.data[0];

                let information = new MusicInformation();
                information.mediaType = "song";
                information.artist = appleMusicSong.attributes.artistName;
                information.album = appleMusicSong.attributes.albumName;
                information.song = appleMusicSong.attributes.name;
                resolve(information);
            }).catch(() => {
                reject();
            });
        });
    }
}

export default AppleMusicLinkHandler;