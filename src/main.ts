import { fetchData } from "./libs/fetch";
import { IApologize } from "./types/entity";
interface IApologizeResult {
  data: IApologize[];
}

const API_URL = "https://v1.appbackend.io/v1/rows/RlhZeYuGWgVi";
// Show/read apology message
async function showApologies() {
  const apologies = await fetchData<IApologizeResult>(API_URL);

  if (!apologies) {
    console.log("Error fetching your apologies");
    return;
  }

  const resultContainer = document.getElementById("result");

  apologies.data.forEach((apology) => {
    const newApology = document.createElement("div");
    newApology.classList.add("result-box");

    const newApologyTitle = document.createElement("h2");
    const newApologyContent = document.createElement("p");
    const newApologyId = document.createElement("p");

    newApologyTitle.textContent = `For: ${apology.forwho}`;
    newApologyContent.textContent = apology.content;
    newApologyId.textContent = `ID: ${apology._id}`;

    newApology.append(newApologyTitle, newApologyContent, newApologyId);
    resultContainer?.append(newApology);
  });
}

showApologies();

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

// Delete apology messages
const deleteBtn = document.getElementById("deleteBtn");
const idInput = document.getElementById("_id") as HTMLInputElement;

deleteBtn?.addEventListener("click", async () => {
  const idsToDelete = idInput.value.split(",").map((id) => id.trim());
  await deleteApologies(idsToDelete);
});

async function deleteApologies(ids: string[]): Promise<void> {
  try {
    const apologies = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    });

    if (!apologies) {
      console.log("Error deleting your apologies.");
      return;
    }

    const result = await apologies.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
