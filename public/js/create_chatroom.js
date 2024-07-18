const createChatFormHandler = async (event) => {
  event.preventDefault();

  const gameId = document.querySelector("").value.trim();
  const chatroomName = document.querySelector("#chatroom-name").value.trim();
  const chatroomPassword = document.querySelector("#chatroom-password").value.trim();

  if () {
    const response = await fetch("", {
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
