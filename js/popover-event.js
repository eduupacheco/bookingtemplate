
$('.popover-selection>.trigger').click(function () {
    
    $(this).popover({
        html: true,
        placement: 'bottom',
        content: function () {
            return $(this).parent().find('.popover-div').html();
        }
    }).popover('toggle');
});

function refreshPopover(){
    // This is for refresh the popover
    $('.popover-selection>.trigger').popover({
        html: true,
        placement: 'bottom',
        content: function () {
            return $(this).parent().find('.popover-div').html();
        }
    }).popover('toggle').popover('toggle');
}
