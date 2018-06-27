import { MusicInformation } from "../core/MusicInformation";

class AppleMusicLinkHandler {
    musicKit;

    constructor() {
        this.musicKit = window.MusicKit.getInstance();
        console.log(this.musicKit.api.storefrontId);
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
            this.musicKit.authorize().then(function() {
                let musicKit = window.MusicKit.getInstance();
                musicKit.api.artist(artistId).then((appleMusicArtist) => {
                    let information = new MusicInformation();
                    information.mediaType = "artist";
                    information.artist = appleMusicArtist.attributes.name;
                    resolve(information);
                }).catch(() => {
                    reject();
                }); 
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
            this.musicKit.authorize().then(function() {
                let musicKit = window.MusicKit.getInstance();
                musicKit.api.album(albumId).then((appleMusicAlbum) => {
                    let information = new MusicInformation();
                    information.mediaType = "album";
                    information.artist = appleMusicAlbum.attributes.artistName;
                    information.album = appleMusicAlbum.attributes.name;
                    resolve(information);
                }).catch(() => {
                    reject();
                }); 
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
            this.musicKit.authorize().then(function() {
                let musicKit = window.MusicKit.getInstance();
                musicKit.api.song(songId).then((appleMusicSong) => {
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
        });
    }
}

export default AppleMusicLinkHandler;