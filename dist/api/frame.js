export default function handler(req, res) {
  res.status(200).json({
    image: "https://joker4funchallenges.com/image/Joker_logo.png",
    post_url: "https://joker4funchallenges.com/action",
    buttons: [{ label: "Play" }]
  });
}