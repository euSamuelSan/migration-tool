const loadingChars = ["\\", "|", "/", "-"]

let index = 0
const loadingFeedback = setInterval(() => {
    process.stdout.write(`\rRunning pipeline... [${loadingChars[index++]}]`)
    index %= loadingChars.length
}, 250)

export const stopLoadingFeedback = () => {
    clearInterval(loadingFeedback)
    console.log("\n")
}
