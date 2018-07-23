import React from "react";
import {
    Card,
    CardPrimaryAction,
    CardAction, CardActionIcons,
    CardActions,
    CardMedia
  } from 'rmwc/Card';
import { MenuAnchor, Menu, MenuItem } from "rmwc/Menu";
import { Typography } from "rmwc/Typography";
import { LinkHandler } from "./core/LinkHandler";
import { Icon } from "rmwc/Icon";
import { ListDivider } from "rmwc/List";
import SpotifyIcon from "./icons/spotify.svg";
import ITunesIcon from "./icons/itunes.svg"

export class ShareSheet extends React.Component {
    constructor() {
        super()

        this.share = this.share.bind(this);
        this.getActions = this.getActions.bind(this);
        this.getHeadline = this.getHeadline.bind(this);
        this.getCover = this.getCover.bind(this);

        this.state = {
            links: [],
            information: undefined
        }
    }

    componentDidMount() {
        var linkHandler = new LinkHandler();

        var queries = new URLSearchParams(this.props.location.search);
        var source = queries.get("source");
        var mediaType = queries.get("mediaType");
        var id = queries.get("id");

        linkHandler.getLink(source, mediaType, id)
            .then((value) => {
                this.setState({links: value.links});
                this.setState({information: value.information});
            })
            .catch((reason) => {
                console.error(reason)
                alert("Oh nein!")
            });
    }

    mapLinkName(name) {
        switch (name) {
            case "appleMusic":
                return "Apple Music"
            default:
                return "Spotify"
        }
    }

    mapIcon(name) {
        switch(name) {
            case "appleMusic":
                return ITunesIcon
            default:
                return SpotifyIcon
        }
    }

    getActions() {
        if (this.state.links.length > 0) {
            return <CardActions>
                <CardActionIcons>
                <MenuAnchor>
                    <Menu
                        open={this.state.menuIsOpen}
                        onClose={evt => this.setState({menuIsOpen: false})}
                    >
                        <MenuItem><Icon strategy="ligature" use="link" />  Link kopieren</MenuItem>
                    </Menu>
                    <CardAction onClick={this.share} use="share" />
                    </MenuAnchor>
                </CardActionIcons>
            </CardActions>
        }
    }

    getHeadline() {
        if (this.state.information) {
            if (this.state.information.mediaType === "artist") {
                return <div>
                    <div style={{ padding: '0.5rem 1rem' }}>
                        <Typography use="headline4">
                            { this.state.information.artist }
                        </Typography>
                    </div>
                    <ListDivider />
                </div>
            }
            else if (this.state.information.mediaType === "album") {
                return <div>
                    <div style={{ padding: '0.5rem 1rem' }}>
                        <Typography use="headline4">
                            { this.state.information.album }
                        </Typography>
                        <br />
                        <Typography use="subtitle1">
                            { this.state.information.artist }
                        </Typography>
                    </div>
                    <ListDivider />
                </div>
            }
            else if (this.state.information.mediaType === "song") {
                return <div>
                    <div style={{ padding: '0.5rem 1rem' }}>
                        <Typography use="headline4">
                            { this.state.information.song }
                        </Typography>
                        <br />
                        <Typography use="subtitle1">
                            { this.state.information.artist } - { this.state.information.album }
                        </Typography>
                    </div>
                    <ListDivider />
                </div>
            }
        }
    }

    getCover() {
        if (this.state.information && this.state.information.cover && this.state.information.cover !== "") {
            var url = `url(${decodeURIComponent(this.state.information.cover)})`;
            return <CardMedia square style={{ backgroundImage: url }}/>
        }
    }

    share() {
        this.setState({'menuIsOpen': !this.state.menuIsOpen})

        var temporaryElement = document.createElement('textarea');
        temporaryElement.value = window.location.href;
        temporaryElement.setAttribute('readonly', '');
        temporaryElement.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(temporaryElement);
        temporaryElement.select();
        document.execCommand('copy');
        document.body.removeChild(temporaryElement);
    }

    render() {
        return <Card>
            {
                this.getHeadline()
            }
            {
                this.getCover()
            }
            {
                this.state.links.map((function(link) {
                    return <CardPrimaryAction onClick={() => {window.open(link.link)}}>
                        <div style={{ padding: '1rem' }}>
                            <Typography use="headline6" tag="div">
                                {this.mapLinkName(link.name)}
                            </Typography>
                        </div>
                    </CardPrimaryAction>
                }).bind(this))
            }
            {
                this.getActions()
            }
        </Card>
    }
}