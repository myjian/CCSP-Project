function goBack(){
    var loc = window.location.toString();
    var idx = loc.lastIndexOf('/');
    if (idx === loc.length - 1){
        loc.slice(0, idx);
        idx = loc.lastIndexOf('/');
    }
    window.location.assign(loc.slice(0, idx));
}
