window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    const db = new MyLogDb()
    const downloader = new MyLogDownloader(db)
    document.getElementById('post').addEventListener('click', async(event) => {
        const content = document.getElementById('content').value
        if (!content) { alert('つぶやく内容をテキストエリアに入力してください。'); return }
        document.getElementById('post-list').innerHTML = db.insert(content) + document.getElementById('post-list').innerHTML
        document.getElementById('content').value = ''
        document.getElementById('content').focus()
    })
    document.getElementById('download').addEventListener('click', async(event) => {
        await downloader.download()
    })
    document.getElementById('delete').addEventListener('click', async(event) => {
        if (confirm('つぶやきをすべて削除します。\n本当によろしいですか？')) {
            await db.clear()
            document.getElementById('post-list').innerHTML = await db.toHtml()
            document.getElementById('content').focus()
        }
    })
    Loading.setup()
    document.getElementById('post-list').innerHTML = await db.toHtml()
    document.getElementById('content').focus()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

