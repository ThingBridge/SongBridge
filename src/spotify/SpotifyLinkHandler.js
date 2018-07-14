import { MusicInformation } from "../core/MusicInformation";
import { URLCheck } from "../core/URLCheck";

export class SpotifyLinkHandler {

    constructor() {
    }

    getInformations(link) {
        let musicInformations = new MusicInformation();
        musicInformations.source = "spotify"
        let urlChecker = new URLCheck();
        if (urlChecker.isURLValid(link)){
            let url = new URL(link);
            if (this.isArtistLink(url)) {
                musicInformations.mediaType = "artist"
                musicInformations.id = this.getArtistId(url)
                return musicInformations
            }
            else if (this.isAlbumLink(url)) {
                musicInformations.mediaType = "album"
                musicInformations.id = this.getAlbumId(url)
                return musicInformations
            }
            else if (this.isSongLink(url)) {
                musicInformations.mediaType = "song"
                musicInformations.id = this.getSongId(url)
                return musicInformations
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

        return new Promise((resolve, reject) => {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let result = JSON.parse(xhttp.responseText);
                    resolve(result);
                }
                else if (this.readyState === 4) {
                    reject();
                }
            }
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediaType=artist&source=spotify&id=${artistId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
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
        return new Promise((resolve, reject) => {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let result = JSON.parse(xhttp.responseText);
                    resolve(result);
                }
                else if (this.readyState === 4) {
                    reject();
                }
            }
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediatype=album&source=spotify&id=${albumId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
        });
    }

    // Song
    isSongLink(url) {
        return url.pathname.includes("track");
    }

    getSongId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    searchSong(url) {
        let songId = this.getSongId(url);
        return new Promise((resolve, reject) => {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let result = JSON.parse(xhttp.responseText);
                    resolve(result);
                }
                else if (this.readyState === 4) {
                    reject();
                }
            }
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediatype=song&source=spotify&id=${songId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
        });
    }
}