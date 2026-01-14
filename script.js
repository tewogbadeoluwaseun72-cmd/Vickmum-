const generateBtn = document.getElementById("generateBtn");
const resultBox = document.getElementById("result");

generateBtn.addEventListener("click", async () => {
  const topic = document.getElementById("topic").value;
  const style = document.getElementById("style").value;
  const number = document.getElementById("number").value;

  if (!topic || !style || !number) {
    alert("Fill all fields");
    return;
  }

  resultBox.innerHTML = "Generating... ⏳";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic, style, number })
    });

    const data = await response.json();

    // THIS IS THE IMPORTANT LINE
    resultBox.innerHTML = data.result.replace(/\n/g, "<br>");

  } catch (error) {
    resultBox.innerHTML = "Something went wrong 😢";
  }
});
