function validateForm(){
    if (document.getElementById("plate").value === "")
        return false;

    if (document.getElementById("country").value === "")
        return false;

    if (document.getElementById("road").value === "")
        return false;

    if (document.getElementById("condition").value === "")
        return false;

    if (document.getElementById("url").value === "")
        return false;

    return true;
}
