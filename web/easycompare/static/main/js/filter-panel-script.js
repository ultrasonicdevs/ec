const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
    start: [1, 999999],
    connect: true,
    step: 1,
    range: {
            'min': [1],
            'max': [999999]
        }
    });

    const input0 = document.getElementById('input-1')
    const input1 = document.getElementById('input-2')
    const inpuns = [input0, input1];

    rangeSlider.noUiSlider.on('update', function (values, handle){
       inpuns[handle].value = Math.round(values[handle])
    });
}
