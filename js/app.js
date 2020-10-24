//*Variables
//List 
const brand = document.querySelector('#brand');
const year = document.querySelector('#year'); 
const minimal = document.querySelector('#minimal'); 
const maximum = document.querySelector('#maximum')
const doors = document.querySelector('#doors'); 
const transmission = document.querySelector('#transmission'); 
const colour = document.querySelector('#colour');

//Results 
const results = document.querySelector('#result');
const maxYear = new Date().getFullYear(); 
const minYear = maxYear - 10;

//Finder Object 
const searchData = { 
  brand: '', 
  year: '', 
  minimal: '', 
  maximum: '', 
  doors: '', 
  transmission: '', 
  colour: ''
}


//*Events 
document.addEventListener('DOMContentLoaded', () => { 
  startApp(cars)
  completeYear();
});

brand.addEventListener('change', e => { 
  searchData.brand = e.target.value;
  filterCar();
})

year.addEventListener('change', e => { 
  searchData.year = e.target.value; 
  filterCar();
})

minimal.addEventListener('change', e => { 
  searchData.minimal = e.target.value; 
  filterCar();
})

maximum.addEventListener('change', e => { 
  searchData.maximum = e.target.value;
  filterCar();
})

doors.addEventListener('change', e => { 
  searchData.doors = e.target.value;
  filterCar();
})

transmission.addEventListener('change', e => { 
  searchData.transmission = e.target.value;
  filterCar();
})

colour.addEventListener('change', e => { 
  searchData.colour = e.target.value; 
  filterCar();
})

//*Functions
function startApp(cars) { 
  //Clear
  clearHTML();

  cars.forEach(car => { 
    const { brand, model, year, price, doors, transmission, colour } = car;
    const p = document.createElement('p'); 

    p.textContent = `
    Brand: ${brand}--${model} - Year: ${year} - Price: $${price} - Doors: ${doors} - Transimission: ${transmission} - Colour: ${colour}
    `
    results.appendChild(p);
  })
}

function completeYear() { 
  for(let i = maxYear; i >= minYear; i--){ 
    let option = document.createElement('option'); 
    option.value = i;
    option.textContent = i;

    year.appendChild(option);
  }
}

function filterCar() {
  const results = cars.filter(filterBrand).filter(filterYear).filter(filterMinimal)
  .filter(filterMaximum).filter(filterDoors).filter(filterTransmission).filter(filterColour);

  if( results.length ){ 
    startApp(results);
  }else { 
    showError();
  }

}

function filterBrand(car) { 
  const { brand } = searchData;

  if( brand ) { 
    return car.brand === brand;
  }
  return car;
}

function filterYear(car) {
  const { year } = searchData; 

  if( year ) { 
    return car.year === parseInt(year);
  }
  return car;
}

function filterMinimal(car) { 
  const { minimal } = searchData; 

  if( minimal ) { 
    return car.price >= minimal; 
  }
  return car;
}

function filterMaximum(car) { 
const { maximum } = searchData; 

if( maximum ) { 
  return car.price <= maximum; 
}
return car;
}

function filterDoors(car) { 
  const { doors } = searchData; 

  if( doors ) { 
    return car.doors === parseInt(doors);
  }
  return car;
}

function filterTransmission(car) { 
  const { transmission } = searchData;

  if( transmission ) { 
    return car.transmission === transmission;
  }
  return car;
}

function filterColour(car) { 
  const { colour } = searchData; 

  if( colour ) { 
    return car.colour === colour;
  }

  return car;
}

function showError() { 
  const p = document.createElement('p'); 

  clearHTML();
  p.classList.add('alerta', 'error'); 
  p.textContent = 'Your search does not match, try another'

  results.appendChild(p);
}

function clearHTML() {
  while( results.firstChild ) { 
    results.removeChild(results.firstChild);
  }
} 