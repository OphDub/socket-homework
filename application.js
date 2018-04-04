$(() => {
  const socket = io();

  $('.set-username-btn').on('click', () => setUserName());

  const setUserName = () => {
    const username = window.prompt('Please enter your username', 'e.g. Big O');

    console.log(username);
  };

  $('form').submit(() => {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', (msg) => {
    $('#messages').append($('<li>').text(msg));
  });
});