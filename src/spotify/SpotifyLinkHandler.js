import { MusicInformation } from "../core/MusicInformation";
import { URLCheck } from "../core/URLCheck";

class SpotifyLinkHandler {
    accessToken;

    constructor() {
        this.fetchAccessToken();
    }

    fetchAccessToken() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let result = JSON.parse(xhttp.responseText);
                this.accessToken = result["access_token"];
                setTimeout(this.fetchAccessToken, 3300000)
            }
            else if (this.readyState === 4) {
                this.accessToken = null;
                setTimeout(this.fetchAccessToken, 3300000)
            }
        }
        xhttp.open(`POST`, `https://accounts.spotify.com/api/token`, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Authorization", "Basic ZGM4N2QyNWE2MzVkNGQ1Njg0NGFhYWFiYTQ2MjA2NDA6YTM3Nzk2ZDk0MWQyNDhjZGJlZjRkODQ2MWI1YTA3ZWU=");        
        xhttp.send("grant_type=client_credentials");
    }

    getInformations(link) {
        let urlChecker = new URLCheck();
        if (urlChecker.isURLValid(link)){
            let url = new URL(link);
            if (this.isArtistLink(url)) {
                return this.searchArtist(url);
            }
            else if (this.isAlbumLink(url)) {
                return this.searchAlbum(url);
            }
            else if (this.isTrackLink(url)) {
                return this.searchTrack(url);
            }else{
                return null;
            }
        }
        else {
            return null;
        }
                 
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
        let accessToken = this.accessToken;

        return new Promise((resolve, reject) => {
            if (accessToken == null) {
                reject();
                return;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let result = JSON.parse(xhttp.responseText);
                        let information = new MusicInformation();
                        information.mediaType = "artist";
                        information.artist = result.name;
                        resolve(information);
                    }
                    else if (this.readyState === 4) {
                        reject();
                    }
                }
            xhttp.open(`GET`, `https://api.spotify.com/v1/artists/${artistId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");
            xhttp.setRequestHeader("Authorization", "Bearer BQAelY_GwGS5fbQmTFqjTM5ra3J48uw0N8pDd2zxutS7lQrp5rghfa0O5lzEUhPi_SDla74yKVHxT2EMQFQ");        
            xhttp.send();
        });
        
    }

    // Album
    isAlbumLink(url) {
        return url.pathname.includes("album");
    }

    getAlbumId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    searchAlbum(url) {
        let albumId = this.getAlbumId(url);
        let accessToken = this.accessToken;
        return new Promise((resolve, reject) => {
            if (accessToken == null) {
                reject();
                return;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let result = JSON.parse(xhttp.responseText);
                    let information = new MusicInformation();
                    information.mediaType = "album";
                    information.artist = result.artists["0"].name;
                    information.album = result.name;    
                    resolve(information);
                }
                else if (this.readyState === 4) {
                    reject();
                }
            }
            xhttp.open(`GET`, `https://api.spotify.com/v1/albums/${albumId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");
            xhttp.setRequestHeader("Authorization", "Bearer BQAelY_GwGS5fbQmTFqjTM5ra3J48uw0N8pDd2zxutS7lQrp5rghfa0O5lzEUhPi_SDla74yKVHxT2EMQFQ");
            xhttp.send();
        });
    }

    // Track
    isTrackLink(url) {
        return url.pathname.includes("track");
    }

    getTrackId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    searchTrack(url) {
        let trackId = this.getTrackId(url);
        let accessToken = this.accessToken;
        return new Promise((resolve, reject) => {
            if (accessToken == null) {
                reject();
                return;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let result = JSON.parse(xhttp.responseText);
                    let information = new MusicInformation();
                    information.mediaType = "song";
                    information.artist = result.artists["0"].name;
                    information.album = result.album.name;;
                    information.song = result.name;
                    resolve(information);
                }
                else if (this.readyState === 4) {
                    reject();
                }
            }
            xhttp.open(`GET`, `https://api.spotify.com/v1/tracks/${trackId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");
            xhttp.setRequestHeader("Authorization", "Bearer BQAelY_GwGS5fbQmTFqjTM5ra3J48uw0N8pDd2zxutS7lQrp5rghfa0O5lzEUhPi_SDla74yKVHxT2EMQFQ");
            xhttp.send();
        });
    }
}

export default SpotifyLinkHandler;