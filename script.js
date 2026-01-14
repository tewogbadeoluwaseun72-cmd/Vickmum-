const generateBtn = document.getElementById("generateBtn");
const resultBox = document.getElementById("result");

generateBtn.addEventListener("click", async () => {
  const topic = document.getElementById("topic").value;
  const style = document.getElementById("style").value;
  const number = document.getElementById("number").value;

  if (!topic || !style || !number) {
    alert("Please fill all fields");
    return;
  }

  // Show loading text
  resultBox.textContent = "Vickmum is thinking...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, style, number }),
    });

    const data = await response.json();

    // Show AI result
    resultBox.textContent = data.result;
  } catch (error) {
    console.error(error);
    resultBox.textContent = "Something went wrong. Try again.";
  }
});
