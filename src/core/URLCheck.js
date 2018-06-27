export class URLCheck {
    isURLValid = (link) => {
    try {
        let url = new URL(link);
    } catch (error) {
        alert(`\"${link}\" ist kein Link!`);
        return false;
    }
        return true;
    }
}
