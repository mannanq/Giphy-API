$(document).ready(function() {
  var topics = ['animals', 'cars', 'idiots'];

  //create buttons for the topics
  function renderButtons() {
    $('.buttonsArea').empty();
    for (var i = 0; i < topics.length; i++) {
      var button = $('<button>');
      button.addClass('btn btn-lg btn-success mr-5');
      button.attr('data', topics[i]);
      button.text(topics[i]);
      // add the button to the div
      $('.buttonsArea').append(button);
    }
  }

  // AJAX here:

  $(document).on('click', 'button', function() {
    // grab button value/data

    var limit = 10;
    var query = $(this).attr('data');
    //console.log(query);
    var queryUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=sFczHngYxgmn6THxiFxoHH8zqv0DciRP&limit=${limit}`;

    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function(response) {
      // console.log(resposne);
      var result = response.data;
      console.log(result);

      for (var j = 0; j < result.length; j++) {
        var gif = $('<div class="gifs">');
        var p = $('<p>');
        p.text('Rating: ' + result[j].rating);
        var gifImage = $('<img>');
        gifImage.attr('src', result[j].images.fixed_height_still.url);
        gifImage.attr('data-still', result[j].images.fixed_height_still.url);
        gifImage.attr('data-animate', result[j].images.fixed_height.url);
        gifImage.attr('data-state', 'still');
        gifImage.addClass('gif');
        gif.append(gifImage);
        gif.append(p);

        $('.gifArea').prepend(gif);
      }
    });
  });

  //  play/pause effect:
  $(document).on('click', '.gif', function() {
    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else if (state === 'animate') {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });

  $('#add-topic').on('click', function() {
    event.preventDefault();

    var giffy = $('#topic-input')
      .val()
      .trim();

    //prevent empty buttons from being created
    if (giffy === '') {
      return;
    } else {
      topics.push(giffy);
    }

    $('#topic-input').val('');

    renderButtons();
  });

  renderButtons();
});
