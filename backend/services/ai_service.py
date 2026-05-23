import requests


def generate_ai_explanation(rule, status):

    prompt = f"""
    You are a cybersecurity compliance AI assistant.

    Compliance Rule: {rule}
    Status: {status}

    Explain:
    1. Security risk
    2. Recommended remediation

    Respond STRICTLY in this format:

    RISK:
    <risk explanation>

    RECOMMENDATION:
    <recommendation>
    """

    try:

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            }
        )

        data = response.json()

        print(data)

        ai_text = data.get("response", "")

        if not ai_text:

            return {
                "risk": "No AI response generated.",
                "recommendation": "Try again."
            }

        risk = ""
        recommendation = ""

        if "RECOMMENDATION:" in ai_text:

            parts = ai_text.split("RECOMMENDATION:")

            risk = parts[0].replace(
                "RISK:",
                ""
            ).strip()

            recommendation = parts[1].strip()

        else:

            risk = ai_text
            recommendation = "No recommendation generated."

        return {
            "risk": risk,
            "recommendation": recommendation
        }

    except Exception as e:

        return {
            "risk": "AI generation failed.",
            "recommendation": str(e)
        }