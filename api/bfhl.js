export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ is_success: false, message: "Only POST allowed" });
  }

  const FULL_NAME = "john_doe";
  const DOB = "17091999";
  const EMAIL = "john@xyz.com";
  const ROLL_NUMBER = "ABCD123";

  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    const even = [];
    const odd = [];
    const alphabets = [];
    const special = [];
    let sum = 0;
    let alphaStr = "";

    data.forEach((val) => {
      if (/^\d+$/.test(val)) {
        const num = parseInt(val);
        if (num % 2 === 0) even.push(val);
        else odd.push(val);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(val)) {
        alphabets.push(val.toUpperCase());
        alphaStr += val;
      } else {
        special.push(val);
      }
    });

    const reversed = alphaStr.split("").reverse();
    const concat_string = reversed.map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()).join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: special,
      sum: sum.toString(),
      concat_string: concat_string
    });

  } catch (err) {
    res.status(400).json({ is_success: false, message: err.message });
  }
}
