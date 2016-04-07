<!doctype html>
<html>
  <head>
    <?php include './partials/head.html.php'; ?>
  </head>
  <body class="<%= page_classes %>">
    <div class="m-meme">
      <h1>Meme Generator</h1>
     <?php include "./partials/editor.html.php" ;?>
      <?php  include "./partials/canvas.html.php"; ?>
    </div>
    
     <?php  include "./partials/javascripts.php"; ?>


  </body>
</html>
