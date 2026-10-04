let messageCount = 1;


// Send message

function sendMessage() {

    let input =
        document.getElementById("userInput");

    let message =
        input.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    input.value = "";

    showTyping();

    setTimeout(function() {

        let reply =
            getBotResponse(message);

        hideTyping();

        addMessage(reply, "bot");

        speak(reply);

    }, 600);
}


// Enter key

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();
    }
}


// Quick buttons

function quickMessage(message) {

    document.getElementById("userInput").value =
        message;

    sendMessage();
}


// Add message

function addMessage(text, type) {

    let chatBox =
        document.getElementById("chatBox");

    let message =
        document.createElement("div");

    message.className =
        "message " +
        (type === "user"
            ? "user-message"
            : "bot-message");


    if (type === "bot") {

        message.innerHTML =

        `
        <div class="avatar">🤖</div>

        <div class="bubble">

            <strong>Student Assistant</strong>

            <p>${text}</p>

            <button onclick="copyResponse(this)"
                    style="border:none;background:none;cursor:pointer;">
                📋 Copy
            </button>

        </div>
        `;

    } else {

        message.innerHTML =

        `
        <div class="bubble">
            ${text}
        </div>
        `;
    }


    chatBox.appendChild(message);

    chatBox.scrollTop =
        chatBox.scrollHeight;


    messageCount++;

    document.getElementById(
        "messageCount"
    ).innerText =
        "Messages: " + messageCount;
}


// Bot response

function getBotResponse(message) {

    let text =
        message.toLowerCase();


    // Greetings

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hello! 👋 I'm ready to help you with your studies.";
    }


    // Study

    if (
        text.includes("study") ||
        text.includes("learn")
    ) {

        return "📚 Try this: study one topic at a time, understand the concept, practice an example, and then revise it.";
    }


    // Exam

    if (
        text.includes("exam") ||
        text.includes("test")
    ) {

        return "📝 For exams, first study important concepts, then practice previous questions and finally revise short notes.";
    }


    // Programming

    if (
        text.includes("coding") ||
        text.includes("programming")
    ) {

        return "💻 Start with programming basics, then practice small problems every day. Consistency is more useful than trying many topics at once.";
    }


    // Java

    if (text.includes("java")) {

        return "☕ For Java, learn variables, conditions, loops, methods, arrays, OOP, strings and collections. Then practice coding problems.";
    }


    // Python

    if (text.includes("python")) {

        return "🐍 Python is beginner-friendly. Start with variables, input, conditions, loops, functions, lists and dictionaries.";
    }


    // SQL

    if (text.includes("sql")) {

        return "🗄️ For SQL, learn SELECT, WHERE, ORDER BY, GROUP BY, JOIN, INSERT, UPDATE and DELETE. Practice queries regularly.";
    }


    // DBMS

    if (text.includes("dbms")) {

        return "🗃️ Important DBMS topics include keys, normalization, ER diagrams, SQL, transactions and indexing.";
    }


    // Study plan

    if (
        text.includes("plan") ||
        text.includes("schedule")
    ) {

        return "⏰ Simple study plan: 45 minutes concept learning → 30 minutes coding/practice → 15 minutes revision.";
    }


    // Motivation

    if (
        text.includes("motivat") ||
        text.includes("tired")
    ) {

        return "💪 Don't try to finish everything at once. Pick one small topic, complete it, and move to the next.";
    }


    // College

    if (text.includes("college")) {

        return "🎓 Balance college subjects with placement preparation. Keep some daily time for coding, aptitude and communication.";
    }


    // Help

    if (
        text.includes("help") ||
        text.includes("what can you do")
    ) {

        return "🤖 I can help with study tips, exams, Java, Python, SQL, DBMS, coding practice, study planning and motivation.";
    }


    // Bye

    if (
        text.includes("bye") ||
        text.includes("goodbye")
    ) {

        return "👋 Goodbye! Keep learning and all the best!";
    }


    return "🤔 I'm still learning. Try asking about exams, study, Java, Python, SQL, DBMS, coding or study plans.";
}


// Typing

function showTyping() {

    document.getElementById("typing")
        .style.display = "block";
}


function hideTyping() {

    document.getElementById("typing")
        .style.display = "none";
}


// Voice response

function speak(text) {

    if ("speechSynthesis" in window) {

        let speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 1;

        speech.pitch = 1;

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(
            speech
        );
    }
}


// Voice input

function startVoice() {

    if (!("webkitSpeechRecognition" in window)) {

        alert(
            "Voice input is not supported in this browser."
        );

        return;
    }


    let recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();


    recognition.onresult =
        function(event) {

            let text =
                event.results[0][0].transcript;

            document.getElementById(
                "userInput"
            ).value = text;

            sendMessage();
        };
}


// Copy response

function copyResponse(button) {

    let bubble =
        button.parentElement;

    let text =
        bubble.querySelector("p").innerText;

    navigator.clipboard.writeText(text);

    button.innerText =
        "✅ Copied!";
}


// Clear chat

function clearChat() {

    document.getElementById(
        "chatBox"
    ).innerHTML = "";

    messageCount = 0;

    document.getElementById(
        "messageCount"
    ).innerText = "Messages: 0";
}


// Dark mode

function toggleTheme() {

    document.body.classList.toggle("dark");

    let button =
        document.getElementById("themeBtn");

    if (
        document.body.classList.contains("dark")
    ) {

        button.innerText = "☀️";

    } else {

        button.innerText = "🌙";
    }
}
