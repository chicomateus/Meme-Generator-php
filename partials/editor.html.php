<form class="m-editor" id="meme-editor-view">
  <h4>Imagem</h4><hr>
 <h4>Aspect Ratio  /u2981/</h4>
    <select class="aspect-ratio" id="aspect-ratio">
    <option value="" disabled="">Select aspect ratio</option>
    <option value="twitter">2:1 (Twitter)</option> <!-- [W:1024px | H:512px] -->
    <option value="instagram">1:1 (Twitter or Instagram)</option> <!-- [W:1080px | H:1080px] -->
    <option value="facebook">Facebook</option> <!-- [W:1200px | H:630px] -->
    <option value="pinterest">Pinterest </option> <!-- [W:736px | H:1128px] -->
    </select>

  <div class="dropzone" id="dropzone">Drop Image Here</div>
  
  <h2><label for="image-scale">Resize image</label></h2>
  <input id="image-scale" type="range" max="4" min=".01" step=".01" value="1">
  
  <h2><label for="headline">Headline</label></h2>
  <textarea id="headline" name="headline" type="text" value=""></textarea>
  <hr>


  <!-- <select class="font-size" id="font-size">
    <option value="" disabled>Select a font size</option>
  </select> -->
  <h4>Typography</h4>
  <hr>

  <h5>Alinhamento</h5>
    <select class="text-align" id="text-align">
      <option value="" disabled>Select alignment</option>
    </select>

  <h5>Font Family</h5>
   <select class="font-family" id="font-family">
    <option value="" disabled>Select a font</option>
  </select>

  <h5>Font Size</h5>
  <input id="font-size" type="range" max="64" min="18" step=".1" value="30">
  <h5>Letter Spacing</h5>
    <input id="letter-spacing" type="range" max="4" min="0" step="1" value="0">

  <div class="checkbox-group text-shadow">
    <input id="text-shadow" name="shadow" type="checkbox"> 
    <label for="text-shadow">Text Shadow</label>
  </div>
  <hr>

  <h5>Watermark</h5>
  <select class="watermark" id="watermark">
    <option value="" disabled>Select a watermark</option>
  </select>

  <h2><label for="credit">Credit</label></h2>
  <input id="credit" name="credit" type="text" value="">

  <div class="m-editor__overlay" id="overlay">
    <h2>Overlay Color</h2>
    <ul class="checkbox-group">
      <li><label><input type="radio" name="overlay" value=""> None</label></li>
    </ul>
  </div>
</form>
