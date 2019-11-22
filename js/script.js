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
        element.setAttribute('id', `night-${i+1}`)

        var value = ''
        if (i + 1 > 1) {
            value = `${i+1} nights`
        } else {
            value = `${i+1} night`
        }

        element.setAttribute('value', value)
        element.innerHTML = value

        select.appendChild(element);
    }
}

function chargeEvents(){

    // Event for dropdowns
    var selects = document.querySelectorAll("#select-nights>a[id^='night']")
    for (var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('click', function () {
            document.getElementById('nnights').value = this.getAttribute('value')
        })
    }

    // Event for search
    document.getElementById('search').addEventListener('click', getValues)

}

function getValues(){
    var destination = document.getElementById('destination').value
    var checkin = document.getElementById('checkin').value
    var nnights = document.getElementById('nnights').value
    var quantitytotal = document.getElementById('quantity-total').value

    if(destination.length > 0 && checkin.length > 0 && nnights.length > 0 && quantitytotal.length > 0){
        console.log('SUBMITTED!')
        console.log(`Destination to ${destination}`)
        console.log(`Checkin from ${checkin}`)
        console.log(`Numbers of nights: ${nnights}`)
        console.log(`For: ${quantitytotal}`)
    } else {
        console.log('Fill the fields please, to do the searching...')
    }
}