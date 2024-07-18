const createChatFormHandler = async (event) => {
  event.preventDefault();

  const gameId = document.querySelector("").value.trim();
  const chatroomName = document.querySelector("").value.trim();
  const chatroomPassword = document.querySelector("").value.trim();

  if () {
    const response = await fetch("/api/users", {
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
