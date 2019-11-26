var popular_durations = [4, 7, 10, 14]

window.onload = function () {

    initDate() // second input: calendar (check-in)
    initComboNights(popular_durations) // third input: number of nights

    chargeEvents()
}

/**
 * This function init the 'Checkin' element (in this case its an input with date type)
 */
function initDate() {
    document.getElementById('checkin').value = moment().format().substr(0, 10)
    document.getElementById('checkin').setAttribute('min', moment().format().substr(0, 10))
}

/**
 * This function init the 'ComboNights' elements
 */
function initComboNights(array) {
    var select = document.getElementById('select-nights')

    select.insertAdjacentHTML('beforeend', '<h6 class="dropdown-header">POPULAR DURATIONS</h6>')
    array.forEach(n => {
        var element = document.createElement('a')
        element.setAttribute('class', 'dropdown-item')
        element.setAttribute('href', '#')
        element.setAttribute('id', `night-${n}`)
        element.setAttribute('style', 'font-weight: bold')

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
    select.insertAdjacentHTML('beforeend', '<h6 class="dropdown-header">DAILY</h6>')

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

/**
 * This function charges all events
 */
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
        deleteRoom(this.getAttribute('room'))
    })

    // Event for generate year selectors and verify the quantity of children
    event(document, 'input', '#quantity-children', function (event) {
        if (this.value > 4 || this.value < 0) {
            this.value = 0
        }
        generateYearChildrenDiv(this.value, this.getAttribute('room'))
        refreshPopover()
    })

    // Event for verify the quantity of adults
    event(document, 'input', '#quantity-adults', function (event) {
        if (this.value > 4 || this.value < 1) {
            this.value = 1
        }
        refreshPopover()
    })

    // Event for verify the value of date
    event(document, 'input', '#checkin', function (event) {
        verifyDateValue()
        refreshPopover()
    })

    event(document, 'input', 'div[id^=year-children-div-room-] input', function (event) {
        if (this.value < 0 || this.value > 17) {
            this.value = 0
        }
    })

    // Event for search
    event(document, 'click', '#search', function (event) {
        getValues()
    })
}

/**
 * This function is a translated function from JQuery to JS, where the params are 
 * el (document), 
 * evt (type of event could be input, click, blur, etc..),
 * sel (is a selector for get an specific element),
 * handler (the function to do when the eventlistener is running)
 * @param {*} el 
 * @param {*} evt 
 * @param {*} sel 
 * @param {*} handler 
 */
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

/**
 * Function passing an id (this) that add a room
 * @param {*} id 
 */
function addRoom(id) {
    var element = document.createElement('div')
    element.setAttribute('id', 'room-' + id)
    element.setAttribute('class', 'col p-2 mt-4 room')
    element.setAttribute('style', 'width: 200px')
    element.innerHTML = `<div class="row d-flex justify-content-between"><h6 class="col text-success align-self-center"><span class="small rounded-circle bg-success text-white p-1 px-2 nroom">${id}</span> ROOM</h6>
    <button id="btn-deleteroom" class="btn btn-danger m-0 mt-2 mr-4" room="${id}"><i class="fas fa-trash"></i></button></div>
    <div class="row m-0 mt-2"><div class="col-7 d-flex"><label class="m-0 align-self-center">Adults</label></div><div class="col-5 d-flex p-0"><input class="form-control" type="number" name="quantity-adults" id="quantity-adults" min="1" max="4" value="1"></div></div><div class="row m-0 mt-2"><div class="col-7"><label class="m-0">Children</label><small class="d-block">(0-17Yrs)</small></div><div class="col-5 d-flex p-0"><input class="form-control align-self-center m-0" type="number" name="quantity-children" id="quantity-children" room="${id}" min="0" max="4" value="0"></div><div id="year-children-div-room-${id}" class="row m-0 mt-2 w-100"></div></div>`
    document.querySelector('.popover-body #quantity').insertBefore(element, document.querySelector('.popover-body #quantity').lastChild.previousSibling)
}

/**
 * Function passing an id (this) that eliminates a room
 * @param {*} id 
 */
function deleteRoom(id) {
    var numberofrooms = document.getElementById('quantity').childElementCount
    if (numberofrooms > 2) {
        document.querySelector('#quantity').removeChild(document.querySelector('#room-'+id))
    }

    
    refreshYearChildrenDiv()
    controlAddRoom()
    controlDeleteRoom()
    refreshPopover()
}

/**
 * Function that controls the number of rooms on DOM and enable and disable some buttons for cancel functions when the user add a room
 */
function controlDeleteRoom() {
    var id = document.getElementById('quantity').childElementCount
    if (id > 2)
        document.getElementById('btn-deleteroom').disabled = false
    else
        document.getElementById('btn-deleteroom').disabled = true
}

/**
 * Function that controls the number of rooms on DOM and enable and disable some buttons for cancel functions when the user delete a room
 */
function controlAddRoom() {
    var id = document.getElementById('quantity').childElementCount
    if (id < 5)
        document.getElementById('btn-addroom').disabled = false
    else
        document.getElementById('btn-addroom').disabled = true
}

/**
 * This function refresh the year zone div for year's children
 */
function refreshYearChildrenDiv() {
    for(var i = 1; i < document.getElementById('quantity').childElementCount; i++){
        console.log(i)
        document.getElementsByClassName('room')[i-1].setAttribute('id','room-'+i)
        document.getElementsByClassName('nroom')[i-1].innerHTML = i
        document.querySelectorAll('button[room]')[i-1].setAttribute('room', i)
        document.querySelectorAll('input[room]')[i-1].setAttribute('room', i)
        document.querySelectorAll('div[id^=year-children-div-room-]')[i-1].setAttribute('id', 'year-children-div-room-'+i)
    }
}

/**
 * This function generates the div for the year zone for each child. The values are 
 * @param {*} values 
 * @param {*} idroom
 */
function generateYearChildrenDiv(values, idroom) {
    if (values > 4 || values < 0) {
        values = 1
    }
    var html = ''
    for (let i = 0; i < values; i++) {
        html += `<div class="col-6 mb-2">
            <h6 class="small">Edad:</h6>
            <div class="input-group-append">
                <input class="form-control bg-warning text-white" type="number" min="0" max="17" value="12">
            </div>
        </div>`
    }
    document.getElementById('year-children-div-room-' + idroom).innerHTML = html;
}

/**
 * This function is for a button when the user has put the quantity of adults and children
 */
function doneQuantity() {
    var adults = 0
    var children = 0
    var nrooms = document.getElementById('quantity').childElementCount - 1

    document.querySelectorAll(`.popover input[id=quantity-adults`).forEach(element => {
        adults += parseInt(element.value)
    })

    document.querySelectorAll(`.popover input[id=quantity-children`).forEach(element => {
        children += parseInt(element.value)
    })

    var value = ''

    if (nrooms > 1) {
        value += `${nrooms} Rooms`
    } else {
        value += `${nrooms} Room`
    }

    if (adults > 1) {
        value += ` & ${adults} Adults`
    } else {
        value += ` & ${adults} Adult`
    }

    if (children > 1) {
        value += ` & ${children} Children`
    }
    if (children == 1) {
        value += ` & ${children} Child`
    }

    document.getElementById('quantity-total').setAttribute('value', value)
}

/**
 * This function working for get the values
 */
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

/**
 * This function verifies the date value
 */
function verifyDateValue() {
    if (document.getElementById('checkin').value < moment().format().substr(0, 10)) {
        document.getElementById('checkin').value = moment().format().substr(0, 10)
    }
}