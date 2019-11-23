var starnight = [4, 7, 10, 14]

window.onload = function () {

    initDate() // second input: calendar (check-in)
    initComboNights(starnight) // third input: number of nights

    chargeEvents()

}


function initDate() {
    document.getElementById('checkin').value = moment().format().substr(0, 10);
}

function initComboNights(array) {
    var select = document.getElementById('select-nights')

    array.forEach(n => {
        var element = document.createElement('a');
        element.setAttribute('class', 'dropdown-item')
        element.setAttribute('href', '#')
        element.setAttribute('id', `night-${n}`)

        var value = ''
        if (n > 1) {
            value = `${n} nights`
        } else {
            value = `${n} night`
        }

        element.setAttribute('value', value)
        element.innerHTML = value

        select.appendChild(element);
    });

    var element = document.createElement('div');
    element.setAttribute('class', 'dropdown-divider')
    select.appendChild(element)

    for (let i = 0; i < 1000; i++) {
        var element = document.createElement('a');
        element.setAttribute('class', 'dropdown-item')
        element.setAttribute('href', '#')
        element.setAttribute('id', `night-${i + 1}`)

        var value = ''
        if (i + 1 > 1) {
            value = `${i + 1} nights`
        } else {
            value = `${i + 1} night`
        }

        element.setAttribute('value', value)
        element.innerHTML = value

        select.appendChild(element);
    }
}

function chargeEvents() {

    // Event for dropdowns
    var selects = document.querySelectorAll("#select-nights>a[id^='night']")
    for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('click', function () {
            document.getElementById('nnights').setAttribute('value', this.getAttribute('value'))
        })
    }

    // Event for addrooms
    event(document, 'click', '#btn-addroom', function (event) {
        var id = document.getElementById('quantity').childElementCount
        if (id < 5) {
            addRoom(id);
            if (id == 4) {document.getElementById('btn-addroom').disabled = true}
            refreshPopover()
        } else {
            document.getElementById('btn-addroom').disabled = true
        }
    });

    // Event for done quantity section
    event(document, 'click', '#done-quantity', function (event) {
        doneQuantity()
    })

    // Event for search
    event(document, 'click', '#search', function (event) {
        getValues()
    })
}

function event(el, evt, sel, handler) {
    el.addEventListener(evt, function (event) {
        var t = event.target;
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event);
            }
            t = t.parentNode;
        }
    });
}

function addRoom(id) {
    var element = document.createElement('div');
    element.setAttribute('id', 'room-' + id)
    element.setAttribute('class', 'col p-2 mt-4')
    element.setAttribute('style', 'width: 200px')
    element.innerHTML = `<h6 class="text-success align-middle"><span class="small rounded-circle bg-success text-white p-1 px-2">${id}</span> ROOM</h6>`
        + `<div class="row m-0 mt-2"><div class="col-7 d-flex"><label class="m-0 align-self-center">Adults</label></div><div class="col-5 d-flex p-0"><input class="form-control" type="number" name="quantity-adults-room-${id}" id="quantity-adults-room-${id}" min="1" max="4" value="1"></div></div>`
        + `<div class="row m-0 mt-2"><div class="col-7"><label class="m-0">Children</label><small class="d-block">(0-17Yrs)</small></div><div class="col-5 d-flex p-0"><input class="form-control align-self-center m-0" type="number" name="quantity-children-room-${id}" id="quantity-children-room-${id}" min="0" max="4" value="0"></div></div>`
    document.getElementById('quantity').insertBefore(element, document.getElementById('quantity').lastChild.previousSibling)
}

function doneQuantity(){
    var adults = 8
    var children = 7
    var nrooms = document.getElementById('quantity').childElementCount-1

    var value = ''

    if(nrooms > 1){
        value += `${nrooms} Rooms`
    } else {
        value += `${nrooms} Room`
    }

    if(adults > 1){
        value += ` & ${adults} Adults`
    } else {
        value += ` & ${adults} Adults`
    }

    if(children > 1){
        value += ` & ${children} Child`
    } else {
        value += ` & ${children} Children`
    }

    document.getElementById('quantity-total').setAttribute('value', value)
}

function getValues() {
    var destination = document.getElementById('destination').value
    var checkin = document.getElementById('checkin').value
    var nnights = document.getElementById('nnights').value
    var quantitytotal = document.getElementById('quantity-total').value

    if (destination.length > 0 && checkin.length > 0 && nnights.length > 0 && quantitytotal.length > 0) {
        console.log('SUBMITTED!')
        console.log(`Destination to ${destination}`)
        console.log(`Checkin from ${checkin}`)
        console.log(`Numbers of nights: ${nnights}`)
        console.log(`For: ${quantitytotal}`)
    } else {
        console.log('Fill the fields please, to do the searching...')
    }
}