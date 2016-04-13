/*
* MemeCanvasView
* Manages the creation, rendering, and download of the Meme image.
*/
MEME.MemeCanvasView = Backbone.View.extend({

  initialize: function() {
    var canvas = document.createElement('canvas');
    var $container = MEME.$('#meme-canvas');

    // Display canvas, if enabled:
    if (canvas && canvas.getContext) {
      $container.html(canvas);
      this.canvas = canvas;
      this.setDownload();
      this.render();
    } else {
      $container.html(this.$('noscript').html());
    }

    // Listen to model for changes, and re-render in response:
    this.listenTo(this.model, 'change', this.render);
  },

  setDownload: function() {
    var a = document.createElement('a');
    if (typeof a.download == 'undefined') {
      this.$el.append('<p class="m-canvas__download-note">Right-click button and select "Download Linked File..." to save image.</p>');
    }
  },

  render: function() {
    // Return early if there is no valid canvas to render:
    if (!this.canvas) return;

    // Collect model data:
    var m = this.model;
    var d = this.model.toJSON();

    //console.log(d);

    var ctx = this.canvas.getContext('2d');
    var padding = Math.round(d.width * d.paddingRatio);

    
    switch (d.aspectRatio) {
          case "twitter":
              d.width = 1024, d.height = 512;
              break;
          case "facebook":
              d.width = 1200, d.height = 630;
              break;
          case "instagram":
              d.width = 1080, d.height = 1080;
              break;
          case "pinterest":
              d.width = 736, d.height = 1128
      }

      // Reset canvas display:
    this.canvas.width = d.width;
    this.canvas.height = d.height;
    ctx.clearRect(0, 0, d.width, d.height);
               
    function renderBackground(ctx) {
      // Base height and width:
      var bh = m.background.height;
      var bw = m.background.width;

      if (bh && bw) {
        // Transformed height and width:
        // Set the base position if null
        var th = bh * d.imageScale;
        var tw = bw * d.imageScale;
        var cx = d.backgroundPosition.x || d.width / 2;
        var cy = d.backgroundPosition.y || d.height / 2;

        ctx.drawImage(m.background, 0, 0, bw, bh, cx-(tw/2), cy-(th/2), tw, th);
      }
    }

    function renderOverlay(ctx) {
      if (d.overlayColor) {
        ctx.save();
        ctx.globalAlpha = d.overlayAlpha;
        ctx.fillStyle = d.overlayColor;
        ctx.fillRect(0, 0, d.width, d.height);
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    function renderHeadline(ctx) {
      var maxWidth = Math.round(d.width * 0.75);
      var x = padding;
      var y = padding;
      

      ctx.font = d.fontSize +'pt '+ d.fontFamily;
      ctx.fillStyle = d.fontColor;
      ctx.textBaseline = 'bottom';

      // Text shadow:
      if (d.textShadow) {
        ctx.shadowColor = "#666";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 10;
      }

      // Text alignment:
      if (d.textAlign == 'center') {
        ctx.textAlign = 'center';
        x = d.width / 2;
        y = d.height - d.height / 1.5;
        maxWidth = d.width - d.width / 3;

      } else if (d.textAlign == 'right' ) {
        ctx.textAlign = 'right';
        x = d.width - padding;

      }else if (d.textAlign == 'left' ){
        ctx.textAlign = 'left';
      }
     // console.log(d.headlineText);
      var words = d.headlineText.split(' ');
      var line  = '';

      // //----------
       var o = d.headlineText,
            u = o.match(/\*[^\*_]+\*|_[^\*_]+_|\*_[^\*_]+_\*|_\*[^\*_]+\*_/g),
            h = [],
            f = {};
  /*
           "DINNextLTPro-BoldCondensed" == l.fontFamily || "Harriet display" == l.fontFamily ? l.fontStyle = "bold italic" : "Gotham SSm A, Gotham SSm B" == l.fontFamily && (l.fontStyle = ""), t.font = (l.fontStyle ? l.fontStyle + " " : "") + l.fontSize + "pt " + l.fontFamily, t.fillStyle = l.fontColor, t.textBaseline = "top", l.textShadow && (t.shadowColor = "#666", t.shadowOffsetX = -2, t.shadowOffsetY = 1, t.shadowBlur = 10);
                var r = 0;
                "left-right" == l.alternateLayout && (r = l.width / 2 - 2 * c), "center" == l.textAlign ? (t.textAlign = "center", n = l.width / 2, e = l.width - l.width / 3) : "right" == l.textAlign ? (t.textAlign = "right", n = l.width - c, e -= r) : (t.textAlign = "left", e -= r);
                var a = parseInt(l.paddingScale);
                "Align top" == l.textAlignVertical ? i = c + a : "Align middle" == l.textAlignVertical ? i = l.height - l.height / 1.5 : (t.textBaseline = "Align bottom", i = l.height - 3 * c - a), l.headUppercase && (l.headlineText = l.headlineText.toUpperCase());
                

*/

                   
           // u && (_.each(u, function(ctx) {
           //          var t = ctx;
           //          var e = t;
           //          t.match(/\*_[^\*_]+_\*|_\*[^\*_]+\*_/g) ? (e = e.replace("_*", "%"), e = e.replace("*_", "%"), e = e.split(" ").join("% %"), h.unshift(t)) : (e = t.match(/\*[^\*_]+\*/g) ? t.split(" ").join("* *") : t.split(" ").join("_ _"), h.push(t));
           //          var n = "\u2981" + e + "\u2981";
           //          f[t] = n
           //          console.log(n);
           //      }), _.each(h, function(t) {
           //          o = o.replace(t, f[t])
           //      }), s = o.split(/\s/));
           //      for (var z = d.headlineText.split(" "), p = "", g = "", v = "\u200a", m = "\u2009", y = "\u205f", w = "\u2002", x = [g, v, m, y, w], b = [], k = 0; k < z.length; k++) {
           //          for (var C = 0; C < z[k].length; C++) b.push(z[k][C]), b.push(x[d.letterSpacing]);
           //          b.push("&nbsp;")
           //      }
           //      for (var S = "", T = [], A = [], $ = 0; $ < b.length; $++) "&nbsp;" == b[$] ? (T.push(S), T.push(" "), S = "") : S += b[$];
           //      if (z = T, "undefined" != typeof s) {
           //          z = s;
           //          for (var E = 0; E < z.length; E++) A.push(" ");
           //          z = _.flatten(_.zip(z, A)), z = _.flatten(_.map(z, function(ctx) {
           //              return ctx.split(/\u2981/)
           //          }))
           //      }
            


      //----------
      for (var n = 0; n < words.length; n++) {
        var testLine  = line + words[n] + ' ';
        var metrics   = ctx.measureText( testLine );
        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += Math.round(d.fontSize * 1.5);
        } else {
          line = testLine;
        }
      }

 
      ctx.fillText(line, x, y);
      ctx.shadowColor = 'transparent';
    }

    function renderCredit(ctx) {
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'left';
      ctx.fillStyle = d.fontColor;
      ctx.font = 'normal '+ d.creditSize +'pt '+ d.fontFamily;
      ctx.fillText(d.creditText, padding, d.height - padding);
    }

    function renderWatermark(ctx) {
      // Base & transformed height and width:
      var bw, bh, tw, th;
      bh = th = m.watermark.height;
      bw = tw = m.watermark.width;

      if (bh && bw) {
        // Calculate watermark maximum width:
        var mw = d.width * d.watermarkMaxWidthRatio;

        // Constrain transformed height based on maximum allowed width:
        if (mw < bw) {
          th = bh * (mw / bw);
          tw = mw;
        }

        ctx.globalAlpha = d.watermarkAlpha;
        ctx.drawImage(m.watermark, 0, 0, bw, bh, d.width-padding-tw, d.height-padding-th, tw, th);
        ctx.globalAlpha = 1;
      }
    }

    renderBackground(ctx);
    renderOverlay(ctx);
    renderHeadline(ctx);
    renderCredit(ctx);
    renderWatermark(ctx);

    var data = this.canvas.toDataURL(); //.replace('image/png', 'image/octet-stream');
    this.$('#meme-download').attr({
      'href': data,
      'download': (d.downloadName || 'share') + '.png'
    });

    // Enable drag cursor while canvas has artwork:
    this.canvas.style.cursor = this.model.background.width ? 'move' : 'default';
  },
  events: {
    'mousedown canvas': 'onDrag'
  },

  // Performs drag-and-drop on the background image placement:
  onDrag: function(evt) {
    evt.preventDefault();

    // Return early if there is no background image:
    if (!this.model.hasBackground()) return;

    // Configure drag settings:
    var model = this.model;
    var d = model.toJSON();
    var iw = model.background.width * d.imageScale / 2;
    var ih = model.background.height * d.imageScale / 2;
    var origin = {x: evt.clientX, y: evt.clientY};
    var start = d.backgroundPosition;
    start.x = start.x || d.width / 2;
    start.y = start.y || d.height / 2;

    // Create update function with draggable constraints:
    function update(evt) {
      evt.preventDefault();
      model.set('backgroundPosition', {
        x: Math.max(d.width-iw, Math.min(start.x - (origin.x - evt.clientX), iw)),
        y: Math.max(d.height-ih, Math.min(start.y - (origin.y - evt.clientY), ih))
      });
    }

    // Perform drag sequence:
    var $doc = MEME.$(document)
      .on('mousemove.drag', update)
      .on('mouseup.drag', function(evt) {
        $doc.off('mouseup.drag mousemove.drag');
        update(evt);
      });
  }
});
