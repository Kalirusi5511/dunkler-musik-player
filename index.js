const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.MY_TOKEN; // <-- hier

const REPO_OWNER = "DEIN_GITHUB_USER";
const REPO_NAME = "DEIN_REPO";

app.post("/create-issue", async (req, res) => {
  const { title, body } = req.body;

  try {
    const response = await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
      { title, body },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "User-Agent": "Render-Issue-Creator"
        }
      }
    );

    res.json({ message: "Issue erstellt ✅", url: response.data.html_url });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen", error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server läuft");
});
