var popular_durations = [4, 7, 10, 14]

window.onload = function () {

    initDate() // second input: calendar (check-in)
    initComboNights(popular_durations) // third input: number of nights

    chargeEvents()
}


function initDate() {
    document.getElementById('checkin').value = moment().format().substr(0, 10)
    document.getElementById('checkin').setAttribute('min', moment().format().substr(0, 10))
}

function initComboNights(array) {
    var select = document.getElementById('select-nights')

    select.insertAdjacentHTML('beforeend','<h6 class="dropdown-header">POPULAR DURATIONS</h6>')
    array.forEach(n => {
        var element = document.createElement('a')
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

        select.appendChild(element)
    })

    var element = document.createElement('div')
    element.setAttribute('class', 'dropdown-divider')
    select.appendChild(element)
    select.insertAdjacentHTML('beforeend','<h6 class="dropdown-header">DAILY</h6>')

    for (let i = 0; i < 90; i++) {
        var element = document.createElement('a')
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

        select.appendChild(element)
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

    // Event for add rooms
    event(document, 'click', '#btn-addroom', function (event) {
        var id = document.getElementById('quantity').childElementCount

        if (id < 5) {
            addRoom(id)
        }

        controlAddRoom()
        controlDeleteRoom()
        refreshPopover()
    })

    // Event for done quantity section
    event(document, 'click', '#done-quantity', function (event) {
        doneQuantity()
    })

    // Event for delete rooms
    event(document, 'click', '#btn-deleteroom', function (event) {
        deleteRoom()
    })

    // Event for search
    event(document, 'click', '#search', function (event) {
        getValues()
    })

    controlAddRoom()
    controlDeleteRoom()

}

function event(el, evt, sel, handler) {
    el.addEventListener(evt, function (event) {
        var t = event.target
        while (t && t !== this) {
            if (t.matches(sel)) {
                handler.call(t, event)
            }
            t = t.parentNode
        }
    })
}

function addRoom(id) {
    var element = document.createElement('div')
    element.setAttribute('id', 'room-' + id)
    element.setAttribute('class', 'col p-2 mt-4')
    element.setAttribute('style', 'width: 200px')
    element.innerHTML = `<h6 class="text-success align-middle"><span class="small rounded-circle bg-success text-white p-1 px-2">${id}</span> ROOM</h6>`
        + `<div class="row m-0 mt-2"><div class="col-7 d-flex"><label class="m-0 align-self-center">Adults</label></div><div class="col-5 d-flex p-0"><input class="form-control" type="number" name="quantity-adults" id="quantity-adults" min="1" max="4" value="1"></div></div>`
        + `<div class="row m-0 mt-2"><div class="col-7"><label class="m-0">Children</label><small class="d-block">(0-17Yrs)</small></div><div class="col-5 d-flex p-0"><input class="form-control align-self-center m-0" type="number" name="quantity-children" id="quantity-children" min="0" max="4" value="0"></div></div>`
    document.querySelector('#quantity').insertBefore(element, document.querySelector('#quantity').lastChild.previousSibling)
}

function deleteRoom(){
    var id = document.getElementById('quantity').childElementCount
    if(id > 2){
        document.querySelector('#quantity').removeChild(document.querySelector('#quantity').lastElementChild.previousElementSibling)
    }

    controlAddRoom()
    controlDeleteRoom()
    refreshPopover()
}

function controlDeleteRoom(){
    var id = document.getElementById('quantity').childElementCount
    if(id > 2)
        document.getElementById('btn-deleteroom').disabled = false
    else
        document.getElementById('btn-deleteroom').disabled = true
}

function controlAddRoom(){
    var id = document.getElementById('quantity').childElementCount
    if (id < 5)
        document.getElementById('btn-addroom').disabled = false
    else
        document.getElementById('btn-addroom').disabled = true
}

function doneQuantity(){
    var adults = 0
    var children = 0
    var nrooms = document.getElementById('quantity').childElementCount-1

    document.querySelectorAll(`.popover input[id=quantity-adults`).forEach(element => {
        adults += parseInt(element.value)
    })

    document.querySelectorAll(`.popover input[id=quantity-children`).forEach(element => {
        children += parseInt(element.value)
    })

    var value = ''

    if(nrooms > 1){
        value += `${nrooms} Rooms`
    } else {
        value += `${nrooms} Room`
    }

    if(adults > 1){
        value += ` & ${adults} Adults`
    } else {
        value += ` & ${adults} Adult`
    }

    if(children > 1){
        value += ` & ${children} Children`
    }
    if(children == 1) {
        value += ` & ${children} Child`
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
        console.log('Please, fill all fields to do the search...')
    }
}