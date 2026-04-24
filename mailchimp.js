require("dotenv").config();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const crypto = require("crypto");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

function getSubscriberHash(email) {
  return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
}

async function addOrUpdateContact(data, tags = []) {
  const subscriberHash = getSubscriberHash(data.email);

  try {
    await mailchimp.lists.setListMember(AUDIENCE_ID, subscriberHash, {
      email_address: data.email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: data.first_name || "",
        LNAME: data.last_name || "",
        PHONE: data.phone || "",
      },
    });

    if (tags.length > 0) {
      await mailchimp.lists.updateListMemberTags(AUDIENCE_ID, subscriberHash, {
        tags: tags.map(tag => ({ name: tag, status: "active" })),
      });
    }

    return true;
  } catch (error) {
    console.error("Mailchimp error:", error.response?.body || error.message);
    throw error;
  }
}

module.exports = { addOrUpdateContact };
