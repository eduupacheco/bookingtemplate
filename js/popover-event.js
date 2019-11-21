$('.popover-selection>.trigger').popover({
    html: true,
    placement: "bottom",
    content: function () {
        return $(this).parent().find('.popover-div').html();
    }
});