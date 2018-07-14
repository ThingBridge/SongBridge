import { MusicInformation } from "../core/MusicInformation";

export class AppleMusicLinkHandler {
    getInformations(link) {
        var informations = new MusicInformation();
        informations.source = "appleMusic"
        let url = new URL(link);
        if (this.isArtistLink(url)) {
            informations.mediaType = "artist"
            informations.id = this.getArtistId(url)
            return informations
        }
        else if (this.isAlbumLink(url)) {
            informations.mediaType = "album"
            informations.id = this.getAlbumId(url)
            return informations
        }
        else if (this.isSongLink(url)) {
            informations.mediaType = "song"
            informations.id = this.getSongId(url)
            return informations
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
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediaType=artist&source=applemusic&id=${artistId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
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
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediatype=album&source=applemusic&id=${albumId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
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
            xhttp.open(`GET`, `http://localhost:8080/bridge?mediatype=song&source=applemusic&id=${songId}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
        });
    }
}