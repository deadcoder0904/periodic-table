document.addEventListener('DOMContentLoaded',function() {
	const el = document.querySelector('.periodic-table');

	function handleData([colors, periodicTable]) {
		for (let i=0; i < colors.length; i++) {
			const backgroundColor = colors[i].backgroundColor;
			const color = colors[i].color;
			const span = document.createElement('span');
			span.className = 'color';
			span.innerHTML = `${periodicTable[i].number}. ${periodicTable[i].name} (${periodicTable[i].symbol}) <br />${periodicTable[i].mass || ''}`;
			span.style.color = color;
			span.style.background = backgroundColor;
			el.appendChild(span);
		}
	}

	const colorsPromise = fetch(`https://raw.githubusercontent.com/deadcoder0904/random-colors-generator/master/json/colors.json`)
							.then(arr => arr.json())
							.then(res => res);

	const periodicTablePromise = 	fetch(`https://gist.githubusercontent.com/deadcoder0904/ff5b7362deb2ddc84e41ed67c692487e/raw/b417eb43481b99191f053af8387f41937371df97/periodic_table.js`)
																.then(arr => arr.json())
																.then(res => res);

	Promise.all([colorsPromise, periodicTablePromise]).then(values => {
	  const periodicTable = values[1];
	  const colors = values[0].slice(0, periodicTable.length);
	  handleData([colors,periodicTable]);
	});
});
