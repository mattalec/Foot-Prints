function OnLoad() {
    // generate event listeners on All Done and All Error Buttons on double click
    var x = document.getElementsByClassName('main-done');
    var y = document.getElementsByClassName('main-err');

    for (var i = 0; i < x.length; i++) {
        let x_split = x.item(i).id.split('-');
        let x_id = x_split[x_split.length - 1];
        document.getElementById(x.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
        document.getElementById(y.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
    }

    ShowAll();
}

function print() {
    window.print();
}

function AllDone(pt_no) {
    console.log('AllDone()');
    // undoing the above
    var pt_no = pt_no;
    var x = document.getElementsByClassName('check-pt-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        x.item(i).checked = false;
    }
    var x = document.getElementsByClassName('pt-check-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        x.item(i).checked = false;
    }    
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
    ShowHideClass('all-error-options-'+pt_no, false, 'row');
    HideScripts(pt_no);
    ShowHideOrange();
}

function AllError(pt_no) {
    console.log('ErrButton()');
    // making all error-options visible and elongating all relevent rows
    var pt_no = pt_no.toString();
    // make colour changed from green to white and from white to red
    var x = document.getElementsByClassName('success-pt-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.backgroundColor = 'white';
    }
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'red';
    var z = document.getElementsByClassName('error-pt-'+pt_no);
    for (var i = 0; i < z.length; i++) {
        z.item(i).style.backgroundColor = 'red';
    }

    // make sure all errors are visible
    ShowHideClass('script-error-option-'+pt_no, true, 'cell');

    // show error options and orange header
    ShowHideClass('all-error-options-'+pt_no, true, 'cell');
    if (pt_no != 0) {
        ShowHideClass('error-option-'+pt_no, true, 'cell');
    }
    ShowHideOrange();
}

function Done(ind, pt_no) {
    console.log('Done');
    var ind = ind.toString();
    var x = document.getElementsByClassName('check-'+ind);
    for (var i = 0; i < x.length; i++) {
        x.item(i).checked = false;
    }
    document.getElementById('error-button-'+ind).style.backgroundColor = 'white';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'green';
    ShowHideClass('error-option-'+ind, false, 'cell');
    ShowHideOrange();
    CheckAllDone(pt_no);
}

function CheckAllDone(pt_no) {
    // check if all done, if so 'AllDone'
    var y = document.getElementsByClassName('success-pt-'+pt_no);
    var all_green = true;
    for (var i = 0; i < y.length; i++) {
        if (y.item(i).style.backgroundColor != 'green') {
            all_green = false;
            break;
        }
    }
    if (all_green) {
        AllDone(pt_no);
    } else {
        document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    }
}

function Error(ind, pt_no) {
    console.log('Error');
    var ind = ind.toString();
    document.getElementById('error-button-'+ind).style.backgroundColor = 'red';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'white';
    ShowHideOrange();
    ShowHideClass('error-option-'+ind, true, 'cell');
    CheckAllDone(pt_no);
}

function CheckCheck(ind, pt_no, type) {
    console.log('CheckCheck(ind, pt_no, type): '+ind.toString()+', '+pt_no.toString()+', '+type.toString());
    var ind = ind.toString();
    // uncheck all in row but the one just checked
    var x = document.getElementsByClassName('check-'+ind);
    for (var i = 0; i < x.length; i++) {
        if (i != (type-1)) {
            x.item(i).checked = false;
        }
    }
    var y = document.getElementsByClassName('pt-check-'+pt_no);
    for (var i = 0; i < y.length; i++) {
        y.item(i).checked = false;
    }
}

function MainCheck(pt_no, type) {
    console.log('MainCheck(pt_no, type): '+pt_no.toString()+', '+type.toString());
    var pt_no = pt_no.toString();
    // uncheck all in row but the one just checked
    var x = document.getElementsByClassName('pt-check-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        if (i != (type-1)) {
            x.item(i).checked = false;
        }
    }
    // tick same on all scripts
    var y = document.getElementsByClassName('check-pt-'+pt_no);
    var checkbox;
    for (var i = 0; i < y.length; i++) {
        checkbox = i % 4;
        if (checkbox != (type-1)) {
            y.item(i).checked = false;
        }
        else {
            console.log('i: '+i+', type: '+type);
            y.item(i).checked = true;
        }
    }
    // hide all scripts
    HideScripts(pt_no);
}

function ShowHideOrange() {
    // check if an orange error type is visible, if so, keep orange header
    
    // var y = document.getElementsByClassName('error-options');
    var y = document.getElementsByClassName('main-done');
    var cols;
    var option_show = false;

    for (var i = 0; i < y.length; i++)
    {
        console.log('checkbox '+i+' : '+y.item(i).style.display);
        if (y.item(i).style.backgroundColor != 'green') {
            option_show = true;
            break;
        }
    }
    if (option_show == true) { cols = '10'; } else { cols = '6'; }

    ShowHideClass('orange', option_show, 'cell');
    var x = document.getElementsByClassName('col-change');
    for (var i = 0; i < x.length; i++) {
        x.item(i).colSpan = cols;
    }
}

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

    if (hide) {HideScripts(pt_no);} 
    else {
        ShowHideClass(pt_no, true, 'row');
    }
}

function HideScripts(pt_no) {
    ShowHideClass(pt_no, false, 'row');
    ShowHideClass('stay', true, 'row');
}

function ShowHideClass(classname, show, obj_type) {
    var showstr = 'table-'+obj_type;
    if (!show) {showstr = 'none';};

    var x = document.getElementsByClassName(classname);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.display = showstr;
    }
}

function ShowAll() {
    console.log('ShowAll()');
    ShowHideClass('error-options', true, 'cell');
    ShowHideClass('script', true, 'row');
    ShowHideOrange();
}