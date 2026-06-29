const screen = document.getElementById("screen");
const input = document.getElementById("input");

// 🔥 ASCII BANNER
const banner = `
███╗   ██╗██╗██████╗ ██████╗ 
████╗  ██║██║██╔══██╗██╔══██╗
██╔██╗ ██║██║██████╔╝██████╔╝
██║╚██╗██║██║██╔══██╗██╔══██╗
██║ ╚████║██║██║  ██║██║  ██║
╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

      NIRB TERMINAL v1.0
      C:\\AI SYSTEM ONLINE
`;

function print(text, cls = "bot") {
  const div = document.createElement("div");
  div.className = `line ${cls}`;
  div.innerText = text;
  screen.appendChild(div);
  screen.scrollTop = screen.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  print(`C:\\AI> ${text}`, "user");
  input.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    print(`SYSTEM> ${data.reply}`, "bot");

  } catch (err) {
    print(`ERROR> ${err.message}`, "bot");
  }
}

// ENTER key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

// boot sequence
print(banner, "bot");
print("Initializing AI engine...");
print("Loading modules...");
print("Type commands below.\n");
input.focus();