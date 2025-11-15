const inputValue = document.getElementById("color")
const bodyContainer = document.getElementById("body-container")
const mode = document.getElementById("mode")
const form = document.getElementById("form")


function render() {
    const hex = inputValue.value.replace("#", "")
    const colorMode = mode.value
    
    bodyContainer.innerHTML = "<p>Loading colors...</p>"
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorMode}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch colors")
            return response.json()
        })
        .then(data => {
            bodyContainer.innerHTML = data.colors.map(color => `
                <div class="color-container">
                    <div class="color" style="background-color: ${color.hex.value}"></div>
                    <div class="color-name" data-hex="${color.hex.value}">
                        <p>${color.hex.value}</p>
                    </div>
                </div>
            `).join("")
        })
        .catch(error => {
            bodyContainer.innerHTML = `<p>Error loading colors. Please try again.</p>`
            console.error(error)
        })
}

form.addEventListener("submit", function(e) {
    e.preventDefault()
    render()
})

render()