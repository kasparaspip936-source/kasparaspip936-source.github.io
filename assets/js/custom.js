

function checkAnswer() {

    const name = document.getElementById("UserName").value.trim();
    const nameS = document.getElementById("UserNameS").value.trim();
    const email = document.getElementById("UserEmail").value.trim();
    const telnr = document.getElementById("UserTelNr").value.trim();
    const adr = document.getElementById("UserAdr").value.trim();

    if (!name || !email || !nameS || !telnr || !adr) {
        alert("Trūksta duomenų");
        return;
    }

    const correctAnswers = {
        q1: ["Rotorius", "Statorius"],
        q2: ["Gelžbetonis", "Plienas"],
        q3: ["Kondensatorius", "Akumuliatorius"]
    };

    let totalScore = 0;

    for (let question in correctAnswers) {

        const selected = Array.from(
            document.querySelectorAll(
                `input[name="${question}"]:checked`
            )
        ).map(input => input.value);

        const correct = correctAnswers[question];

        // Tikriname, ar pasirinkti tiksliai abu teisingi atsakymai
        const isCorrect =
            selected.length === 2 &&
            correct.every(answer => selected.includes(answer));

        if (isCorrect) {
            totalScore += 10;
        } else if (
            selected.length === 1 &&
            correct.includes(selected[0])
        ) {
            totalScore += 5;
        }
    }

    document.getElementById("finalScore").textContent =
        "Tavo rezultatas: " + totalScore + " / 30 taškų!";
}

