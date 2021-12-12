function formatacao(response) {

    const data = {
        text: response.text,
        id: response.id,
        created_at: response.created_at,
        insertDB: Date.now() - 3 * 60 * 60 * 1000
    }
    return data
}

module.exports = formatacao;



