

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

    const participant = {
        name: name,
        nameS: nameS,
        email: email,
        telnr: telnr,
        adr: adr,
        score: totalScore,
        date: new Date().toLocaleString()
    };

    let participants = JSON.parse(
        localStorage.getItem("participants") || "[]"
    );

    participants.push(participant);

    localStorage.setItem(
        "participants",
        JSON.stringify(participants)
    );

    document.getElementById("finalScore").textContent =
        name + ", tavo rezultatas: " + totalScore + " / 30 taškų!";

    console.log("Išsaugoti dalyviai:", participants);
}

const skills = [
    {
        pavadinimas: "AutoCAD projektavimas",
        busena: "Atlikta",
        taskai: 120
    },
    {
        pavadinimas: "Python programavimas",
        busena: "Atlikta",
        taskai: 112
    },
    {
        pavadinimas: "Elektros darbai",
        busena: "Mokomasi",
        taskai: 93
    },
    {
        pavadinimas: "MATLAB",
        busena: "Mokomasi",
        taskai: 65
    },
    {
        pavadinimas: "PCB projektavimas",
        busena: "Planuojama",
        taskai: 23
    },
    {
        pavadinimas: "Puslapių kūrimas",
        busena: "Planuojama",
        taskai: 35
    }
];

const grupes = ["Atlikta", "Mokomasi", "Planuojama"];
const container = document.getElementById("skills-container");

grupes.forEach(busena => {

    const grupesSkills = skills.filter(
        skill => skill.busena === busena
    );

    const grupe = document.createElement("div");
    grupe.classList.add("skill-group");

    grupe.innerHTML = `
        <h2>${busena}</h2>
        <div class="skills-grid"></div>
    `;

    const grid = grupe.querySelector(".skills-grid");

    grupesSkills.forEach(skill => {

        const card = document.createElement("div");
        card.classList.add("skill-card");

        card.innerHTML = `
            <h3>${skill.pavadinimas}</h3>
            <p>Būsena: ${skill.busena}</p>
            <p>Taškai: ${skill.taskai}</p>

            <div class="progress-bar">
                <div class="progress"
                     style="width: ${Math.min(skill.taskai / 120 * 100, 100)}%">
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    container.appendChild(grupe);
});
