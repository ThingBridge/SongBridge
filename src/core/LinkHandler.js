import { SpotifyLinkHandler } from "../spotify/SpotifyLinkHandler";
import { AppleMusicLinkHandler } from "../appleMusic/AppleMusicLinkHandler"
import { URLCheck } from "./URLCheck";

export class LinkHandler {
    getInformations(link) {
        let urlChecker = new URLCheck();
        if (urlChecker.isURLValid(link)){
            let url = new URL(link)
            let informations
            if(url.hostname.includes("open.spotify"))
            {
                let spotify = new SpotifyLinkHandler()
                informations = spotify.getInformations()
            }
            else if(url.hostname.includes("itunes.apple"))
            {
                let applemusic = new AppleMusicLinkHandler()
                informations = applemusic.getInformations()
            }
            else {
                console.log("Nicht spotify, nicht apple music");
            }
            return informations
        }
    }

    getLinks(link) {
        return new Promise((resolve, reject) => {
            var informations = this.getInformations(link)
            if (informations) {
                reject("Could not handle link")
            }

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
            xhttp.open(`GET`, `/links?mediatype=${informations.mediaType}&source=${informations.source}&id=${informations.id}`, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.setRequestHeader("Accept", "application/json");     
            xhttp.send();
        });
    }
}