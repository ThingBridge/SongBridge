import { MusicInformation } from "../core/MusicInformation";
import { URLCheck } from "../core/URLCheck";

export class SpotifyLinkHandler {
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

    // Album
    isAlbumLink(url) {
        return url.pathname.includes("album");
    }

    getAlbumId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }

    // Song
    isSongLink(url) {
        return url.pathname.includes("track");
    }

    getSongId(url) {
        let pathParts = url.pathname.split("/");
        return pathParts[pathParts.length - 1];
    }
}