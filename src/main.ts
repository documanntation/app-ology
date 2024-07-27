import { fetchData } from "./libs/fetch";
import { IForgive } from "./types/entity";
interface IForgiveResult {
  data: IForgive[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/hsOtkZ5TInBS";
// Show/read apology message
async function showForgives() {
  const forgives = await fetchData<IForgiveResult>(API_URL);

  if (!forgives) {
    console.log("Error fetching your apologies");
    return;
  }
  forgives.data.map((forgive) => {
    const newForgive = document.createElement("div");
    const newForgiveTitle = document.createElement("h2");
    const newForgiveContent = document.createElement("p");

    newForgiveTitle.textContent = forgive.forwho;
    newForgiveContent.textContent = forgive.content;

    newForgive.append(newForgiveTitle, newForgiveContent);
    document.body.append(newForgive);
  });
}

showForgives();

// Create new apology message

const forwhoInput = document.getElementById("forwho") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLTextAreaElement;
const sendBtn = document.getElementById("sendBtn");

sendBtn?.addEventListener("click", async () => {
  const forwho = forwhoInput.value;
  const content = contentInput.value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ forwho, content }]),
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete forgive messages

// Update forgive messages
