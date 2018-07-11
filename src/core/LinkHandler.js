import SpotifyLinkHandler from "../spotify/SpotifyLinkHandler";
import AppleMusicLinkHandler from "../appleMusic/AppleMusicLinkHandler"

export class LinkHandler {
    
    handleEnteredLink(link) {
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
}