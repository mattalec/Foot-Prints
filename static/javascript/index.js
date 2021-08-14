function AllError() {
    console.log('ErrButton()');
    // making all error-options visible and elongating all relevent rows
    var y = document.getElementsByClassName('error-options');
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'table-cell';
    }
    ShowHideOrange();
}

function AllDone() {
    console.log('AllDone()');
    // undoing the above
    var y = document.getElementsByClassName('error-options');
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'none';
    }
    ShowHideOrange();
}

function Done(ind) {
    console.log('Done');
    var ind = ind.toString();
    var y = document.getElementsByClassName('error-option-'+ind);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'none';
    }
    ShowHideOrange();
}

function Error(ind) {
    console.log('Error');
    var ind = ind.toString();
    var y = document.getElementsByClassName('error-option-'+ind);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'table-cell';
    }
    ShowHideOrange();
}

function ShowHideOrange() {
    var y = document.getElementsByClassName('error-options');
    var option_show = false;
    for (var i = 0; i < y.length; i++)
    {
        if (y.item(i).style.display == 'table-cell') {
            option_show = true;
            break;
        }
    }
    if (option_show == true) {
        var z = document.getElementsByClassName('orange');
        for (var i = 0; i < z.length; i++) {
            z.item(i).style.display = 'table-cell';
        }
        var x = document.getElementsByClassName('col-change');
        for (var i = 0; i < x.length; i++) {
            x.item(i).colSpan = '10';
        }
    } else {
        var z = document.getElementsByClassName('orange');
        for (var i = 0; i < z.length; i++) {
            z.item(i).style.display = 'none';
        }
        var x = document.getElementsByClassName('col-change');
        for (var i = 0; i < x.length; i++) {
            x.item(i).colSpan = '6';
        }
    }
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