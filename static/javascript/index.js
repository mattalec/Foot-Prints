function ErrButton() {

    var x = document.getElementsByClassName('col-change');
    for (var i = 0; i < x.length; i++) {
        x.item(i).colSpan = '10';
    }

    var y = document.getElementsByClassName('error-options');
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'table-cell';
    }

    console.log('ErrButton()');

    // document.getElementById('footprints').colSpan = '6';
    // document.getElementById('break').colSpan = '6';
    // document.getElementById('break-blank').colSpan = '6';
}

function AddDone() {
    pass;
}

// function OnLoad() {
//     var x = document.getElementsByClassName('col-change');
//     for (var i = 0; i < x.length; i++) {
//         x.item(i).colSpan = '6';
//     }

//     var y = document.getElementsByClassName('error-options');
//     for (var i = 0; i < x.length; i++) {
//         y.item(i).style.display = 'none';
//     }    
// }

console.log('hello');