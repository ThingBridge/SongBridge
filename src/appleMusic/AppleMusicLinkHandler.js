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

    // Song
    isSongLink(url) {
        let isAlbum = url.pathname.includes("album");
        let isSong = url.searchParams.get("i") != null;

        return isAlbum && isSong;
    }

    getSongId(url) {
        return url.searchParams.get("i");
    }
}