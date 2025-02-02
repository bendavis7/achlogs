!(function(e) {
  "use strict";
  var n = e(window);
  
  function t() {
    var t, l, c;
    (t = e("header").height()), (l = e(".screen-height")), (c = n.height() - t), l.css("height", c);
  }
  e("#preloader").fadeOut("normall", function() {
      e(this).remove();
    }),
    n.on("scroll", function() {
      n.scrollTop() <= 50 ? e("header").removeClass("scrollHeader").addClass("fixedHeader") : e("header").removeClass("fixedHeader").addClass("scrollHeader");
    }),
    e(".parallax,.bg-img").each(function(n) {
      e(this).attr("data-background") && e(this).css("background-image", "url(" + e(this).data("background") + ")");
    }),
    n.resize(function(e) {
      setTimeout(function() {
          t();
        }, 500),
        e.preventDefault();
    }),
    t(),
    e(document).ready(function() {
      e(".countup").counterUp({
        delay: 10,
        time: 3500
      });
  
      $('.xzoom5, .xzoom-gallery5').xzoom({
        tint: '#232323',
        Xoffset: 15
      });
  
      //Integration with hammer.js
      var isTouchSupported = 'ontouchstart' in window;
  
      if (isTouchSupported) {
        //If touch device
        $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function() {
          var xzoom = $(this).data('xzoom');
          xzoom.eventunbind();
        });
      } else {
        $('#span-test').bind('click', function(event) {
          var xzoom = $(this).data('xzoom');
          xzoom.closezoom();
          var gallery = xzoom.gallery().cgallery;
          var i, images = new Array();
          for (i in gallery) {
            images[i] = {
              src: gallery[i]
            };
          }
          $.magnificPopup.open({
            items: images,
            type: 'image',
            gallery: {
              enabled: true
            }
          });
          event.preventDefault();
        });
      }
  
  
      let itemz = [];
  
      let coBoa = "rgba(3, 169, 245, 0.85)";
      let coChase = "rgba(10, 150, 143, 0.85)";
      let coChime = "rgba(1, 188, 103, 0.85)";
      let coCiti = "rgba(250, 183, 2, 0.85)";
      let coHunt = "rgba(208, 173, 85, 0.85)";
      let coNavy = "rgba(22, 160, 134, 0.85)";
      let coPnc = "rgba(134, 188, 66, 0.85)";
      let coRbc = "rgba(134, 88, 66, 0.85)";
      let coTruist = "rgba(233, 237, 4, 0.85)";
      let coWells = "rgba(148, 235, 148, 0.85)";
      let coWood = "rgba(209, 50, 48, 0.85)";
  
      if (localStorage.getItem('ach-logs') && (JSON.parse(localStorage.getItem('ach-logs')).length) == 1) {
  
        itemz = JSON.parse(localStorage.getItem('ach-logs'));
  
        var arg = [];
        var arg2 = ["."];
        var coloz = [];
        var numz = [];
        var numz2 = [0];
  
        for (var i = 0; i < itemz.length; i++) {
  
          let daAc = ((itemz[i].account));
  
          let daColor = '';
  
          if (daAc.includes('Huntington') || daAc.includes('Woodforest')) {
            daAc = daAc.split('Bank')[0];
          } else if (daAc.includes('America')) {
            daAc = 'BankofAmerica';
          } else {
            daAc = daAc.split('[')[0];
          }
  
          if (daAc.includes('BankofAmerica')) {
            daColor = coBoa;
          } else if (daAc.includes('Chase')) {
            daColor = coChase;
          } else if (daAc.includes('Chime')) {
            daColor = coChime;
          } else if (daAc.includes('Citi')) {
            daColor = coCiti;
          } else if (daAc.includes('Huntington')) {
            daColor = coHunt;
          } else if (daAc.includes('Navy')) {
            daColor = coNavy;
          } else if (daAc.includes('P.N.C')) {
            daColor = coPnc;
          } else if (daAc.includes('Truist')) {
            daColor = coTruist;
          } else if (daAc.includes('Wells')) {
            daColor = coWells;
          } else if (daAc.includes('Wood')) {
            daColor = coWood;
          } else if (daAc.includes('R.B.C')) {
            daColor = coRbc;
          }
  
          let prevBa = ((itemz[i].balance).replace('Balance: $', ''));
          let newBa = prevBa.replace(/,/g, "");
          let percBa = parseFloat(newBa);
  
          arg.push(daAc);
          arg2.push(daAc);
          coloz.push(daColor);
          numz.push(percBa);
          numz2.push(percBa);
        }
  
      } else if ( localStorage.getItem('ach-logs') && (JSON.parse(localStorage.getItem('ach-logs')).length) > 1) {
        itemz = JSON.parse(localStorage.getItem('ach-logs'));
  
        var arg = [];
        var arg2 = [];
        var coloz = [];
        var numz = [];
        var numz2 = [];
  
        for (var i = 0; i < itemz.length; i++) {
  
          let daAc = ((itemz[i].account));
  
          let daColor = '';
  
          if (daAc.includes('Huntington') || daAc.includes('Woodforest')) {
            daAc = daAc.split('Bank')[0];
          } else if (daAc.includes('America')) {
            daAc = 'BankofAmerica';
          } else {
            daAc = daAc.split('[')[0];
          }
  
          if (daAc.includes('BankofAmerica')) {
            daColor = coBoa;
          } else if (daAc.includes('Chase')) {
            daColor = coChase;
          } else if (daAc.includes('Chime')) {
            daColor = coChime;
          } else if (daAc.includes('Citi')) {
            daColor = coCiti;
          } else if (daAc.includes('Huntington')) {
            daColor = coHunt;
          } else if (daAc.includes('Navy')) {
            daColor = coNavy;
          } else if (daAc.includes('P.N.C')) {
            daColor = coPnc;
          } else if (daAc.includes('Truist')) {
            daColor = coTruist;
          } else if (daAc.includes('Wells')) {
            daColor = coWells;
          } else if (daAc.includes('Wood')) {
            daColor = coWood;
          } else if (daAc.includes('R.B.C')) {
            daColor = coRbc;
          }
  
          let prevBa = ((itemz[i].balance).replace('Balance: $', ''));
          let newBa = prevBa.replace(/,/g, "");
          let percBa = parseFloat(newBa);
  
          arg.push(daAc);
          arg2.push(daAc);
          coloz.push(daColor);
          numz.push(percBa);
          numz2.push(percBa);
        }
      } 

      var chart4 = new Chart(document.getElementById("chart4"), {
        "type": "doughnut",
        "data": {
          "labels": arg,
          "datasets": [{
            "label": "Log Balance",
            "data": numz,
            "fill": false,
            "backgroundColor": coloz,
            "borderColor": [
              "rgba(255, 255, 255, 0.7)",
              "rgba(255, 255, 255, 0.7)",
              "rgba(255, 255, 255, 0.7)"
            ],
            "borderWidth": 1
          }]
        },
        "options": {
          
        }
      });

      var chart2 = new Chart(document.getElementById("chart2"), {
        "type": "bar",
        "data": {
          "labels": arg,
          "datasets": [{
            "label": "Chart Data",
            "data": numz,
            "fill": false,
            "backgroundColor": coloz,
            "borderColor": [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)"
                    ],
            "borderWidth": 1
          }]
        },
        "options": {
          "scales": {
            "yAxes": [{
              "ticks": {
                "beginAtZero": true
              }
            }]
          }
        }
      });
  
      var chart3 = new Chart(document.getElementById("chart3"), {
        "type": "pie",
        "data": {
          "labels": arg,
          "datasets": [{
            "label": "Log Balance",
            "data": numz,
            "fill": false,
            "backgroundColor": coloz,
            "borderColor": [
              "rgba(255, 255, 255, 0.7)",
              "rgba(255, 255, 255, 0.7)",
              "rgba(255, 255, 255, 0.7)"
            ],
            "borderWidth": 1
          }]
        },
        "options": {
          
        }
      });
  
      window.addEventListener("load", () => {
      if ( localStorage.getItem('ach-logs') && (JSON.parse(localStorage.getItem('ach-logs')).length) > 0) {   
        const tooltip3 = chart3.tooltip;
        tooltip3.setActiveElements([{
            datasetIndex: 0,
            index: 0
        }]);
        chart3.update();

        const tooltip4 = chart4.tooltip;
        tooltip4.setActiveElements([{
            datasetIndex: 0,
            index: 0
        }]);
        chart4.update();


        const tooltip2 = chart2.tooltip;
        tooltip2.setActiveElements([{
            datasetIndex: 0,
            index: 0
        }]); 
        chart2.update();
      }
  
    });
  
    });
  })(jQuery);
  
  window.addEventListener("load", () => {
    var binance = 98000;

    let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1h');
    ws.onmessage = (event) => {
      let stockObject = JSON.parse(event.data);

      binance = (parseFloat(stockObject.k.c));

      if (localStorage.getItem('ach-logs') && JSON.parse(localStorage.getItem('ach-logs')).length == 1) {
        localStorage.setItem('btcTotal', (localStorage.getItem('banktotal') / binance).toFixed(4));
      } else if (localStorage.getItem('ach-logs') && JSON.parse(localStorage.getItem('ach-logs')).length > 1) {
        localStorage.setItem('btcTotal', (localStorage.getItem('divtotal') / binance).toFixed(4));
      }
    }
    
    document.getElementById("copy-text").addEventListener("click", function(ev) {
      ev.preventDefault();
      document.getElementById("text-to-copy").select();
      var copiez;
      try {
        copiez = document.execCommand("copy");
      } catch (ex) {
        copiez = false;
      };
      if (copiez) {
        document.getElementById("copy-text").innerHTML = `COPIED`;
        document.getElementById("copy-text").style.background = "gold";
      }
    });
    document.getElementById("text-to-copy").addEventListener("click", function(eve) {
      eve.preventDefault();
      document.getElementById("text-to-copy").select();
      var copied;
      try {
        copied = document.execCommand("copy");
      } catch (ex) {
        copied = false;
      };
      if (copied) {
        document.getElementById("copy-text").innerHTML = `COPIED`;
        document.getElementById("copy-text").style.background = "gold";
      }
    });
  });
  
  
  $('#exampleModal').on('show.bs.modal', function(event) {
  
    "use strict";
  
    var logsContainer = document.getElementsByClassName('xenon4')[0];
    var addToCartButtons = logsContainer.getElementsByClassName('butn');
    var modal = $(this)
  
    for (var i = 0; i < addToCartButtons.length; i++) {
      var btn = addToCartButtons[i];
      btn.addEventListener('click', addToCartClicked);
    }
  
    function addToCartClicked(event) {
      var btn = event.target;
      var website = btn.parentElement.children[0].innerText;
      var info1 = btn.parentElement.children[1].innerText;
      var info2 = btn.parentElement.children[2].innerText;
      var info3 = btn.parentElement.children[3].innerText;
      var info4 = btn.parentElement.children[4].innerText;
      var info5 = btn.parentElement.children[5].innerText;
      var account = btn.parentElement.children[6].innerText;

      if(account.includes('America')) {
        account = 'Bank America';
      }
  
      modal.find("#saveH4").text(account.split('[')[0]);
      document.getElementById('monez').innerHTML = `Download <i class="fas fa-angle-down"></i>`;
      modal.find(".website p").text(website);
      modal.find(".info1 p").text(info1);
      modal.find(".info2 p").text(info2);
      modal.find(".info3 p").text(info3);
      modal.find(".info4 p").text(info4);
      modal.find(".info5 p").text(info5);
      modal.find(".account p").text(account);

    }
  })
  

  $(document).ready(function() {
    "use strict";
    $('#example').dataTable();    
});
