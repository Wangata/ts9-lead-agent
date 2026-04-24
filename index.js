require("dotenv").config();
const express = require("express");

const { calculateEstimate, getSizeTag } = require("./pricing");
const { addOrUpdateContact } = require("./mailchimp");

const app = express();
app.use(express.json());

app.post("/lead", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      project_size,
      project_type,
      location,
      mep_needed,
      start_date,
    } = req.body;

    if (!email || !project_size) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const estimate = calculateEstimate(project_size);
    const sizeTag = getSizeTag(project_size);

    const tags = [
      "TS9 Lead",
      "Meta Lead",
      sizeTag,
      project_type || "",
      mep_needed === "Yes" ? "MEP Lead" : "",
    ].filter(Boolean);

    await addOrUpdateContact(
      { first_name, last_name, email, phone },
      tags
    );

    return res.json({
      message: "Lead processed successfully",
      estimate,
      tags,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
