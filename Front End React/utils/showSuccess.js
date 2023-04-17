export async function showSuccess(text,redirect,url) {
    let parent = document.getElementsByClassName("success_msg")[0];
    let parentHeight = parent.parentElement.clientHeight;
    parent.firstChild.innerText = text;
    parent.style.height = parentHeight + "px";
    parent.style.display = "block";
    setTimeout(() => {
        parent.style.opacity = "1";
    }, 10);
    if(redirect == true){
        setTimeout(() => {
            window.location.replace(url);
        }, 2000);
    }
    else{
        setTimeout(() => {
            parent.style.opacity = "0";
            parent.style.display = "none";
        }, 2000);
    }
}