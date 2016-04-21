export default function() {
    let dialogs = document.querySelectorAll('.modal-dialog');
    let i, ln;
    ln = dialogs.length;
    for(i = 0; i < ln; i++) {
        dialogs[i].classList.add('modal-lg');
    }
}
