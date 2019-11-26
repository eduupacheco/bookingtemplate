// Create content from HTML
/*$('.popover-selection>.trigger').click(function () {
    $(this).popover({
        html: true,
        placement: 'bottom',
        content: function () {
            return $(this).parent().find('.popover-div').html();
        }
    }).popover('toggle');
});*/

// Generate content from code JQuery
$('.popover-selection>.trigger').click(function () {
    $(this).popover({
        html: true,
        placement: 'bottom',
        content: `<div class="popover-div show" style="max-width: auto">
        <div id="quantity" class="row m-0">
            <div id="room-1" class="col p-2 mt-4" style="width: 200px">
                <h6 class="text-success align-middle align-self-center"><span
                        class="small rounded-circle bg-success text-white p-1 px-2">1</span> ROOM</h6>
                <div class="row m-0 mt-2">
                    <div class="col-7 d-flex">
                        <label class="m-0 align-self-center">Adults</label>
                    </div>
                    <div class="col-5 d-flex p-0">
                        <input class="form-control" type="number" name="quantity-adults"
                            id="quantity-adults" min="1" max="4" value="1">
                    </div>
                </div>
                <div class="row m-0 mt-2">
                    <div class="col-7">
                        <label class="m-0">Children</label>
                        <small class="d-block">(0-17Yrs)</small>
                    </div>
                    <div class="col-5 d-flex p-0">
                        <input class="form-control align-self-center m-0" type="number"
                            name="quantity-children" id="quantity-children" room="1" min="0" max="4" value="0">
                    </div>
                </div>
                <div id="year-children-div-room-1" class="row m-0 mt-2 w-100"></div>
            </div>
            <div id="addroom" class="col p-2 mt-4" style="width: 200px">
                <button type="button" id="btn-addroom" class="btn col-12 row m-0 rounded"
                    style="background-color: lightskyblue; height: 135px">
                    <div class="display-4 w-100 text-center p-0"><i
                            class="text-primary fas fa-plus align-middle"></i></div>
                    <div class="text-primary w-100 text-center m-0">ADD ROOM</div>
                </button>
                <div class="col-12 d-flex justify-content-between p-0">
                    <button id="btn-deleteroom" class="btn btn-danger m-0 mt-2 mr-4" disabled><i
                            class="fas fa-trash"></i></button>
                    <button id="done-quantity" class="btn btn-primary m-0 mt-2">DONE</button>
                </div>
            </div>
        </div>
    </div>`
    })
});

// This is for refresh the popover
function refreshPopover(){
    $('.popover-selection>.trigger').popover({
        html: true,
        placement: 'bottom',
        content: function () {
            return $(this).parent().find('.popover-div').html();
        }
    }).popover('toggle').popover('toggle');


}
