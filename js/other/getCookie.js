function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    console.log(decodeURIComponent(matches[1]));
    console.log((matches[1]));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}