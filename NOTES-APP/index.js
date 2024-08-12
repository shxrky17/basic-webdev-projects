const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.className = "delete-btn"; // Adding a class for easier targeting

    // Append the image to the inputBox
    inputBox.appendChild(img);

    // Append the inputBox (with image) to the notesContainer
    notesContainer.appendChild(inputBox);
});

function updatestorage(){
    localStorage.setItem("notes",notesContainer.innerHTML);
}
notesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const note = e.target.parentElement;
        note.remove();
        updatestorage();
    }
});