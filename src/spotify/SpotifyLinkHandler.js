import { MusicInformation } from "../core/MusicInformation";
import { URLCheck } from "../core/URLCheck";
import { log } from "core-js";

class SpotifyLinkHandler {

    constructor() {
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
        }else{
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
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let result = JSON.parse(xhttp.responseText);
                    let information = new MusicInformation();
                    information.mediaType = "artist";
                    information.artist = result.name;
                    return information;
                }
            }
        xhttp.open(`GET`, `https://api.spotify.com/v1/artists/${artistId}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Authorization", "Bearer BQASjTY6ACazVt6Cg4rCtzZ7zyZZh2z0j6lNvO39EoyJoKdiWGfG");        
        xhttp.send();
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
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(xhttp.responseText);
                let information = new MusicInformation();
                information.mediaType = "album";
                information.artist = result.artists["0"].name;
                information.album = result.name;                
                return information;
            }
        }
        xhttp.open(`GET`, `https://api.spotify.com/v1/albums/${albumId}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Authorization", "Bearer BQASjTY6ACazVt6Cg4rCtzZ7zyZZh2z0j6lNvO39EoyJoKdiWGfG-8vlzzkMJ1ri2bAoOZujd_jXAfVNldGkanD3310svz4IXnG2MfQdR8mz6__OcTa1hnKu-vUAGCA10cuUMWrhcZNrpEA");
        xhttp.send();
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
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(xhttp.responseText);
                let information = new MusicInformation();
                information.mediaType = "song";
                information.artist = result.artists["0"].name;
                information.album = result.album.name;;
                information.song = result.name;
                return information;
            }
        }
        xhttp.open(`GET`, `https://api.spotify.com/v1/tracks/${trackId}`, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.setRequestHeader("Authorization", "Bearer BQASjTY6ACazVt6Cg4rCtzZ7zyZZh2z0j6lNvO39EoyJoKdiWGfG-8vlzzkMJ1ri2bAoOZujd_jXAfVNldGkanD3310svz4IXnG2MfQdR8mz6__OcTa1hnKu-vUAGCA10cuUMWrhcZNrpEA");
        xhttp.send();
    }
}

export default SpotifyLinkHandler;