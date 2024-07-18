const createChatFormHandler = async (event) => {
  event.preventDefault();

  const gameId = game.id;
  const chatroomName = document.querySelector("#chatroom-name").value.trim();

  if (gameId && chatroomName) {
    const response = await fetch("/api/chatrooms", {
      method: "POST",
      body: JSON.stringify({ gameId, chatroomName, chatroomPassword }),
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
