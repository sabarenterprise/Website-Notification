
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// TANGGAL BERITA
function updateDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    document.getElementById("currentDate").textContent =
        `${day}-${month}-${year}`;
}

updateDate();

// TAMBAH BERITA BARU
document.getElementById("addNewsForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const titleInput = document.getElementById("newsTitle");
        const descriptionInput =
            document.getElementById("newsDescription");

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!title || !description) {
            showToast("Please complete both news fields.");
            return;
        }

        const article = document.createElement("article");
        article.className = "news-item";

        const heading = document.createElement("h3");
        heading.textContent = title;

        const paragraph = document.createElement("p");
        paragraph.textContent = description;

        article.append(heading, paragraph);

        const newsList = document.getElementById("newsList");
        newsList.prepend(article);

        // Arahkan daftar ke berita yang baru ditambahkan.
        document.querySelector(".news-container").scrollTop = 0;

        this.reset();

        showToast("Your news has been added successfully!");

        // Notifikasi browser jika pengguna sudah mengizinkan.
        if (
            "Notification" in window &&
            Notification.permission === "granted"
        ) {
            new Notification("Brightchamps News", {
                body: `New article: ${title}`
            });
        }
    }
);

// LANGGANAN NEWSLETTER
document.getElementById("subscribeForm").addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("emailInput");
        const email = emailInput.value.trim();

        if (!emailInput.checkValidity() || !email) {
            emailInput.reportValidity();
            return;
        }

        document.getElementById("subscribeMessage").textContent =
            "Thank you for subscribing!";

        showToast("Subscription successful in this demo.");

        emailInput.value = "";

        // Minta izin browser hanya setelah pengguna berinteraksi.
        if ("Notification" in window) {
            if (Notification.permission === "default") {
                try {
                    await Notification.requestPermission();
                } catch (error) {
                    console.warn(
                        "Unable to request notification permission.",
                        error
                    );
                }
            }
        }
    }
);

