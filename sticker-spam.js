
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function spam(){
    document.getElementsByClassName("btn-icon toggle-emoticons")[0].click()
    await sleep(32)
    document.querySelector("#column-center > div > div > div.chat-input.chat-input-main > div.emoji-dropdown.active > div.emoji-tabs.menu-horizontal-div.emoticons-menu.no-stripe > button.btn-icon.menu-horizontal-div-item.emoji-tabs-stickers").click()
    await sleep(32)
    document.querySelector("#content-stickers > div > div:nth-child(1) > div.category-items.super-stickers > div:nth-child(1)").click()
}
async function loop(){
    while(true){
        await sleep(3000)
        while(true)
        try{
            await spam()
            break
        }catch(e){}
        
    }
}

loop()