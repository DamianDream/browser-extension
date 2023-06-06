console.log('Inject JavaScript from myExtension'); // TEST

// Target element
const targetElement = document.querySelector("footer");

// Custom Styles
let style = document.createElement("style");
style.innerHTML = `
.chatContainer-myExtension {
    position: fixed;
    bottom: 50px;
    right: 50px;
}

.chatButton-myExtension {
    background-color: #dc8800;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    height: 70px;
    width: 70px;
    box-shadow: 0 2px 4px darkslategray;
    cursor: pointer;
    transition: all 0.2s ease;
}

.chatButton-myExtension:active {
    background-color: #dac825;
    box-shadow: 0 0 2px darkslategray;
    transform: translateY(2px);
}

.chatBox-myExtension {
    display: block;
    font-weight: normal;
    border-radius: 0 10px 0 10px;
    padding: .2em 1em;
    background-color: rgb(180, 180, 180);
    color: #000;
    transition: all 0.2s ease;

    position: absolute;
    top: -50px;
    left: -150px;
}

.hidden-myExtension {
    display: none;
}
  `;
document.head.appendChild(style);

// Chat container
const chatContainer = document.createElement("div");
chatContainer.classList.add("chatContainer-myExtension");
chatContainer.innerHTML = `
    <div class="chatBox-myExtension hidden-myExtension">
        <p>Lets chat with me...</p>
        <form action="#">
</form>
    </div>
`;

const creatMyButton = document.createElement("button");
creatMyButton.classList.add("chatButton-myExtension");
creatMyButton.textContent = "Chat";
creatMyButton.addEventListener("click", (e) => {
    e.target.previousElementSibling.classList.toggle("hidden-myExtension");
});

chatContainer?.appendChild(creatMyButton);
targetElement?.appendChild(chatContainer);


