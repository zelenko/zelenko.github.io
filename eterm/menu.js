// gets all <li> within #menu element
var menuli = document.getElementById('menuv').getElementsByTagName('li');
var nrmenuli = menuli.length;
var oli = [];        // store horisontal menu items
var crt_oli;         // store current horisontal element
var vli = [];        // store vertical menu list in within current horisontal element
var nroli = 0;       // number of horisontal menu items
var nrvli = 0;       // number of vertical menu lists
var url_adr = '';    // store the URL address added in the anchor <a> of current navigated list

// traverse $menuli to add the horisontal menus in $oli
for(var i=0; i<nrmenuli; i++) {
  if(menuli[i].className == 'oli') {
    oli.push(menuli[i]);
  }
}

var ih = -1;     // to store the index of current horizontal item in $oli
var iv = -1;    // to store the index of current vertical item in $vli

// TOP MENU   ================================================
// accessed on press the Left /Right arrow keys
function showOli(index) {
  iv = -1;       // reset imdex of vertical menu when moves to other horisontal menu
  url_adr = '';     // empty this variable

  for(var i=0; i<nroli; i++) {
    oli[i].className = 'oli';
  }
  crt_oli = oli[index];     // store current horisontal element
  crt_oli.className = 'olishow';      // set class="olishow"

  // if current horisontal menu contains vertical menu, store it in $vli, and display it
  if(crt_oli.getElementsByTagName('ul').length > 0 && crt_oli.getElementsByTagName('ul')[0].getElementsByTagName('li')) {
    vli = crt_oli.getElementsByTagName('ul')[0].getElementsByTagName('li');
    nrvli = vli.length;
    document.getElementById("url").innerHTML = 'url 39: ' + url_adr;
    showVli();     // calls showVli() to set class="vli" to all list in its vertical menu

    document.getElementById("url").innerHTML = 'url 48: ' + url_adr;
  }
  else {
    // if current horisontal menu no has vertical list
    // if contains a link, calls the function setUrlAdr() to add its "href" value in $url_adr
    document.getElementById("block2").innerHTML = "no submenu, id: " + ih;
    document.getElementById("url").innerHTML = 'url 53: ' + url_adr;
    if(crt_oli.getElementsByTagName('a').length > 0) {
      setUrlAdr(crt_oli.getElementsByTagName('a')[0]);
    } 
    vli = [];        // empties $vli
    nrvli = 0;

    // this is for troubleshooting only
    document.getElementById("block2").innerHTML = "error line 57, id: " + ih;
    document.getElementById("url").innerHTML = 'url 61: ' + url_adr;
  }
}

// SUBMENU =========================================
// accessed on press the Up /Down arrow keys
function showVli(index) {
    crt_oli.className = 'olishow';
  //url_adr = '';       // empties this variable
  if(nrvli > 0) {
    url_adr = '';       // empties this variable
    for(var i=0; i<nrvli; i++) {
      vli[i].className = 'vli';
    }
    if(index >= 0) {
      vli[index].className = 'vlishow';
      
      // if contains a link, calls the function setUrlAdr() to add its "href" value in $url_adr
      if(vli[index].getElementsByTagName('a').length > 0) setUrlAdr(vli[index].getElementsByTagName('a')[0]);
      
      // see what's in submenu
      document.getElementById("block").innerHTML = "submenu " + vli[index].getElementsByTagName('a')[0] + " parent74: " + ih + " sub: " + iv;
      document.getElementById("url").innerHTML = 'url 83: ' + url_adr;
    }
  } 
}

// Assign "url_adr" when mouse clicked or keyboard key pressed.
function setUrlAdr(link) {
   //url_adr = link.onclick;
   if (link.onclick !== null) { url_adr = link.onclick.toString().split("'")[1]; }
   else {url_adr = link.href.toString().split("#")[1];}
}

// function with code to get the pressed keyboard key
function KeyCheck(e){
  nroli = oli.length;
   var keyid = (window.event) ? event.keyCode : e.keyCode;       // get the code of the key pressed

   // modify the index of horisontal /vertical item, calls the indicated function according to pressed key
   switch(keyid) {
      // Left
      case 37:
        ih--;
        if(ih < 0) ih = (nroli -1);
        showOli(ih);
        break;
      // Up
      case 38:
        iv--;
        if(iv < 0) iv = (nrvli-1);
        showVli(iv);
        break;
      // Right
      case 39:
        ih++;
        if(ih >= nroli) ih = 0;
        showOli(ih);
        break;
      // Down
      case 40:
        iv++;
        if(iv >= nrvli) iv = 0;
        showVli(iv);
      break;
      // Enter (opens the link)
      case 13:
        if(url_adr != '') {
          //window.location = url_adr;
          // nrvli is the total number of items in submenu
          // ih is the top menu id
          // iv is the submenu id
          //keyboard(url_adr);
          writer(url_adr);
          oli[ih].className = 'oli';
        } 
        break;
      // F1
      case 112:
        showOli(0);
        break;
      // F2
      case 113:
        showOli(1);
        break;
      // F2
      case 119:
        showOli(2);
        break;
      // F2
      case 120:
        showOli(3);
        break;
      // ESC
      case 27:
        //vli = [];        // empties $vli
        //nrvli = 0;      // nrvli is the total number of items in submenu
        //iv = 0;
        //ih = 0;
        showOli(0);
        writer(url_adr);
        oli[ih].className = 'oli';
        break;
   }
}

// access the KeyCheck() function when a keyboard button is pressed
document.onkeydown = KeyCheck;

// From Onclick functin, used by Mouse
function writer(i){
  document.getElementById("block").innerHTML = "Clicked on ID: " + i;
  // reset all links visibility
  for(var i=0; i<nroli; i++) {
    oli[i].className = 'oli';
  }
}
