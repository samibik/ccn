$(document).ready(function() {
  var $art = $(".art");
  var $blocks = $(".block");
  var $lis = $(".block li");
  var $control = $(".control");
  var $inputs = $(".control input");
  var $image = $(".image");
  var $save = $(".trigger-save");
  var $reset = $(".trigger-reset");
  var $output = $("output");

  $control.on("keyup", ".text-data", updateText)
    .on("blur", ".image-data", updateImage);

  $blocks.on("click", function() {
    highlight($(".text-data"));
  });

  $image.on("click", function() {
    highlight($(".image-data"));
  });

  $save.on("click", saveImage);
  $reset.on("click", reset);
  
  function reset() {
    $inputs.val("");
    updateText();
    updateImage();
  }
  
  function updateText(){
    var val = $(this).val();
    if (val == "") {
      val = "عذرا لم تظف النص";
    }
    val = val.split(" ").join("&nbsp;&nbsp;");
    $lis.html(val);
  }
  
  function updateImage() {
    var val = $(this).val();
    if (val == "") {
      val = "";
    }
  
    getDataUri('http://crossorigin.me/' + val, function(dataUri) {
      $image.attr("style", "background-image: url(" + dataUri + ");")
    });
  }
  
  function saveImage() {
    html2canvas($art).then(function(canvas) {
      $output.append(canvas);
       var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL();
        a.download = 'arabic.jpg';
        a.click();
    });
  }

  function highlight($el) {
    $control.addClass("highlight");
    $el.focus();
    setTimeout(function() {
      $control.removeClass("highlight");
    }, 500)
  }

  function getDataUri(url, callback) {
    var image = new Image();
    image.crossOrigin="anonymous"
    image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext('2d').drawImage(this, 0, 0);
      callback(canvas.toDataURL('image/png'));
    };
    image.src = url;
  }
  
  reset();
});

