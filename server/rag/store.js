const vectorStore = [];

export function addDocument(text, embedding) {

    vectorStore.push({
        text,
        embedding
    });
}

export function getDocuments() {

    return vectorStore;
}