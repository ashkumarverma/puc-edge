var clipboardDemos = new Clipboard('[data-clipboard-demo]');

clipboardDemos.on('success', function (e) {
    e.clearSelection();    
    showTooltip(e.trigger, 'Copied!');
});

clipboardDemos.on('error', function (e) {    
    showTooltip(e.trigger, fallbackMessage(e.action));
});


var btns = document.querySelectorAll('.btn btn-success');

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', function (e) {
        e.currentTarget.setAttribute('class', 'btn');
        e.currentTarget.removeAttribute('aria-label');
    });
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn btn-success');
    elem.setAttribute('value', msg);
}

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }
    return actionMsg;
}
