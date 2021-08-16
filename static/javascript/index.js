function AllError(pt_no) {
    console.log('ErrButton()');
    // making all error-options visible and elongating all relevent rows
    var pt_no = pt_no.toString();
    var x = document.getElementsByClassName('success-pt-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.backgroundColor = 'white';
    }
    var y = document.getElementsByClassName('all-error-options-'+pt_no);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'table-cell';
    }
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'red';
    var z = document.getElementsByClassName('error-pt-'+pt_no);
    for (var i = 0; i < z.length; i++) {
        z.item(i).style.backgroundColor = 'red';
    }
    ShowHideOrange();
}

function AllDone(pt_no) {
    console.log('AllDone()');
    // undoing the above
    var pt_no = pt_no.toString();
    var x = document.getElementsByClassName('error-pt-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.backgroundColor = 'white';
    }
    var y = document.getElementsByClassName('success-pt-'+pt_no);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.backgroundColor = 'green';
    }
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'green';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'white';
    var z = document.getElementsByClassName('all-error-options-'+pt_no);
    for (var i = 0; i < z.length; i++) {
        z.item(i).style.display = 'none';
    }
    ShowHideOrange();
}

// function dblclickAllDone(pt_no) {
//     console.log('dblclickAllDone()');
//     // if hidden, show prescriptions, else, hide
//     var pt_no = pt_no.toString();
//     console.log(pt_no);
//     // if showing

    
    
//     ShowHideOrange();
// }

function ShowHideScripts(pt_no) {
    var z = document.getElementsByClassName(pt_no);

    var ids = ['break-blank','break','first-row'];
    var hide = false;
    
    for (var i = 0; i < z.length; i++) {
        if ((z.item(i).style.display == 'table-row') && !(ids.includes(z.item(i).id))) {
            hide = true;
            break;
        }
    }

    if (hide) {
        var x = document.getElementsByClassName(pt_no);
        for (var i = 0; i < x.length; i++) {
            x.item(i).style.display = 'none';
        }
        var y = document.getElementsByClassName('stay');
        for (var i = 0; i < y.length; i++) {
            y.item(i).style.display = 'table-row';
        }
    } else {
        var x = document.getElementsByClassName(pt_no);
        for (var i = 0; i < x.length; i++) {
            x.item(i).style.display = 'table-row';
        }
    }
}

// function dblclickAllError(pt_no) {
//     console.log('dblclickAllError()');
//     // if hidden, show prescriptions, else, hide
//     var pt_no = pt_no.toString();
//     // show
//     var x = document.getElementsByClassName(pt_no);
//     for (var i = 0; i < x.length; i++) {
//         x.item(i).style.display = 'table-row';
//     }

//     ShowHideOrange();
// }


function OnLoad() {
    // generate all event listeners for double click
    var x = document.getElementsByClassName('main-done');
    var y = document.getElementsByClassName('main-err');

    for (var i = 0; i < x.length; i++) {
        let x_split = x.item(i).id.split('-');
        let x_id = x_split[x_split.length - 1];
        document.getElementById(x.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
        document.getElementById(y.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
    }
}

function Done(ind) {
    console.log('Done');
    var ind = ind.toString();
    var y = document.getElementsByClassName('error-option-'+ind);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'none';
    }
    document.getElementById('error-button-'+ind).style.backgroundColor = 'white';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'green';
    ShowHideOrange();
}

function Error(ind) {
    console.log('Error');
    var ind = ind.toString();
    var y = document.getElementsByClassName('error-option-'+ind);
    for (var i = 0; i < y.length; i++) {
        y.item(i).style.display = 'table-cell';
    }
    document.getElementById('error-button-'+ind).style.backgroundColor = 'red';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'white';
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