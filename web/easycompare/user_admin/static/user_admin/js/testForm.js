const form = document.forms.testForm;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = (await fetch('http://192.168.0.89:8000/api/sections/', {method: 'GET', 'X-CSRF-Token': '{{ csrf_token }}'}).then(res => res.json())).response;
  fillSections (response);
  deleteSections ();
});

function fillSections (sections) {
  const sectionsContainer = document.querySelector('.sections__container');
  sectionsContainer.innerHTML = '';
  sections.forEach(section => {
    const p = document.createElement('p');
    p.textContent = section.name;
    sectionsContainer.appendChild(p);
  })
}

async function deleteSections () {
  headers = {
    'content-type': 'application/json',
  };
  await fetch('http://192.168.0.89:8000/api/sections/', {
    method: 'DELETE',
    headers: headers,
  })
}


