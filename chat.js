let messageInput = document.getElementById("message");
let sendButton = document.getElementById("send");
let chatDiv = document.getElementById("chat");


sendButton.addEventListener("click", sendClick);
messageInput.addEventListener("keydown", (e) => keyPressed(e));

function keyPressed(e) {
    if (e.key == "Enter") {
        sendClick();
    }
}

function sendClick() {
    sendMessage(3, 4, messageInput.value);  // от кого / кому / текст
}


async function sendMessage(hu, fro, text) {
    let url = "index.php";
    let messageData = new FormData();
    messageData.append("enter", true);
    messageData.append("hu", hu);
    messageData.append("fro", fro);
    messageData.append("text", text);
    let response = await fetch(url, {
        method: "POST",
        body: messageData,
    });
    let commits = await response;
    messageInput.value = "";
    getMessages();
}
async function getMessages() {
    let url = "index.php";
    let getData = new FormData();
    getData.append("getmessage", true);
    let response = await fetch(url, {
        method: "POST",
        body: getData,
    });
    let commits = await response.json();
    while (chatDiv.firstChild) {
        chatDiv.removeChild(chatDiv.lastChild);
    }
    let counter = 0;
    for (let key in commits) {
        counter++;
    }
    for (let i = 0; i < counter; i++) {
        chatDiv.appendChild(document.createElement("div")).innerHTML = "от: " + commits[i].fro + " к: " + commits[i].hu
        chatDiv.appendChild(document.createElement("div")).innerHTML = commits[i].text;
    }
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

getMessages(); //первоначальная загрузка

setInterval(getMessages, 3000); //обновление каждые 3 секунды