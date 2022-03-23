const rangeSliderInit = () => {
  const range = document.getElementById('slider-round'),
      inputMin = document.getElementById('min'),
      inputMax = document.getElementById('max');
  const inputs = [inputMin, inputMax];
  noUiSlider.create(range, {
      start: [0, 100],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      },
      step: 1,
    });
  range.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = parseInt(values[handle]);
  });
  inputMin.addEventListener('change', function () {
    range.noUiSlider.set([this.value, null]);
  });
  inputMax.addEventListener('change', function () {
    range.noUiSlider.set([null, this.value]);
  });
}


window.addEventListener('DOMContentLoaded', rangeSliderInit)
