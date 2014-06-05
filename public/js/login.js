var loc = window.location.toString();
var idx = loc.lastIndexOf('/');
var target = loc.substring(0, idx);
if (idx === loc.length - 1){
    idx = target.lastIndexOf('/');
    target = target.substring(0, idx);
}
$('#back a').attr('href', target);
