export async function translate(stringToTranslate: string) {
  if (true) {
    return {
      fr: stringToTranslate,
      en: "",
      es: "",
      ar: "",
      de: "",
      it: "",
      pt: "",
      ru: "",
    };
  }

  const result = await fetch("/api/gpt-prompt", {
    method: "POST",
    body: JSON.stringify({ prompt: JSON.stringify({ fr: stringToTranslate }) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await result.json();

  return JSON.parse(json.response);
}
