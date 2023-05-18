async function textToHash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function main() {
  const convert = document.getElementById("convert");
  const reset = document.getElementById("reset");
  const source = document.getElementById("source");
  const target = document.getElementById("target");

  reset.onclick = function () {
    source.value = "";
    target.value = "";
  };

  convert.onclick = async function () {
    const sourceValue = source.value;
    const sourceValueLines = sourceValue.split("\n");
    const targetValueLines = [];

    for (const line of sourceValueLines) {
      const trimmedLine = line.trim();

      if (trimmedLine.length === 0) {
        return "";
      }

      const hashHex = await textToHash(trimmedLine);

      targetValueLines.push(hashHex);
    }

    target.value = targetValueLines.join("\n");
  };
}

main();
