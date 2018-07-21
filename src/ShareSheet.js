import React from "react";
import {
    Card,
    CardPrimaryAction,
    CardAction, CardActionIcons,
    CardActions
  } from 'rmwc/Card';
import { MenuAnchor, Menu, MenuItem } from "rmwc/Menu";
import { Typography } from "rmwc/Typography";
import { LinkHandler } from "./core/LinkHandler";
import { Icon } from "rmwc/Icon";

export class ShareSheet extends React.Component {
    constructor() {
        super()

        this.share = this.share.bind(this);
        this.getActions = this.getActions.bind(this);

        this.state = {
            links: []
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
                this.state.links.map((function(link) {
                    return <CardPrimaryAction onClick={() => {window.open(link.link)}}>
                        <div style={{ padding: '1rem' }}>
                            <Typography use="headline5" tag="div">
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