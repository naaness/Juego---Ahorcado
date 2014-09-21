
var REX=null,
    REY=null,
    audio=null,
    game  = {};

var GAME = (
	function () {
    	var pin = 7,
    		imaga = [null,null,null,null,null,null,null],
    		letra=[],
    		frase= ["Identifique sus ingresos y gastos mensuales",
    				"comprometase a ahorrar un porcentaje de sus ingresos",
    				"Tome el control de sus finanzas",
    				"Compare condiciones, precio y calidad",
    				"Pague puntualmente las deudas",
    				"Provisione para imprevistos",
    				"Use el credito a su favor",
    				"Evite los sobrecostos del credito informal",
    				"Defina con cuidado el plazo de sus deudas",
    				"Organice, reduzca o elimine los gastos innecesarios",
    				"Pongase metas especificas y ahorre regularmente para lograrlas",
    				"Invierta su dinero de la mejor manera",
    				"Si tiene un nivel de deudas elevado, asesorese",
    				"El credito formal es aquel que se solicita en una entidad financiera",
    				"Aprenda a usar bien su tarjeta de credito",
    				"Es un deudor moroso cuando no paga a tiempo",
    				"Endeudese con sensatez y responsabilidad",
    				"Para tener buena vida crediticia debe pagar a tiempo",
    				"Tener un buen historial crediticio es una buena carta de presentacion comercial"],
    		letraQ=[],
    		cont=null,
    		cont2=null,
    		msgfin="VAMOS A JUGAR!",
    		logo1=null,
    		logo2=null,
    		state=0,
    		boto=null,
    		estrella=null,
    		tempo=null,
    		ima=[],
    		click=0,
    		numr=null,
    		ctxHeight=null,
    		ctxWeight=null,
    		ctxHeight1=null,
    		ctxWeight1=null,
    		sonidos=[],
    		map = null;
	        
    	function init(wrapper, root) {
			ajuste=wrapper;
			
        	ctxHeight1 = wrapper.offsetHeight;
        	ctxWeight1 = wrapper.offsetWidth;
        	canvas = document.createElement("canvas");
        	canvas.setAttribute("width", ctxWeight1 + "px");
        	canvas.setAttribute("height", ctxHeight1 + "px");
        	//canvas.width = window.innerWidth;
			//canvas.height = window.innerHeight;
			canvas.setAttribute("background","transparent");
			canvas.setAttribute("id","canvasdiv");
        	wrapper.appendChild(canvas);
        	ctx  = canvas.getContext('2d');
			map = new game.Map(ctxWeight, ctxHeight);
			boto = new  game.Boton(360, 500,"INICIAR",200);
			boto2 = new  game.Boton(20, 550,"TERMINAR",150);
			//crear();
			logo1 = new Image()
			logo1.src = "sprit/LOGOTIPO_BANCO_POPULAR.jpg";
			logo2 = new Image()
			logo2.src = "sprit/maxresdefault.png";
			abss="abcdefghijklmnopqrstuvwxyz",
			abss=abss.toUpperCase();

			abss="abcdefghijklmnñopqrstuvwxyz",
			abss=abss.toUpperCase();
			incre=20;
			for (var i = 0; i < abss.length; i++) {

				lett=abss.slice(i,i+1);
				if(i==0){
					incre=270;
					altu=500;
				}else if (i==8) {
					incre=220;
					altu+=45;
				}else if (i==18) {
					incre=250;
					altu+=45;
				};
				nume=(i+1);
				if (i<9) {
					nume="0"+(i+1);
				};
				tempo1 = new Image()
				tempo1.src = "sprit/letra_-"+nume+".png";
				tempo2 = new Image()
				tempo2.src = "sprit/letra_roja_-"+nume+".png";
				letra[i] = new game.Letra(lett,incre,altu,tempo1,tempo2);
				wx=50;
				incre+=wx;
			};
			temp = new Image()
			temp.src = "sprit/estrella.png";
			estrella = new game.BotonIma("a",temp,50,500,256,256,0.4,0.4);

			audio = new game.Audio({"soundDisabled":soundDisabled});
			var extension = Modernizr.audio.ogg ? 'ogg' : 'mp3';
			var audio_files = [
				["click", root + "sounds/click." + extension],
				["wrong", root + "sounds/wrong." + extension],
				["win", root + "sounds/win." + extension],
				["lose", root + "sounds/lose." + extension],
				["segundero", root + "sounds/segundero." + extension],
				["chicharra", root + "sounds/chicharra." + extension]
			];
			sonidos[0]="click";
			sonidos[1]="wrong";
			sonidos[2]="win";
			sonidos[3]="lose";

			map.draw(ctx);
			ctx.fillStyle = "#000";
			ctx.font ="bold 22px sans-serif"
			leta="Cargando..";
			
			movx=400;
			movy=420;
			tempo1 = new Image()
			tempo1.src = "sprit/1_BASE.png";
			ima[ima.length] = new game.imagen(tempo1,408+movx,153+movy,937,543,937*.17,543*.17,false);
			tempo1 = new Image()
			tempo1.src = "sprit/2_ESCALERA.png";
			ima[ima.length] = new game.imagen(tempo1,390+movx,180+movy,457,417,457*.20,417*.20,false);
			tempo1 = new Image()
			tempo1.src = "sprit/3_POSTE.png";
			ima[ima.length] = new game.imagen(tempo1,425+movx,47+movy,172,808,172*.15,808*.15,false);
			tempo1 = new Image()
			tempo1.src = "sprit/4_SOPORTE_POSTE.png";
			ima[ima.length] = new game.imagen(tempo1,430+movx,50+movy,178,152,178*.23,152*.23,false);
			tempo1 = new Image()
			tempo1.src = "sprit/5_BRAZO_POSTE.png";
			ima[ima.length] = new game.imagen(tempo1,425+movx,40+movy,471,119,471*.20,119*.20,false);
			tempo1 = new Image()
			tempo1.src = "sprit/6_LAZO.png";
			ima[ima.length] = new game.imagen(tempo1,480+movx,53+movy,101,350,101*.20,350*.15,true);
			tempo1 = new Image()
			tempo1.src = "sprit/7_Ahorcado.png";
			ima[ima.length] = new game.imagen(tempo1,480+movx,80+movy,197,542,197*.15,542*.15,true); 

			temporiza= new game.Reloj(100,170);
			
			loadSound(audio_files, function() { loaded(); });
			//loaded();
    	};
    	function soundDisabled() {
			return localStorage["soundDisabled"] === "true";
		};
    	function loadSound(arr, callback) {
			if (arr.length === 0) { 
				callback();
			} else { 
				var x = arr.pop();
				
				audio.load(x[0], x[1], function() { loadSound(arr, callback); });
			}
		};
		function loaded() {

        	document.addEventListener("keydown", keyDown, true);
        	document.addEventListener("keyup", keyUp, true);
			document.addEventListener("mousedown", MauseClick, true);   
			document.addEventListener("mousemove", mousemove, true);
			document.addEventListener("mouseup",MouseUp , true);
			document.addEventListener("touchmove", touchXY, true);
			document.addEventListener("touchstart", touchDown, false);
			document.body.addEventListener("touchcancel", touchUp, false);
        	timer = window.setInterval(mainLoop, 1000/30);
    	};
    	function responsi(wx,hy){
    	    anch=window.innerWidth;
			alto=window.innerHeight;
			rest=30;
			if ((anch<(wx-rest)) || (alto<(hy))) {
				if (alto/hy>anch/wx) {
					document.getElementById("canvasdiv").style.width= (anch-rest) + "px"; 
        			document.getElementById("cont-general").style.width= (anch-rest) + "px";
        			document.getElementById("cont-general").style.height= ((anch-rest)*ctxHeight/ctxWeight) + "px";
				}else{
					document.getElementById("canvasdiv").style.width= ((ctxWeight-rest)*alto/hy) + "px"; 
        			document.getElementById("cont-general").style.width= ((ctxWeight-rest)*alto/hy) + "px";
        			document.getElementById("cont-general").style.height= ((ctxHeight-rest)*alto/hy) + "px";
				}
        	}else{
        		document.getElementById("canvasdiv").style.width= wx+"px";
        		document.getElementById("cont-general").style.width= wx+"px";
        		document.getElementById("cont-general").style.height= hy+"px";
        	}
        	REX=document.getElementById("canvasdiv").offsetWidth/wx;
        	REY=document.getElementById("canvasdiv").offsetHeight/hy;
        	

    	}
		function mainLoop() {
			// if( window.innerHeight == screen.height) {
			//     responsi(window.innerWidth, window.innerHeight);
			// }else{
			// 	responsi(1000, 700);
			// }

			
			

		    responsi(ctxWeight1, ctxHeight1);
		    canvas.width = canvas.width
			map.draw(ctx);

			
			
			for (var i = 0; i < letra.length; i++) {
				letra[i].draw(ctx);
			}
			for (var i = 0; i < letraQ.length; i++) {
				letraQ[i].draw(ctx);
			}

			// ctx.fillStyle = "#0F0";
			// ctx.font ="bold 22px sans-serif"
			// ctx.fillText("Oportunidades :" + REX,10,50);
			// ctx.fillText("Letras restantes :" + REY,10,80);

			ctx.beginPath();
   			ctx.drawImage(logo1,0,0,750,110,385,130,653*.7,110*.5);
   			ctx.drawImage(logo2,0,0,644,621,800,80,644*.25,621*.25);
   			ctx.closePath();
			
			for (var i = 0; i < ima.length; i++) {
				ima[i].draw(ctx);
			};

			if (state==0){

				ctx.beginPath();
				ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
				ctx.fillRect(0, 400, 1000, 200);
				ctx.closePath();

				ctx.fillStyle = "#000";
    			ctx.font ="bold 22px sans-serif"
				ctx.fillText(msgfin,document.getElementById("canvasdiv").offsetWidth/2-ctx.measureText(msgfin).width/2-40,470);
			    boto.draw(ctx);
			}else{
				if (cont<=0) {
					state=0;
					msgfin="Felcitaciones!!. Has ganado!!";
					audio.PararSonido();
					audio.play(sonidos[2]);
					temporiza.inicia(0);
				}else if (pin<=0) {
					state=0;
					msgfin="Lo sentimos. Has perdido";
					audio.PararSonido();
					audio.play(sonidos[3]);
					temporiza.inicia(0);
				};
				estrella.draw(ctx);
				//boto2.draw(ctx);
			}
			temporiza.draw(ctx);
			
			
		}
		
		function keyDown(e) {
			
    	} 
		
		function keyUp(e) {
			if (e.keyCode === KEY.ARROW_LEFT){
				player.setIncreX(0);
			}else if (e.keyCode === KEY.ARROW_RIGHT){
				player.setIncreX(0);
			}else if (e.keyCode === KEY.ARROW_UP){
				player.setIncreY(0);
			}else if (e.keyCode === KEY.ARROW_DOWN){
				player.setIncreY(0);
			}
			
		}
		function MauseClick(e) {
			if (e.which==1 && click==0){
				click=1;
				presLet();
			}
		}
		function presLet(){
			if (state==1) {
				for (var i = 0; i < abss.length; i++) {
	    			if (!letra[i].getCliked()) {
	    				letra[i].cliked(xxx,yyy);

	    				if (letra[i].getCliked()) {
	    					lossed=true;
	    					for (var j = 0; j < letraQ.length; j++) {
	    						if (letra[i].getLet()==letraQ[j].getLet().toUpperCase()) {
	    							lossed=false;
	    							letraQ[j].change();
	    							cont-=1;
	    						};
	    					}
	    					if (lossed) {
	    						letra[i].setColor(2,true)
	    						//cont2-=1;
	    						//if (cont2<0) {
	    							//ima[7-pin].change();
	    							//pin-=1;
	    						//};
	    						
	    						audio.PararSonido();
								audio.play(sonidos[1]);
								
	    					}else{
	    						audio.PararSonido();
								audio.play(sonidos[0]);
	    					};
	    					
	    					
	    					
	    					cont2-=1;
    						if (cont2<0) {
    							temporiza.inicia(1000/35);
    							ima[7-pin].change();
    							pin-=1;
    						};
	    				}
	    			};
				};
			}
			if (!estrella.getcliked() && state==1) {
    			estrella.cliked();
    			if (estrella.getcliked()) {
    				for (var j = 0; j < letraQ.length; j++) {
    					letraQ[j].change();
    				}
    				audio.PararSonido();
					audio.play(sonidos[2]);
    				msgfin="Felcitaciones!!. Has ganado!!";
    				temporiza.inicia(0);
    				state=0;
    			};
    		};

    		if (!boto.getcliked() && state==0) {
    			boto.cliked();
    			if (boto.getcliked()) {
    				state=1;
    				crear();
    			};
    		}
    		
		}
		function crear(){
		    pin=7;
		    cont2=2;
			letraQ.length=0;
			
			for (var i = 0; i < letra.length; i++) {
				letra[i].resetL();
			}
			numr=Math.floor((Math.random()*frase.length)+0);
			palabras=frase[numr].toUpperCase().split(" ");
			incre=20;
			increy=300;
			cont=0;
			vaini=-1;
			vafin=-1;
			for (var i = 0; i < palabras.length; i++) {
				if ((incre+3*ctx.measureText(palabras[i]).width)>1000) {
					increy+=50;
					acum=(1000-incre)/2;

					incre=20;
					for (var j = vaini; j <= vafin; j++) {
						letraQ[j].setAddX(acum);
					}
					vaini=-1;
					vafin=-1;
				};
				pala = palabras[i];

				for (var j = 0; j < pala.length; j++) {
					lett= pala.slice(j,j+1);
					if (vaini==-1) {
						vaini=letraQ.length;
					};
					vafin=letraQ.length;
					letraQ[letraQ.length] = new game.LetraQuest(lett,incre,increy);
					if (lett==",") {
						letraQ[vafin].change();
						cont-=1;
					};
					wx=41;
					cont+=1;
					incre+=wx;
				}
				incre+=20;
			}

			acum=(1000-incre)/2;

			incre=20;
			for (var j = vaini; j <= vafin; j++) {
				letraQ[j].setAddX(acum);
			}
			vaini=-1;
			vafin=-1;

			for (var i = 0; i < 7; i++) {
				ima[i].resetM();
			};
			 

			boto.setcliked(false);
			estrella.setcliked(false);
			estrella.setTexto(numr+1);
		}
		
    	function mousemove(e){
    		mouseIsDown=1;
			canvay=document.getElementById("canvasdiv").offsetTop;
			canvax=document.getElementById("canvasdiv").offsetLeft;
			
			asa=document.body.scrollTop;
			ada=window.scrollY;
			if(ada>asa){
				jojo=ada;
			}else{
				jojo=asa;
			}		
			xxx = e.clientX-canvax;
			yyy = e.clientY-(canvay-jojo);
			//xxx = xxx*REX;
		}
		xxx=null;
		yyy=null;
		function touchXY(e){
			canvay=document.getElementById("canvasdiv").offsetTop;
			canvax=document.getElementById("canvasdiv").offsetLeft;
			
			asa=document.body.scrollTop;
			ada=window.scrollY;
			if(ada>asa){
				jojo=ada;
			}else{
				jojo=asa;
			}
			
            if (!e)
                e = event;
            e.preventDefault();
            xxx = e.targetTouches[0].pageX-canvax;
            yyy = e.targetTouches[0].pageY-(canvay-jojo);
            presLet();
		}
		function touchDown() {
			touchIsDown=1;
            touchXY();
        }
        function touchUp(e) {
            touchIsDown=0;
        }
		function MouseUp(e){
			click=0;
		}
		return {
        	"init" : init
    	}
	}
	()	
);

game.Map = function (ctxWeight, ctxHeight) {
	function draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(200, 200, 200, 0.0)";
		ctx.fillRect(0, 0, ctxWeight, ctxHeight);
		ctx.closePath();
	}
	return {
       	"draw" : draw
    };
}

game.Letra = function (le,x,y,normal,rojo){
	var lett=le,
		posx=x,
		posy=y,
		anch=40,
		alto=40,
		imgn=normal,
		imgr=rojo,
		color=normal,
		rest=0,
		font="bold 22px sans-serif",
		clickIt=false,
		visible=true,
		spri=0,
		anima=0;
	function draw(ctx) {
		// ctx.beginPath();
		// ctx.fillStyle = "#AAA";
		// ctx.fillRect(posx, posy-rest, anch, alto);
		// ctx.closePath();
		if (visible) {
			if (anima>0) {
				if (anima<10) {
					spri+=1;
				}else if (anima<20) {
					spri-=1;
				}else if (anima<30) {
					spri+=2;
				}else if (anima<40) {
					spri-=2;
				};
				anima-=1;
			};

			ctx.drawImage(color,0,0,180,180,posx,posy+spri,anch,alto);
			ctx.fill();
		};
	}
	function cliked(xx,yy){
		ctx.beginPath();
		if (xx/REX>posx && xx/REX<(posx+anch)) {
			if (yy/REY>(posy-rest) && yy/REY<(posy-rest+alto)) {
				clickIt=true;
				visible=false;
				anima=40
				spri=0;
				color=imgr;
			};
		};
		// ctx.beginPath();
		// ctx.fillStyle = "#00F";
		// ctx.fillRect(posx, posy-rest, anch, alto);
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.fillStyle = "#F00";
		// ctx.fillRect(xxx/REX, yyy/REY, anch, alto);
		// ctx.closePath();
		
	}
	function getLet(){
		return lett;
	}
	function setColor(val,verd){
		if (val==1) {
			color=imgn;
		}else{
			color=imgr;
		};
		visible=verd;
	}
	function getCliked(){
		return clickIt;
	}
	function resetL(){
		clickIt=false;
		anima=0;
		color=imgn;
		visible=true;
		spri=0;
	}
	return {
       	"draw" : draw,
       	"getLet" : getLet,
       	"getCliked" : getCliked,
       	"setColor" : setColor,
       	"cliked" : cliked,
       	"resetL" : resetL
    };
}
game.LetraQuest = function (le,x,y){
	var let=le,
		posx=x,
		posy=y,
		rest=15,
		font="bold 36px sans-serif",
		visible=false,
		color="#444";
	function draw(ctx) {
		
		ctx.beginPath();
		ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
		ctx.fillRect(posx+1, posy-28, 30, 30);
		ctx.strokeStyle="#FFF";
		ctx.strokeRect(posx-3, posy-32, 38, 38);
		ctx.closePath();

		if (visible) {
			ctx.fillStyle = color;
			ctx.font = font;
			ctx.fillText(let,posx+15-ctx.measureText(let).width/2,posy);
		};
		
	}
	function change(){
		//color = "#F00";
		visible=true;
	}
	function setAddX(xx){
		posx+=xx;
	}
	function getLet(){
		return let;
	}

	return {
       	"draw" : draw,
       	"getLet"  : getLet,
       	"setAddX" : setAddX,
       	"change" : change
    };
}
game.imagen = function(im,x,y,wx,hy,zx,zy,ani){
   var  posx=x,
		posy=y,
		anch=wx,
		alto=hy,
		zzx=zx,
		zzy=zy,
		imgn=im,
		visible=false,
		animacion=ani,
		spri=0,
		mov=0;
	function draw(ctx) {
		mov=0;
		if (animacion) {
			if (spri==0) {
				spri=20;
			}else if (spri<10) {
				mov+=.45;
			}else if (spri<20) {
				mov-=.45;
			};
			spri-=1;
		};
		if (visible) {
			// ctx.beginPath();
   			//  ctx.fillStyle = "#666";
   			//  ctx.fillRect(posx, posy, 15, 15);
   			//  ctx.closePath();
   			ctx.beginPath();
   			ctx.drawImage(imgn,0,0,anch,alto,posx+mov,posy,zzx,zzy);
   			ctx.closePath();
		};
	} 
	function change(){
		visible=true;
	}
	function resetM(){
		spri=0;
		visible=false;
	}
	return {
       	"draw" : draw,
       	"change" : change,
       	"resetM" : resetM
    };
}
game.Boton = function(x,y,tex,wx){
	var  posx=x,
		texto=tex,
		posy=y,
		anch=wx,
		alto=45,
		selected=false,
		color1="#444";
	function draw(ctx) {
		color="#CCF";
		if (xxx/REX>posx && xxx/REX<(posx+anch)) {
			if (yyy/REY>(posy-rest) && yyy/REY<(posy+alto)) {
				color="#DDF";				
			};
		};
		DibujarBoton2(posx,posy,color,anch,45)
	}
	function DibujarBoton2(xBT,yBT,color,Lmenu,Amenu) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(xBT,yBT+10,Lmenu,Amenu-2*10);
		ctx.rect(xBT+10,yBT,Lmenu-2*10,10);
		ctx.rect(xBT+10,yBT+Amenu-10,Lmenu-2*10,10);
		ctx.arc(xBT+10,yBT+10,10,0,Math.PI*2,false);
		ctx.arc(xBT+Lmenu-10,yBT+10,10,0,Math.PI*2,false);
		ctx.arc(xBT+10,yBT+Amenu-10,10,0,Math.PI*2,false);
		ctx.arc(xBT+Lmenu-10,yBT+Amenu-10,10,0,Math.PI*2,false);
   		ctx.fill();

   		ctx.fillStyle = "#000";
		ctx.font ="bold 22px sans-serif"
		ctx.fillText(texto,posx+anch/2-ctx.measureText(texto).width/2,posy+30);
	}
	function cliked(){
		if (xxx/REX>posx && xxx/REX<(posx+anch)) {
			if (yyy/REY>(posy-rest) && yyy/REY<(posy+alto)) {
				selected=true;			
			};
		};
	}
	function getcliked(){
		return selected;
	}
	function setcliked(val){
		 selected=val;
	}
	return {
       	"draw" : draw,
       	"cliked" : cliked,
       	"getcliked" : getcliked,
       	"setcliked" : setcliked
    };
}
game.BotonIma = function(text,img,x,y,wx,hy,zzx,zzy){
	var texto=text,
		ima=img,
		posx=x,
		posy=y,
		anch=wx,
		alto=hy,
		escx=zzx,
		escay=zzy,
		selected=false;
	function draw(ctx) {
		ctx.beginPath();
		ctx.drawImage(ima,0,0,anch,alto,posx,posy,anch*escx,alto*escay);
   		ctx.closePath();
   		ctx.fillStyle = "#F60";
		ctx.font ="bold 28px sans-serif"
   		ctx.fillText(texto,posx+anch*escx/2-ctx.measureText(texto).width/2,posy+alto*escay/2+10);
	}
	function cliked(){
		if (xxx/REX>posx && xxx/REX<(posx+anch*escx)) {
			if (yyy/REY>(posy-rest) && yyy/REY<(posy+alto*escay)) {
				selected=true;			
			};
		};
	}
	function getcliked(){
		return selected;
	}
	function setcliked(val){
		 selected=val;
	}
	function setTexto(val){
		texto=val;
	}
	return {
       	"draw" : draw,
       	"cliked" : cliked,
       	"getcliked" : getcliked,
       	"setcliked" : setcliked,
       	"setTexto" : setTexto
    };
}
game.Reloj = function(x,y) {
	var posx=x,
		posy=y,
		visible=false,
		total2=0,
		n=null,
		total=0,
		segun=0;
	function draw(ctx) {
		if (total>0) {
			segun+=1;
			s=50;
			var d = new Date();
			var tp=d.getTime()-n;
			ctx.beginPath();
			ctx.fillStyle = "rgba(240, 250, 250, 0.5)";
			ctx.arc(posx,posy,s,0-Math.PI/2,Math.PI*2*tp/1000-Math.PI/2,false);
			ctx.arc(posx,posy,1,Math.PI*2*tp/1000-Math.PI/2,0-Math.PI/2,false);
			ctx.fill();
		    ctx.closePath()
		    ctx.beginPath();
		    ctx.fillStyle = "#090";
			ctx.font ="bold 50px sans-serif"
	   		ctx.fillText(total2,posx-ctx.measureText(total2).width/2,posy+20);
	   		ctx.closePath()
			if (tp>=1000) {
				n+=1000;
				audio.PararSonido();
				audio.play("segundero");
				total2-=1;
				if (total2==0) {
					total=0;
					audio.PararSonido();
					audio.play("chicharra");
				};
			};
		};
		
	}
	function inicia(va){
		total=va;
		total2=15;
		var d = new Date();
		n = d.getTime();
		n2 = n+1000;
	}
	return {
       	"draw" : draw,
       	"inicia" : inicia
    };
}

game.Audio = function(game) {
    
    var files          = [], 
        endEvents      = [],
        progressEvents = [],
        playing        = [];
    
    function load(name, path, cb) { 

        var f = files[name] = document.createElement("audio");

        progressEvents[name] = function(event) { progress(event, name, cb); };
        
        f.addEventListener("canplaythrough", progressEvents[name], true);
        f.setAttribute("preload", "true");
        f.setAttribute("autobuffer", "true");
        f.setAttribute("src", path);
        f.pause();        
    };

    function progress(event, name, callback) { 
        if (event.loaded === event.total && typeof callback === "function") {
            callback();
            files[name].removeEventListener("canplaythrough", progressEvents[name], true);
        }
    };

    function disableSound() {
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].pause();
            files[playing[i]].currentTime = 0;
        }
        playing = [];
    };
	function PararSonido() {
		for (var i = 0; i < playing.length; i++) {
            files[playing[i]].pause();
            files[playing[i]].currentTime = 0;
        }
	}
    function ended(name) { 

        var i, tmp = [], found = false;

        files[name].removeEventListener("ended", endEvents[name], true);

        for (i = 0; i < playing.length; i++) {
            if (!found && playing[i]) { 
                found = true;
            } else { 
                tmp.push(playing[i]);
            }
        }
        playing = tmp;
    };

    function play(name) { 
        if (!game.soundDisabled()) {
            endEvents[name] = function() { ended(name); };
            playing.push(name);
            files[name].addEventListener("ended", endEvents[name], true);
            files[name].play();
        }
    };

    function pause() { 
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].pause();
        }
    };
    
    function resume() { 
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].play();
        }        
    };
    
    return {
        "disableSound" : disableSound,
        "load"         : load,
        "play"         : play,
        "pause"        : pause,
		"PararSonido"  : PararSonido,
        "resume"       : resume
    };
};
/* Human readable keyCode index */
var KEY = {'UNO' : 49,'DOS' : 50,'BACKSPACE': 8, 'TAB': 9, 'NUM_PAD_CLEAR': 12, 'ENTER': 13, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PAUSE': 19, 'CAPS_LOCK': 20, 'ESCAPE': 27, 'SPACEBAR': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'ARROW_LEFT': 37, 'ARROW_UP': 38, 'ARROW_RIGHT': 39, 'ARROW_DOWN': 40, 'PRINT_SCREEN': 44, 'INSERT': 45, 'DELETE': 46, 'SEMICOLON': 59, 'WINDOWS_LEFT': 91, 'WINDOWS_RIGHT': 92, 'SELECT': 93, 'NUM_PAD_ASTERISK': 106, 'NUM_PAD_PLUS_SIGN': 107, 'NUM_PAD_HYPHEN-MINUS': 109, 'NUM_PAD_FULL_STOP': 110, 'NUM_PAD_SOLIDUS': 111, 'NUM_LOCK': 144, 'SCROLL_LOCK': 145, 'SEMICOLON': 186, 'EQUALS_SIGN': 187, 'COMMA': 188, 'HYPHEN-MINUS': 189, 'FULL_STOP': 190, 'SOLIDUS': 191, 'GRAVE_ACCENT': 192, 'LEFT_SQUARE_BRACKET': 219, 'REVERSE_SOLIDUS': 220, 'RIGHT_SQUARE_BRACKET': 221, 'APOSTROPHE': 222};

