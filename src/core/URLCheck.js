export class URLCheck {
    isURLValid = (link) => {
    try {
        new URL(link);
    } catch (error) {
        alert(`"${link}" ist kein Link!`);
        return false;
    }
        return true;
    }
}
