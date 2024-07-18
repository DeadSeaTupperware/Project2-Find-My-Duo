const createChatFormHandler = async (event) => {
  event.preventDefault();

  const chatroom_name = document.querySelector("#chatroom-name").value.trim();

  // Get the current URL
  const currentUrl = window.location.href;

  // Extract the part of the URL after the last '/'
  const parts = currentUrl.split("/");
  const lastPart = parts[parts.length - 1];

  // Convert the extracted string to a number
  const game_id = parseInt(lastPart);

  // Access the user's ID from the HTML template
  const user_id = document.querySelector("#user-id").value;

  const chatroom_participant = [user_id];

  if (chatroom_name && game_id && chatroom_participant) {
    const response = await fetch("/api/chatrooms", {
      method: "POST",
      body: JSON.stringify({ chatroom_name, game_id, chatroom_participant }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/api/games/${game_id}`);
    } else {
      alert(response.statusText);
      console.log(response.status);
      console.log(user_id);
      return user_id;
    }
  }
};

document
  .querySelector(".create-chat-form")
  .addEventListener("submit", createChatFormHandler);
