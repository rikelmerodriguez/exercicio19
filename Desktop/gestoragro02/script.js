document.getElementById('entryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const area = document.getElementById('area').value;
    const activity = document.getElementById('activity').value;
    const materials = document.getElementById('materials').value;
    const photos = document.getElementById('photos').files;
  
    // Armazenar fotos em formato de URL base64
    let photosArray = [];
    for (let i = 0; i < photos.length && i < 5; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(photos[i]);
      reader.onload = function(event) {
        photosArray.push(event.target.result);
        if (photosArray.length === photos.length || photosArray.length === 5) {
          saveEntry(date, location, area, activity, materials, photosArray);
        }
      };
    }
  });
  
  function saveEntry(date, location, area, activity, materials, photos) {
    const entries = JSON.parse(localStorage.getItem('fieldEntries')) || [];
    
    const newEntry = {
      date,
      location,
      area,
      activity,
      materials,
      photos
    };
  
    entries.push(newEntry);
    localStorage.setItem('fieldEntries', JSON.stringify(entries));
  
    displayEntries();
  }
  
  function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('fieldEntries')) || [];
    const entriesDiv = document.getElementById('entries');
    
    entriesDiv.innerHTML = '';
  
    entries.forEach(entry => {
      const entryDiv = document.createElement('div');
      entryDiv.classList.add('entry');
  
      entryDiv.innerHTML = `
        <p><strong>Data:</strong> ${entry.date}</p>
        <p><strong>Local:</strong> ${entry.location}</p>
        <p><strong>Área:</strong> ${entry.area} hectares</p>
        <p><strong>Atividade:</strong> ${entry.activity}</p>
        <p><strong>Materiais Utilizados:</strong> ${entry.materials}</p>
        <div><strong>Fotos:</strong></div>
        ${entry.photos.map(photo => `<img src="${photo}" alt="Foto da atividade">`).join('')}
      `;
  
      entriesDiv.appendChild(entryDiv);
    });
  }
  
  window.onload = displayEntries;
  