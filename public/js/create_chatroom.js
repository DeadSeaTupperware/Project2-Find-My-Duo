const createChatFormHandler = async (event) => {
  event.preventDefault();

  const chatroom_name = document.querySelector("#chatroom-name").value.trim();
  const game_id = 1;
  const chatroom_participant = [1];

  if (chatroom_name && game_id && chatroom_participant) {
    const response = await fetch("/api/chatrooms", {
      method: "POST",
      body: JSON.stringify({ chatroom_name, game_id, chatroom_participant }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
      console.log(response.status);
    }
  }
};

document
  .querySelector(".create-chat-form")
  .addEventListener("submit", createChatFormHandler);
