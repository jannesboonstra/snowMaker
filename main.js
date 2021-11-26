$( function () {
	//knop om sneeuw aan en uit te zetten
	var button = document.getElementById("button");
	//variabel om te kijken of het sneeuwt of niet
	var isSnowing = false;

	//functie die geactiveerd wordt bij het klikken van de knop
	button.addEventListener('click', function(){

		//als het sneeuwt, pak de functie stop met sneeuwen
		if(isSnowing){
			//functie stop met sneeuwen wordt aangeroepen
			stopSnow();
			//verander de tekst van de button
			button.innerText = "Let it snow";
		} else {
			//als het niet sneeuwt, laat het sneeuwen
			playSnow();
			//verander de tekst van de button
			button.innerText = "Stop snow";
		}
		//verander de variabel van false naar true of andersom
		isSnowing = !isSnowing;
	})

	//hoeveelheid sneeuwvlokjes
	var snowflakesCount = 50;

	//de plek waar de sneeuwvlokjes vallen
	var snowContainer = document.getElementById("snow");

	//maak een sneeuwvlokje met i als index voor een nummer van sneeuwvlokje
	function createSnowflake(i){
		// maak een nieuw 'div' element aan
		var flake = document.createElement("div");
		//geef een classnaam: snowflake
		flake.className = "snowflake";
		//geef nog een classnaam: snowflake plus een indexnummer
		flake.classList.add("snowflake" + i);
		//geef nog een classnaam welke de grootte van sneeuwvlok bepaalt
		flake.classList.add("snowSize" + Math.floor((Math.random() * 4)+ 1));
		// zet de sneeuwvlok op een willekeurige plek op de X-as neer
		var positionX = Math.floor((Math.random() * snowContainer.clientWidth));
		flake.style.left = positionX.toString() + "px";
		//zet de sneeuwvlok in de 'parent' container
		snowContainer.appendChild(flake);
	}

	//functie die het laat sneeuwen met eventueel een aantal sneeuwvlokjes
	function playSnow(num){
		//als er een getal meegegeven is, zet dat getal als aantal
		if(num){
			snowflakesCount = num;
		}

		//het getal bepaald hoeveel sneeuwvlokjes gemaakt worden in de for-loop
		for(var i = 0; i < snowflakesCount; i++){
			//maak één keer een sneeuwvlok per keer
			createSnowflake(i);
			//geef het een jquery variabel mee met een index nummer
			var flake = ".snowflake" + i;
			// laat random bepalen op welk tijdstop het vlokje naar beneden valt tussen 0-8s
			var delay = "=+" + Math.random() * 8 .toFixed(2);
			// laat random de snelheid bepalen van minimaal 4s en maximaal 6s
			var speed = ((Math.random() * 6 ) + 4).toFixed(2);
			//terugspoelen op de tijdlijn
			var rewind = "=-"+speed;
			//bepaalt hoeveelheid afstand het vlokje naar links of rechts valt
			var movement = Math.floor(Math.random() * 100);
			//bepaalt of het vlokje naar links of rechts valt
			var negative = Math.floor(Math.random() * 2);
			//zoekt de bodem van de container op en gaat iets verder dan dat
			var bottom = snowContainer.clientHeight + 60;

			//als de negative variabel 1 is, maak het movement getal negatief om naar links te vallen ipv rechts 
			if(negative == 1){
				movement = -movement;
			}

			//maak een GSAP tijdlijn aan om het sneeuwvlokje naar beneden te laten vallen, tijdlijn staat op -1 repeat voor oneindig vallen.
			var tl = new TimelineMax({repeat: -1})
			//deze .to bepaald de Y as
			.to(flake, speed, {y: bottom, ease: Power0.easeNone}, delay)
			//deze .to bepaald de X as
			.to(flake, speed, {x: movement, ease: Power2.easeInOut}, rewind)

			// de .to is een onderdeel van de GSAP tijdlijn met een aantal parameters:
			//  de eerste is het onderdeel dat geanimeerd moet worden
			// de tweede is de snelheid van de animatie
			// de derde is een object met css attributen voor de animatie, hoeveelheid afstand en ease voor verzachtende animatie
			// de vierde is het moment van de animatie
			// de tweede .to heeft moet tegelijkertijd afgespeeld worden als de eerste, vandaar dat deze de variabel rewind (negatieve speed variabel) krijgt, dat is de hoeveelheid tijd dat de eerste .to nodig heeft om te vallen
			;
		}

	}

	//laat het stoppen met sneeuwen functie
	function stopSnow(){
		//pak alle sneewvlokjes in de parent container
		var flakes = snowContainer.children;
		//voor elk vlokje in de container, geef het een class 'disappear' waarmee met CSS het vlokje naar opacity:0 verschuift met een transitie van .8s
		for(var i = 0; i < flakes.length; i++){
			flakes[i].classList.add('disappear');   
		}
		//wacht .8s tot alle sneeuwvlokjes verdwijnen in .8s en maak dan de parent container leeg
		setTimeout(function(){
			snowContainer.innerHTML = "";
		}, 800)
	}

});